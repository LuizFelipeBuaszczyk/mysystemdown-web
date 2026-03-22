import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MySystemDown",
  description: "MySystemDown - Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}
