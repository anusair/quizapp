import React from "react";

import clsx from "clsx";
import Quiz from "./Quiz";

interface BulletsProps {
  jsonData: Quiz[];
  count: number;
  setCount: (count: number) => void;
  isActive: boolean;
  className?: string; 
}

function Bullets({ jsonData, count, setCount, isActive , className }: BulletsProps) {
  return (
    <div className={clsx("gap-1 flex items-center mt-5 md:mt-0", 
        className
    )}>
      {Array.from({ length: jsonData.length }).map((_, i) => (
        <span
          key={i}
          className={clsx(
            "w-2 h-2 rounded-full cursor-pointer transition-all duration-200",
            count == i ? "bg-[#008000] w-3 h-3" : "bg-white",
            !isActive ? "pointer-events-none" : "pointer-events-auto"
          )}
          onClick={() => setCount(i)}
        />
      ))}
    </div>
  );
}

export default Bullets;
