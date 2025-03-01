import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as React from "react";
import { twMerge } from "tailwind-merge"; // Assuming you have these components from shadcn/ui

export type CountdownProps = {
  futureDate: Date;
};

export const Countdown = ({  futureDate, ...props }: CountdownProps & React.ComponentProps<"div">) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = futureDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [futureDate]);

  return (
    <div className={twMerge("flex gap-4", props.className)}>
      <div className="gap-1 flex items-center">
        <span className="font-bold">{timeLeft.days}</span>
        <span className="text-sm">Days</span>
      </div>
      <div className="gap-1 flex items-center">
        <span className="font-bold">{timeLeft.hours}</span>
        <span className="text-sm">Hours</span>
      </div>
      <div className="gap-1 flex items-center">
        <span className="font-bold">{timeLeft.minutes}</span>
        <span className="text-sm">Minutes</span>
      </div>
      <div className="gap-1 flex items-center">
        <span className="font-bold">{timeLeft.seconds}</span>
        <span className="text-sm">Seconds</span>
      </div>
    </div>
  );
};