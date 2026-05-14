import "./globals.css";
import { Inter } from 'next/font/google';
import { ImageProvider } from '@/context/ImageContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Pace na Tela",
  description: "Um novo jeito de compartilhar suas corridas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={inter.className}>
        <ImageProvider>
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
