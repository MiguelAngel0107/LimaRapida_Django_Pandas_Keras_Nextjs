import "../style/globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/navigation/navBar";
import Footer from "@/components/navigation/footer";
import Alert from "@/components/alert/alert";
import { Providers } from "@/redux/provider";
import { GoogleAnalytics, GoogleTagManager } from "@/components/google/scripts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "View of the World",
  description:
    "Descubre una plataforma educativa líder que ofrece videoconferencias ilimitadas, mensajería privada segura y un sistema de blogs informativos. Únete a nuestra comunidad para participar en conferencias en tiempo real, conectar con personas afines y acceder a contenido educativo relevante. Nuestro equipo apasionado de desarrolladores está comprometido con brindarte una experiencia excepcional. Únete ahora y sé parte de una sociedad conectada y educada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics />
      <GoogleTagManager />

      <body className={`${inter.className} bg-gray-950`}>
        <Providers>
          <NavBar />
          <Alert />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
