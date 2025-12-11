import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot field - should be empty for legitimate submissions
  website: z.string().max(0, "Spam detected").optional(),
});

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@chisokulab.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message || "Invalid request",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = validationResult.data;

    // Honeypot spam protection - if website field has value, it's spam
    if (website && website.length > 0) {
      // Silently reject spam submissions
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully",
        },
        { status: 200 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Initialize Resend client only at runtime when API key is available
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Helper function to escape HTML
    const escapeHtml = (text: string) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Send email to ChisokuLab
    const emailToChisokuLab = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #00d4aa; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">
                ${escapeHtml(message)}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (!emailToChisokuLab.data) {
      console.error("Failed to send email to ChisokuLab:", emailToChisokuLab.error);
      const errorMessage = emailToChisokuLab.error?.message || "Unknown error";
      return NextResponse.json(
        {
          success: false,
          error: `Failed to send message: ${errorMessage}. Please try again later.`,
        },
        { status: 500 }
      );
    }

    // Send auto-reply to user
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Thank you for contacting ChisokuLab",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f; border-bottom: 2px solid #00d4aa; padding-bottom: 10px;">
              Thank You for Reaching Out!
            </h2>
            <div style="margin-top: 20px;">
              <p>Hi ${escapeHtml(name)},</p>
              <p>
                Thank you for contacting ChisokuLab. We've received your message and will get back to you within 24-48 hours during business days.
              </p>
              <p>
                <strong>Your message:</strong><br/>
                <em>${escapeHtml(subject)}</em>
              </p>
              <p style="margin-top: 30px;">
                Best regards,<br/>
                The ChisokuLab Team
              </p>
            </div>
          </div>
        `,
      });
    } catch (autoReplyError) {
      // Log error but don't fail the request if auto-reply fails
      console.error("Failed to send auto-reply:", autoReplyError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
