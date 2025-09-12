import "./globals.css";
import { ImageProvider } from '@/context/ImageContext'; // Importa o ImageProvider

import { Montserrat } from 'next/font/google'

export const metadata = {
  title: "Pace na Tela",
  description: "Um novo jeito de compartilhar suas corridas",
};

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <ImageProvider> {/* Envolvendo a aplicação com o ImageProvider */}
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
