"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  const fivePMDate = new Date("2025-10-22T17:00:00").getTime();
  const endOfDayDate = new Date("2025-10-22T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phase, setPhase] = useState<"before5pm" | "after5pm" | "ended">(
    "before5pm"
  );

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      let targetDate: number;

      // Determine which phase we're in
      if (now < fivePMDate) {
        setPhase("before5pm");
        targetDate = fivePMDate;
      } else if (now < endOfDayDate) {
        setPhase("after5pm");
        targetDate = endOfDayDate;
      } else {
        setPhase("ended");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Prismatic Aurora Burst - Multi-layered Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      {/* Background Beams with Collision */}
      <BackgroundBeamsWithCollision className="absolute inset-0 z-10 bg-transparent">
        <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8 sm:p-8">
          <div className="text-center max-w-6xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight px-2">
              The Day of Mayang's Crash Out
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12">
              Extended Countdown Timer
            </p>

            {/* Timer with Money Bomb Background */}
            <div className="relative">
              {/* Semi-transparent Money Time Bomb Image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/money-time-bomb.png"
                  alt=""
                  width={600}
                  height={600}
                  className="opacity-15 select-none w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto"
                  priority
                />
              </div>

              {/* Timer Content */}
              <div className="relative grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-start mb-4 max-w-5xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeLeft.days} padStart={false} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Days
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeLeft.hours} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Hours
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeLeft.minutes} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Minutes
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeLeft.seconds} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Seconds
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-4 px-4">
                {phase === "before5pm" && "Countdown to 5 PM, October 22, 2025"}
                {phase === "after5pm" &&
                  "Countdown to End of Day, October 22, 2025"}
                {phase === "ended" && "The day has ended!"}
              </p>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
