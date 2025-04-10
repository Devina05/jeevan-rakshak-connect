
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Github, Mail, Phone, BadgeHelp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <BadgeHelp className="h-6 w-6 text-medical-blue mr-2" />
              <h3 className="text-lg font-bold text-medical-blue">{t('appName')}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {t('welcomeMessage')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-medical-blue transition-colors">
                  {t('firstAid')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-medical-blue transition-colors">
                  {t('sos')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-medical-blue transition-colors">
                  {t('symptomChecker')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-medical-blue transition-colors">
                  {t('insurance')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm text-gray-600">Emergency: 112</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                <a href="mailto:help@jeevanrakshak.org" className="text-sm text-gray-600 hover:text-medical-blue transition-colors">
                  help@jeevanrakshak.org
                </a>
              </li>
            </ul>
          </div>

          {/* Download Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Save Offline</h3>
            <p className="text-sm text-gray-600">
              Save JeevanRakshak on your device to access first aid guides even without internet.
            </p>
            <Button className="w-full">
              Add to Home Screen
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} JeevanRakshak. {t('appName')}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-medical-blue transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <Heart className="h-5 w-5 text-medical-red" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
