
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface FirstAidItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

const FirstAidItem: React.FC<FirstAidItemProps> = ({
  title,
  description,
  icon: Icon,
  onClick
}) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200" onClick={onClick}>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Icon className="h-5 w-5 text-medical-blue" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2">{description}</CardDescription>
        <Button variant="link" className="p-0 mt-2 text-medical-blue">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default FirstAidItem;
