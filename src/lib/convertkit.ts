/**
 * ConvertKit API Integration
 * Handles email subscriptions to ConvertKit
 */

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
const CONVERTKIT_API_URL = "https://api.convertkit.com/v3";

export interface ConvertKitResponse {
  subscription?: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: string | null;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
      first_name: string | null;
      email_address: string;
      state: string;
      created_at: string;
      fields: Record<string, unknown>;
    };
  };
  error?: string;
}

export interface SubscribeOptions {
  email: string;
  source?: string;
  tags?: number[];
}

/**
 * Subscribe an email to ConvertKit
 */
export async function subscribeToNewsletter(
  options: SubscribeOptions
): Promise<{ success: boolean; data?: ConvertKitResponse; error?: string }> {
  // Log configuration status (without exposing full API key)
  console.log("ConvertKit Config Check:", {
    hasApiKey: !!CONVERTKIT_API_KEY,
    apiKeyPrefix: CONVERTKIT_API_KEY?.substring(0, 5) || "none",
    hasFormId: !!CONVERTKIT_FORM_ID,
    formId: CONVERTKIT_FORM_ID || "none",
  });

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.warn(
      "ConvertKit API key or Form ID not configured. Using mock response."
    );
    // Return mock success for development
    return {
      success: true,
      data: {
        subscription: {
          id: 1,
          state: "active",
          created_at: new Date().toISOString(),
          source: options.source || "website",
          referrer: null,
          subscribable_id: parseInt(CONVERTKIT_FORM_ID || "0"),
          subscribable_type: "form",
          subscriber: {
            id: 1,
            first_name: null,
            email_address: options.email,
            state: "active",
            created_at: new Date().toISOString(),
            fields: {},
          },
        },
      },
    };
  }

  try {
    console.log("Attempting ConvertKit subscription for:", options.email);
    const formData = new URLSearchParams();
    formData.append("api_key", CONVERTKIT_API_KEY);
    formData.append("email", options.email);

    // Add source if provided
    if (options.source) {
      formData.append("fields[source]", options.source);
    }

    // Add tags if provided
    if (options.tags && options.tags.length > 0) {
      options.tags.forEach((tagId) => {
        formData.append("tags[]", tagId.toString());
      });
    }

    const apiUrl = `${CONVERTKIT_API_URL}/forms/${CONVERTKIT_FORM_ID}/subscribe`;
    console.log("ConvertKit API URL:", apiUrl);
    console.log("Request body (sanitized):", {
      email: options.email,
      source: options.source,
      hasApiKey: !!formData.get("api_key"),
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    console.log("ConvertKit API Response Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ConvertKit API Error Response:", errorData);
      throw new Error(
        errorData.message || `ConvertKit API error: ${response.statusText}`
      );
    }

    const data: ConvertKitResponse = await response.json();
    console.log("ConvertKit API Success Response:", {
      subscriptionId: data.subscription?.id,
      subscriberId: data.subscription?.subscriber?.id,
      email: data.subscription?.subscriber?.email_address,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("ConvertKit subscription error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please try again.",
    };
  }
}

