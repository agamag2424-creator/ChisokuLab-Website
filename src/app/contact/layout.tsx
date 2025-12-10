import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Contact Us",
  description:
    "Get in touch with ChisokuLab. Have questions about our AI efficiency course or consulting services? We'd love to hear from you.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
