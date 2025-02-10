// app/layout.tsx
import './globals.css';
import SessionProvider from './SessionProvider';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-100 p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
