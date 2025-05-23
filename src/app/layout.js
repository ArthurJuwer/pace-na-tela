import "./globals.css";
import { ImageProvider } from '@/context/ImageContext'; // Importa o ImageProvider

export const metadata = {
  title: "Pace na Tela",
  description: "Um novo jeito de compartilhar suas corridas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ImageProvider> {/* Envolvendo a aplicação com o ImageProvider */}
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
