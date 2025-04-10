
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
    icon: "heart-pulse",
    description: "Cardiopulmonary resuscitation (CPR) is a lifesaving technique used when someone's breathing or heartbeat has stopped.",
    steps: [
      {
        title: "Check the scene",
        description: "Ensure the area is safe for you and the victim before approaching."
      },
      {
        title: "Check responsiveness",
        description: "Tap the person's shoulder and ask loudly if they're okay."
      },
      {
        title: "Call for help",
        description: "Ask someone to call emergency services (112 or local emergency number)."
      },
      {
        title: "Open the airway",
        description: "Place the person on their back and tilt their head back slightly to lift the chin."
      },
      {
        title: "Check for breathing",
        description: "Look, listen, and feel for breathing for no more than 10 seconds."
      },
      {
        title: "Begin chest compressions",
        description: "Place hands in the center of the chest and push hard and fast at a rate of 100-120 compressions per minute."
      }
    ]
  },
  {
    id: "bleeding",
    title: "Bleeding",
    icon: "droplet",
    description: "Controlling bleeding quickly is critical in preventing shock and saving lives during emergencies.",
    steps: [
      {
        title: "Apply pressure",
        description: "Use a clean cloth or bandage and apply firm, direct pressure to the wound."
      },
      {
        title: "Elevate",
        description: "If possible, elevate the injured area above the level of the heart to reduce blood flow."
      },
      {
        title: "Apply pressure to pressure points",
        description: "If bleeding continues, apply pressure to the artery supplying the area."
      },
      {
        title: "Apply tourniquet as last resort",
        description: "Only in life-threatening situations when bleeding cannot be controlled by other means."
      },
      {
        title: "Secure the dressing",
        description: "Once bleeding slows, secure the dressing with a bandage or clean cloth."
      }
    ]
  },
  {
    id: "burns",
    title: "Burns",
    icon: "flame",
    description: "Proper treatment of burns reduces the risk of infection and complications while promoting healing.",
    steps: [
      {
        title: "Cool the burn",
        description: "Hold under cool (not cold) running water for 10-15 minutes or until pain subsides."
      },
      {
        title: "Remove constricting items",
        description: "Remove jewelry, belts, or tight clothing from the burned area before swelling occurs."
      },
      {
        title: "Cover with clean bandage",
        description: "Use a sterile, non-adhesive bandage or clean cloth to cover the burn loosely."
      },
      {
        title: "Do not break blisters",
        description: "Leave blisters intact to protect against infection."
      },
      {
        title: "Apply moisturizer",
        description: "For minor burns, apply aloe vera gel or moisturizer after cooling."
      }
    ]
  },
  {
    id: "choking",
    title: "Choking",
    icon: "alert-triangle",
    description: "Quick action during choking emergencies can save a life by restoring airflow to the lungs.",
    steps: [
      {
        title: "Identify if person can speak or cough",
        description: "If the person can speak, cough, or breathe, encourage them to keep coughing."
      },
      {
        title: "Stand behind the person",
        description: "Position yourself behind the person and wrap your arms around their waist."
      },
      {
        title: "Perform abdominal thrusts (Heimlich maneuver)",
        description: "Make a fist with one hand, place it above the navel, grasp with other hand, and give quick upward thrusts."
      },
      {
        title: "Continue until object is expelled",
        description: "Repeat abdominal thrusts until the object is dislodged or the person becomes unconscious."
      },
      {
        title: "If unconscious, begin CPR",
        description: "If the person becomes unconscious, carefully lower them to the ground and begin CPR."
      }
    ]
  },
  {
    id: "fractures",
    title: "Fractures",
    icon: "bone",
    description: "Proper immobilization of fractures prevents further injury and reduces pain during emergency transport.",
    steps: [
      {
        title: "Stop any bleeding",
        description: "Before treating the fracture, stop any bleeding by applying pressure with a clean cloth."
      },
      {
        title: "Immobilize the injured area",
        description: "Do not try to realign the bone. Stabilize the limb in the position found."
      },
      {
        title: "Apply a cold pack",
        description: "Wrap ice or a cold pack in a cloth and apply to the area to reduce swelling."
      },
      {
        title: "Create a splint if needed",
        description: "Use rigid material (board, rolled newspaper) on both sides of the fracture and tie with cloth."
      },
      {
        title: "Seek medical attention",
        description: "All suspected fractures should be evaluated by medical professionals."
      }
    ]
  }
];

export default firstAidData;
