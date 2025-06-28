import BottomMenu from "@/components/Account/BottomMenu";
import Header from "@/components/Account/Header";
import { ImageProvider } from '@/context/ImageContext'; // Importa o ImageProvider

export const metadata = {
  title: "Pace na Tela",
  description: "Um novo jeito de compartilhar suas corridas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-inter">
        <ImageProvider> {/* Envolvendo a aplicação com o ImageProvider */}
          <Header />
          {children}
          <BottomMenu />
        </ImageProvider>
      </body>
    </html>
  );
}
