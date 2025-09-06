import "./globals.css";
import { ImageProvider } from '@/context/ImageContext'; // Importa o ImageProvider

import { Inter } from 'next/font/google'

export const metadata = {
  title: "Pace na Tela",
  description: "Um novo jeito de compartilhar suas corridas",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ImageProvider> {/* Envolvendo a aplicação com o ImageProvider */}
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
