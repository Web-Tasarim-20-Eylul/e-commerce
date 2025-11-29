"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Heart,
} from "lucide-react";
import { Divider } from "@heroui/react";
import Logo from "./logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "Tüm Ürünler", href: "/" },
      { label: "Erkek Giyim", href: "/?category=men's clothing" },
      { label: "Kadın Giyim", href: "/?category=women's clothing" },
      { label: "Elektronik", href: "/?category=electronics" },
      { label: "Mücevher", href: "/?category=jewelery" },
    ],
    help: [
      { label: "Sipariş Takibi", href: "#" },
      { label: "Kargo Bilgisi", href: "#" },
      { label: "İade & Değişim", href: "#" },
      { label: "Sık Sorulan Sorular", href: "#" },
      { label: "İletişim", href: "#" },
    ],
    company: [
      { label: "Hakkımızda", href: "#" },
      { label: "Kariyer", href: "#" },
      { label: "Kurumsal", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Basın Kiti", href: "#" },
    ],
    legal: [
      { label: "Gizlilik Politikası", href: "#" },
      { label: "Kullanım Koşulları", href: "#" },
      { label: "Çerez Politikası", href: "#" },
      { label: "KVKK", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "Github" },
  ];

  return (
    <footer className="bg-default-50 dark:bg-default-100/20 border-t border-default-200 dark:border-default-100 mt-20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {" "}
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-default-500 mb-6 max-w-sm">
              En kaliteli ürünleri en uygun fiyatlarla sunan güvenilir e-ticaret
              platformunuz.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-default-600 dark:text-default-400">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:info@ecommerce.com"
                  className="hover:text-primary transition-colors"
                >
                  info@ecommerce.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-default-600 dark:text-default-400">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+905551234567"
                  className="hover:text-primary transition-colors"
                >
                  +90 (555) 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-2 text-default-600 dark:text-default-400">
                <MapPin className="w-4 h-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-default-100 dark:bg-default-50/10 hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Alışveriş</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-default-600 dark:text-default-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Help Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Yardım</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-default-600 dark:text-default-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-default-600 dark:text-default-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="bg-default-200 dark:bg-default-100" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-default-500">
            <span>© {currentYear} E-Commerce. Tüm hakları saklıdır.</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-default-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-danger fill-danger animate-pulse" />
            <span>by Development Team</span>
          </div>

          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-sm text-default-600 dark:text-default-400 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-default-300">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
