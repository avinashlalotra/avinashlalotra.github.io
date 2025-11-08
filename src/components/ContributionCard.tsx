import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Props = {
  imageSrc?: string;
  name: string;
  href: string;
};

const ContributionCard: React.FC<Props> = ({ imageSrc, name, href }) => {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      aria-label={`${name} - open in new tab`}
    >
      <Card className="rounded-full overflow-hidden w-36 h-36 sm:w-44 sm:h-44 mx-auto hover:shadow-2xl transition-transform duration-300 transform-gpu group-hover:-translate-y-2 group-focus:outline-none group-focus:ring-2 group-focus:ring-ring hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0 relative h-full">
          {/* Image / initials */}
          <div className="absolute inset-0">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-2xl font-extrabold text-foreground bg-gradient-to-br from-primary/5 to-secondary/5">
                {initials}
              </div>
            )}
          </div>

          {/* Hover overlay with name */}
          <div className="absolute inset-0 flex items-end justify-center p-3 pointer-events-none">
            <div className="w-full backdrop-blur-sm bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
              <div className="text-sm font-semibold text-white py-2 pointer-events-none">{name}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default ContributionCard;
