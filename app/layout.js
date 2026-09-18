import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Lakas ng may Kapansanan",
  description: "Assistance requests for persons with disabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-darker">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
