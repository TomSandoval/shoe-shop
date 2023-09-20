import Header from "@/components/Nav/Nav";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/authProvider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Shoes Shop",
  description: "Shoes Shop is an online sneaker store that features an internal management system, automating tasks such as stock management, email sending, purchase control, etc. It was developed using Next.js and utilizes MongoDB as the database. The platform includes user authentication and authorization provided by Auth0.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <AuthProvider>
        <body className={poppins.className}>
          <CartProvider>
            <Header font={poppins} />
            <Toaster position="bottom-left" />
            {children}
          </CartProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
