
// This is just a placeholder implementation to fix the syntax errors
export interface FirstAidItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export const firstAidData: FirstAidItem[] = [
  {
    id: "cpr",
    title: "CPR",
    icon: "heart",
    description: "Cardiopulmonary resuscitation (CPR) is a lifesaving technique",
    steps: [
      {
        title: "Check the scene",
        description: "Ensure the area is safe for you and the victim"
      },
      {
        title: "Check responsiveness",
        description: "Tap the person's shoulder and ask if they're okay"
      }
    ]
  },
  {
    id: "bleeding",
    title: "Bleeding",
    icon: "droplet",
    description: "Controlling bleeding quickly is critical",
    steps: [
      {
        title: "Apply pressure",
        description: "Use a clean cloth and apply direct pressure"
      },
      {
        title: "Elevate",
        description: "If possible, elevate the injured area above the heart"
      }
    ]
  },
  {
    id: "burns",
    title: "Burns",
    icon: "flame",
    description: "Proper treatment of burns reduces risk of complications",
    steps: [
      {
        title: "Cool the burn",
        description: "Hold under cool (not cold) running water for 10-15 minutes"
      },
      {
        title: "Cover with clean bandage",
        description: "Use a sterile, non-adhesive bandage or clean cloth"
      }
    ]
  }
];

export default firstAidData;
