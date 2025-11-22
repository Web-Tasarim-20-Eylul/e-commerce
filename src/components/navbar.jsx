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
  Button,
  Badge,
} from "@heroui/react";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";

export const AcmeLogo = () => {
  return (
    <Link href="/" className="relative h-[47px] w-[144px] flex">
      <Image src={"/logo.svg"} fill className="object-contain" alt="logo" />
    </Link>
  );
};

export default function Navbar() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <HeroUINavbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/erkek">
            Erkek
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/kadin">
            Kadın
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/taki">
            Takı
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/elektronik">
            Elektronik
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            className="text-primary"
            href="#"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Badge content={12} color="danger">
            <Button as={Link} isIconOnly href="/sepet">
              <ShoppingBasket />
            </Button>
          </Badge>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}
