import { useState, useEffect } from 'react';

export default function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!endTime) return;

    const updateTimer = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      
      if (diff <= 0) {
        setIsExpired(true);
        return;
      }

      const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (!endTime) return null;

  if (isExpired) {
    return (
      <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
        <span className="text-sm text-gray-500 font-medium">Đã kết thúc</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-3 py-2 rounded-lg border border-red-200">
      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <div className="flex items-center gap-1 font-mono text-sm">
        <div className="flex flex-col items-center">
          <span className="font-bold text-red-600">{timeLeft.hours}</span>
          <span className="text-[10px] text-gray-500 uppercase">Giờ</span>
        </div>
        <span className="text-red-600 font-bold pb-3">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-red-600">{timeLeft.minutes}</span>
          <span className="text-[10px] text-gray-500 uppercase">Phút</span>
        </div>
        <span className="text-red-600 font-bold pb-3">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-red-600">{timeLeft.seconds}</span>
          <span className="text-[10px] text-gray-500 uppercase">Giây</span>
        </div>
      </div>
    </div>
  );
}