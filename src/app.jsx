import React, { useState, useEffect } from "react";
import {
  Settings,
  Facebook,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Code,
  Award,
  Gamepad2,
  Wind,
  Leaf,
  Terminal,
  Cpu,
} from "lucide-react";

/* ================= TIMER HOOK ================= */
const useCountdown = (targetDate) => {
  const calculate = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return { expired: true };

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

/* ================= MAIN APP ================= */
const App = () => {
  const targetDate = new Date("2026-05-30T08:00:00").getTime();
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="min-h-screen bg-[#0a0f0b] flex items-center justify-center p-4 text-gray-100">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-10 text-emerald-400 animate-pulse">
          <Wind size={100} />
        </div>
        <div className="absolute bottom-1/4 right-10 text-green-400 animate-bounce">
          <Leaf size={60} />
        </div>
      </div>

      <div className="w-full max-w-[480px] bg-[#111214] rounded-2xl overflow-hidden border border-emerald-900/30">

        {/* Banner */}
        <div className="h-32 relative">
          <img
            src="https://media1.tenor.com/m/A6qADxOkvkoAAAAC/venti-genshin.gif"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
            <Settings size={16} />
          </div>
        </div>

        {/* Avatar */}
        <div className="p-4 relative">
          <div className="-mt-16 mb-4">
            <img
              src="https://cdn.discordapp.com/attachments/1338868763415547905/1479151967203889162/35ab948d68a0fda9c089af34c6ec3b05.png"
              className="w-28 h-28 rounded-full border-4 border-[#111214]"
            />
          </div>

          {/* Name */}
          <h1 className="text-xl font-bold">
            It’s TrueHieu
            <span className="text-gray-400 text-sm ml-2">
              phongthan3contot
            </span>
          </h1>

          <p className="text-emerald-400 text-sm mt-1">
            🍃 Simp Venti & CODE
          </p>

          {/* Languages */}
          <div className="mt-4 flex gap-2">
            <Tag icon={<Terminal size={14} />} text="Python" />
            <Tag icon={<Cpu size={14} />} text="C++" />
          </div>

          {/* TIMER */}
          <div className="mt-4 p-3 bg-[#1e1f22] rounded-lg">
            <h3 className="text-xs text-emerald-400 mb-2 flex items-center gap-2">
              <Clock size={14} /> Kỳ thi vào 10
            </h3>

            {timeLeft.expired ? (
              <p className="text-center text-emerald-400 font-bold">
                THI TỐT NHÉ!
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                <Time value={timeLeft.days} label="Ngày" />
                <Time value={timeLeft.hours} label="Giờ" />
                <Time value={timeLeft.minutes} label="Phút" />
                <Time value={timeLeft.seconds} label="Giây" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 space-y-3 text-sm">
            <Info
              icon={<Gamepad2 size={16} />}
              label="Discord"
              value="discord.gg/CTyUJsMNSr"
            />
            <Info
              icon={<Calendar size={16} />}
              label="Sinh nhật"
              value="01/11/2011"
            />
          </div>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1Ki4KizjmU/"
            target="_blank"
            className="mt-4 flex items-center justify-between p-2 bg-[#1e1f22] rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Facebook size={18} />
              <span>Facebook</span>
            </div>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Tag = ({ icon, text }) => (
  <div className="flex items-center gap-1 px-2 py-1 bg-[#0d1a12] rounded-md text-xs">
    {icon}
    {text}
  </div>
);

const Time = ({ value, label }) => (
  <div>
    <div className="font-bold">
      {value?.toString().padStart(2, "0")}
    </div>
    <div className="text-[10px] text-gray-400">{label}</div>
  </div>
);

const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <div className="text-gray-400 text-xs">{label}</div>
      <div>{value}</div>
    </div>
  </div>
);

export default App;
