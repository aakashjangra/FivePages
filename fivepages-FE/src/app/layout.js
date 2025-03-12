import "./globals.css";

export const metadata = {
  title: "FivePages",
  description: "Read the latest novels Chaptervise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body >{children}</body>
    </html>
  );
}
