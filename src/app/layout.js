import Header from "@/components/Nav/Nav";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/authProvider";
import { Toaster } from "react-hot-toast";
import Prvider from "@/redux/prvider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Shoe Shop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <AuthProvider>
        <Prvider>
          <body>
            <Header font={poppins} />
            <Toaster position="bottom-left" />
            {children}
          </body>
        </Prvider>
      </AuthProvider>
    </html>
  );
}
