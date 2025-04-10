
import React from "react";
import { AlarmClock, Stethoscope, Phone, Heart, Shield, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelector from "./LanguageSelector";

const MainNavigation: React.FC = () => {
  const { t } = useLanguage();

  return (
    <nav className="hidden md:flex space-x-4">
      {/* Emergency Services Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            <AlarmClock className="mr-2 h-4 w-4" />
            {t('emergencyServices')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            {t('firstAid')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Phone className="mr-2 h-4 w-4" />
            {t('sos')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Stethoscope className="mr-2 h-4 w-4" />
            {t('symptomChecker')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Insurance Help Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            {t('insuranceHelp')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <AlarmClock className="mr-2 h-4 w-4" />
            {t('emergencyServices')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            {t('insurance')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Login/Signup */}
      <Button variant="ghost" className="flex items-center">
        <User className="mr-2 h-4 w-4" />
        {t('login')}/{t('signup')}
      </Button>
    </nav>
  );
};

export default MainNavigation;
