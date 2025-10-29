"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  const crashoutDate = new Date("2025-10-22T00:00:00").getTime();

  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timerStopped, setTimerStopped] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Load lockout state from localStorage
  useEffect(() => {
    const savedLockout = localStorage.getItem("lockoutUntil");
    const savedAttempts = localStorage.getItem("attemptsRemaining");

    if (savedLockout) {
      const lockoutTime = parseInt(savedLockout);
      if (lockoutTime > Date.now()) {
        setLockoutUntil(lockoutTime);
        setAttemptsRemaining(0);
      } else {
        localStorage.removeItem("lockoutUntil");
        localStorage.setItem("attemptsRemaining", "3");
      }
    }

    if (savedAttempts) {
      setAttemptsRemaining(parseInt(savedAttempts));
    }
  }, []);

  useEffect(() => {
    if (timerStopped) return;

    const calculateTimeElapsed = () => {
      const now = new Date().getTime();
      const difference = now - crashoutDate;

      if (difference > 0) {
        setTimeElapsed({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, [timerStopped]);

  // Check lockout expiry
  useEffect(() => {
    if (lockoutUntil && lockoutUntil <= Date.now()) {
      setLockoutUntil(null);
      setAttemptsRemaining(3);
      localStorage.removeItem("lockoutUntil");
      localStorage.setItem("attemptsRemaining", "3");
    }
  }, [lockoutUntil]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutUntil && lockoutUntil > Date.now()) {
      const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60000);
      setErrorMessage(`Too many attempts. Try again in ${minutesLeft} minute(s).`);
      return;
    }

    if (attemptsRemaining <= 0) {
      setErrorMessage("No attempts remaining. Please wait 30 minutes.");
      return;
    }

    setIsVerifying(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await response.json();

      if (response.ok && data.isValid) {
        setTimerStopped(true);
        setShowCongrats(true);
        localStorage.removeItem("lockoutUntil");
        localStorage.removeItem("attemptsRemaining");
      } else {
        const newAttempts = attemptsRemaining - 1;
        setAttemptsRemaining(newAttempts);
        localStorage.setItem("attemptsRemaining", newAttempts.toString());

        if (newAttempts === 0) {
          const lockout = Date.now() + (30 * 60 * 1000); // 30 minutes
          setLockoutUntil(lockout);
          localStorage.setItem("lockoutUntil", lockout.toString());
          setErrorMessage("No attempts remaining. Locked out for 30 minutes.");
        } else {
          setErrorMessage(`Incorrect password. ${newAttempts} attempt(s) remaining.`);
        }
      }
    } catch (error) {
      setErrorMessage("Error verifying password. Please try again.");
    } finally {
      setPasswordInput("");
      setIsVerifying(false);
    }
  };

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
              Time Since Mayang's Crash Out
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12">
              {timerStopped ? "Timer Stopped!" : "Time Elapsed Since October 22, 2025"}
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
                    <SlidingNumber value={timeElapsed.days} padStart={false} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Days
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeElapsed.hours} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Hours
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeElapsed.minutes} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Minutes
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-1 sm:mb-2 text-white tabular-nums">
                    <SlidingNumber value={timeElapsed.seconds} padStart={true} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 uppercase tracking-wider">
                    Seconds
                  </span>
                </div>
              </div>
            </div>

            {/* Password Input Section */}
            {!timerStopped && (
              <div className="mt-8 sm:mt-12 max-w-md mx-auto">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      disabled={isVerifying || (lockoutUntil !== null && lockoutUntil > Date.now())}
                      placeholder="Mayang should enter the password once she has been paid"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying || !passwordInput || (lockoutUntil !== null && lockoutUntil > Date.now())}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isVerifying ? "Verifying..." : "Stop Timer"}
                  </button>
                  {errorMessage && (
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  )}
                  <p className="text-gray-400 text-sm">
                    Attempts remaining: {attemptsRemaining}/3
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Congratulations Dialog */}
      {showCongrats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-white/20 rounded-2xl p-8 sm:p-12 max-w-2xl mx-4 text-center shadow-2xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-8xl mb-6 animate-[bounce_1s_ease-in-out_infinite]">
              🎉
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Congratulations, Mayang!
            </h2>
            <p className="text-xl text-gray-200 mb-4">
              The time you've waited for has finally arrived!
            </p>
            <p className="text-xl text-gray-200 mb-6">
              Finally, you have been paid! 🎊
            </p>
            <div className="bg-white/10 rounded-lg p-6 mb-4">
              <p className="text-lg text-gray-300 mb-2">
                You have been paid on{" "}
                <span className="text-white font-semibold">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                You've waited for{" "}
                <span className="text-white font-semibold">
                  {timeElapsed.days} days, {timeElapsed.hours} hours, {timeElapsed.minutes} minutes, and {timeElapsed.seconds} seconds
                </span>
                {" "}to be paid.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
