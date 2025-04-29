// src/app/layout.js
import './globals.css';
import Navbar from './components/Navbar/Navbar';


import { ReduxProvider } from './provider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "FivePages",
  description: "Read the latest novels Chaptervise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReduxProvider>
          <Navbar />
          <main  className="max-w-7xl mx-auto px-4">{children}</main>
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
