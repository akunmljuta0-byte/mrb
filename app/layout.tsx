import "./globals.css";

export const metadata = {
  title: "Game Guide",
  description: "Guide system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
