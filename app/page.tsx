'use client';

import { useEffect, useState } from 'react';
import { SlidingNumber } from '@/components/motion-primitives/sliding-number';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

export default function Home() {
  const targetDate = new Date('2025-10-22T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
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
  }, [targetDate]);

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
        <div className="relative z-20 flex items-center justify-center min-h-screen p-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-white">The Day of Mayang's Crash Out</h1>
            <p className="text-xl text-gray-300 mb-12">Countdown Timer</p>

            <div className="flex gap-8 justify-center items-center mb-4">
              <div className="flex flex-col items-center">
                <div className="text-8xl font-bold mb-2 text-white">
                  <SlidingNumber value={timeLeft.days} padStart={false} />
                </div>
                <span className="text-xl text-gray-400 uppercase tracking-wider">Days</span>
              </div>

              <span className="text-8xl font-bold text-gray-600 mb-8">:</span>

              <div className="flex flex-col items-center">
                <div className="text-8xl font-bold mb-2 text-white">
                  <SlidingNumber value={timeLeft.hours} padStart={true} />
                </div>
                <span className="text-xl text-gray-400 uppercase tracking-wider">Hours</span>
              </div>

              <span className="text-8xl font-bold text-gray-600 mb-8">:</span>

              <div className="flex flex-col items-center">
                <div className="text-8xl font-bold mb-2 text-white">
                  <SlidingNumber value={timeLeft.minutes} padStart={true} />
                </div>
                <span className="text-xl text-gray-400 uppercase tracking-wider">Minutes</span>
              </div>

              <span className="text-8xl font-bold text-gray-600 mb-8">:</span>

              <div className="flex flex-col items-center">
                <div className="text-8xl font-bold mb-2 text-white">
                  <SlidingNumber value={timeLeft.seconds} padStart={true} />
                </div>
                <span className="text-xl text-gray-400 uppercase tracking-wider">Seconds</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">Countdown to October 22, 2025</p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
