
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation links
  const navLinks = [
    { href: "/", label: "Início" },
  ];

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Polícia Nacional de Angola Logo"
                width={48}
                height={48}
                className="rounded-full object-contain"
                property="logo"
              />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#1F2A44] md:text-1xl">
                Polícia Nacional de Angola
              </h1>
              <p className="text-sm font-medium text-gray-500">Cofre de Providências</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={linkVariants}>
                <Link
                  href={link.href}
                  className="relative text-gray-700 hover:text-[#41B4E6] font-medium text-base transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#EFE500] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
            {/* Botão Entrar (Desktop) */}
            <motion.div variants={linkVariants}>
              <Link
                href="/login"
                className="border-2 border-yellow-400 text-gray-700 hover:bg-yellow-100 font-medium text-base px-4 py-2 rounded-md transition-colors duration-300"
                aria-label="Entrar na conta"
              >
                Entrar
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-[#41B4E6] focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 bg-white border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#41B4E6] font-medium text-lg px-4 py-2 hover:bg-gray-50 rounded-md transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Botão Entrar (Mobile) */}
              <Link
                href="/register"
                className="border-2 border-yellow-400 text-gray-700 hover:bg-yellow-100 font-medium text-lg px-4 py-2 mx-4 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Criar conta"
              >
                Criar conta
              </Link>

              <Link
                href="/login"
                className="border-2 border-yellow-400 text-gray-700 hover:bg-yellow-100 font-medium text-lg px-4 py-2 mx-4 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Entrar na conta"
              >
                Entrar
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
