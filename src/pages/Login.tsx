
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const { t } = useLanguage();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-medical-red animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-medical-blue to-medical-purple bg-clip-text text-transparent">{t('appName')}</h1>
          <p className="text-gray-600 mt-2">{t('welcomeMessage')}</p>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/5 to-medical-purple/5 rounded-lg -z-10"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">{t('login')}</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">{t('email') || 'Email'}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-medical-blue transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">{t('password') || 'Password'}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-medical-blue transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pb-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-medical-blue to-medical-purple hover:opacity-90 transition-opacity" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('loggingIn') || 'Logging in...'}
                  </>
                ) : (
                  t('login') || 'Login'
                )}
              </Button>
              <p className="text-sm text-center text-gray-600">
                {t('dontHaveAccount') || "Don't have an account?"}{" "}
                <Link to="/signup" className="text-medical-blue hover:underline font-medium">
                  {t('signup') || 'Sign up'}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Demo credentials: email@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
