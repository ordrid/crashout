'use client';

import { useEffect, useState } from 'react';
import { SlidingNumber } from '@/components/motion-primitives/sliding-number';

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
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">The Day of Mayang's Crash Out</h1>
        <p className="text-xl text-gray-700 mb-12">Countdown Timer</p>

        <div className="flex gap-8 justify-center items-center mb-4">
          <div className="flex flex-col items-center">
            <div className="text-8xl font-bold mb-2">
              <SlidingNumber value={timeLeft.days} padStart={false} />
            </div>
            <span className="text-xl text-gray-600 uppercase tracking-wider">Days</span>
          </div>

          <span className="text-8xl font-bold text-gray-400 mb-8">:</span>

          <div className="flex flex-col items-center">
            <div className="text-8xl font-bold mb-2">
              <SlidingNumber value={timeLeft.hours} padStart={true} />
            </div>
            <span className="text-xl text-gray-600 uppercase tracking-wider">Hours</span>
          </div>

          <span className="text-8xl font-bold text-gray-400 mb-8">:</span>

          <div className="flex flex-col items-center">
            <div className="text-8xl font-bold mb-2">
              <SlidingNumber value={timeLeft.minutes} padStart={true} />
            </div>
            <span className="text-xl text-gray-600 uppercase tracking-wider">Minutes</span>
          </div>

          <span className="text-8xl font-bold text-gray-400 mb-8">:</span>

          <div className="flex flex-col items-center">
            <div className="text-8xl font-bold mb-2">
              <SlidingNumber value={timeLeft.seconds} padStart={true} />
            </div>
            <span className="text-xl text-gray-600 uppercase tracking-wider">Seconds</span>
          </div>
        </div>

        <p className="text-sm text-gray-500">Countdown to October 22, 2025</p>
      </div>
    </div>
  );
}
