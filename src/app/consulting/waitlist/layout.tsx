import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Consulting Waitlist - Enterprise AI Deployment Advisory",
  description:
    "Join the waitlist for Enterprise AI Deployment Advisory launching Q1 2026. Get early access and a free consultation. Deploy AI tools without trial-and-error tax.",
  path: "/consulting/waitlist",
});

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

