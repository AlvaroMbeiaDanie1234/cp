"use client";

import Footer from "../components/footer";
import LoginScreen from "./login";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
          <LoginScreen />
          </main>
          <Footer />
        </div>
  );
}