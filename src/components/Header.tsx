
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useOffline } from "@/contexts/OfflineContext";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our new components
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import MainNavigation from "./header/MainNavigation";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { isOffline } = useOffline();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('jeevanrakshak-language') as any;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle search submission
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      // Implement search functionality
      console.log('Searching for:', query);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <MainNavigation />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearchSubmit={handleSearchSubmit} />

        {/* Mobile Navigation Menu */}
        <MobileMenu isOpen={mobileMenuOpen} toggleMenu={toggleMobileMenu} />

        {/* Offline Indicator */}
        {isOffline && (
          <div className="bg-red-500 text-white py-1 text-center text-sm">
            {isOffline}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
