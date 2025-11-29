"use client";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import NextLink from "next/link";
import CartBadge from "./cart-badge";
import SearchInput from "./search-input";
import ThemeToggle from "./theme-toggle";
import Logo from "./logo";
import { Home, Tag, Sparkles, Heart } from "lucide-react";

export default function Navbar() {
  const menuItems = [
    { label: "Ana Sayfa", href: "/", icon: Home },
    { label: "Favoriler", href: "/favoriler", icon: Heart },
    { label: "Kampanyalar", href: "/#deals", icon: Sparkles },
  ];

  return (
    <HeroUINavbar
      maxWidth="xl"
      isBordered
      className="bg-background/70 backdrop-blur-md"
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>{" "}
      {/* Mobile Logo (Center) */}
      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand as={NextLink} href="/">
          <Logo size="small" />
        </NavbarBrand>
      </NavbarContent>
      {/* Desktop Logo (Left) */}
      <NavbarContent className="hidden md:flex" justify="start">
        <NavbarBrand as={NextLink} href="/">
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      {/* Desktop Navigation Links */}
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              as={NextLink}
              href={item.href}
              color="foreground"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {/* Search Bar (Desktop & Tablet) */}
      <NavbarContent className="hidden md:flex flex-1 px-4" justify="end">
        <SearchInput className="max-w-sm" />
      </NavbarContent>
      {/* Actions (Theme + Cart) */}
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          <CartBadge />
        </NavbarItem>
      </NavbarContent>
      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-background/95 backdrop-blur-md">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              as={NextLink}
              href={item.href}
              className="w-full flex items-center gap-3 py-2"
              color="foreground"
              size="lg"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}
