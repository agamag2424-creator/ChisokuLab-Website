import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "FAQ - Frequently Asked Questions",
  description:
    "Find answers to common questions about ChisokuLab's course, consulting services, and approach to AI efficiency and decision science.",
  path: "/faq",
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
