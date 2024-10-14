import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/shared/contexts/SignupContext";
// import Navbar from "./components/Navbar.jsx";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <AuthProvider >
               {children}
               {/* <Navbar /> */}
            </AuthProvider>
        </body>
    </html>
  );
}
