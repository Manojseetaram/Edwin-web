"use client";

import { useEffect, useState } from "react";

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const eventTime = new Date().getTime() + 49 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2,"0"),
        hours: String(Math.floor((distance % (1000*60*60*24))/(1000*60*60))).padStart(2,"0"),
        minutes: String(Math.floor((distance % (1000*60*60))/(1000*60))).padStart(2,"0"),
        seconds: String(Math.floor((distance % (1000*60))/1000)).padStart(2,"0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-12">
        Community Lab <span className="text-green-400">Hackathon</span>
      </h1>

      <div className="flex gap-6">
        <Box label="Days" value={timeLeft.days} />
        <Box label="Hours" value={timeLeft.hours} />
        <Box label="Minutes" value={timeLeft.minutes} />
        <Box label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
   <div className="bg-white rounded-lg p-6 w-32 flex flex-col items-center justify-center text-center">
  <div className="text-green-400 text-6xl font-bold">
    {value}
  </div>
  <div className="text-black font-semibold mt-2">
    {label}
  </div>
</div>

  );
}
