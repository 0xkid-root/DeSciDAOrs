"use client";

import Link from "next/link";
import { AtomIcon, Github, Twitter, MessageCircle, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/DeSciDAO", label: "Twitter" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/DeSci-Learning-DAO", label: "GitHub" },
    { icon: <MessageCircle className="h-5 w-5" />, href: "https://discord.gg/DeSciDAO", label: "Discord" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Proposals", href: "/proposals" },
    { label: "Voting", href: "/voting" },
    { label: "About", href: "/about" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "Governance", href: "/governance" },
    { label: "FAQ", href: "/faq" },
    { label: "Community", href: "/community" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Adjusted for better trigger point
          variants={containerVariants}
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              >
                <AtomIcon className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="font-bold text-xl">DeSciDAOrs</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Join the future of decentralized education and research
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Visit our ${link.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div whileHover={{ y: -5, scale: 1.1 }} transition={{ duration: 0.2 }}>
                    {link.icon}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} DeSciDAOrs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by the DeSciDAOrs community
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="text-muted-foreground hover:text-foreground"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="h-5 w-5" />
              </motion.div>
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}