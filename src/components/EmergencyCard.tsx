
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface EmergencyCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  actionText: string;
  type: 'first-aid' | 'sos' | 'symptom' | 'insurance';
  disabled?: boolean;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  title,
  description,
  icon: Icon,
  action,
  actionText,
  type,
  disabled = false
}) => {
  const cardClasses = {
    'first-aid': 'emergency-card-first-aid',
    'sos': 'emergency-card-sos',
    'symptom': 'emergency-card-symptom',
    'insurance': 'emergency-card-insurance'
  };

  const iconColors = {
    'first-aid': 'text-medical-blue',
    'sos': 'text-medical-red',
    'symptom': 'text-medical-green',
    'insurance': 'text-medical-orange'
  };

  const buttonVariant = {
    'first-aid': 'outline',
    'sos': 'destructive',
    'symptom': 'default',
    'insurance': 'secondary'
  };

  return (
    <Card className={`emergency-card ${cardClasses[type]}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Icon className={`h-6 w-6 ${iconColors[type]}`} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {/* Card content can be added here if needed */}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={action} 
          className="w-full" 
          variant={buttonVariant[type] as any}
          disabled={disabled}
        >
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyCard;
