import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-800 rounded-full shadow-2xl border-4 border-blue-500 w-64 h-64 mb-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors rounded-full"></div>
      <div className="text-5xl font-bold text-white tracking-widest z-10">
        {format(time, 'HH:mm')}
      </div>
      <div className="text-xl text-gray-400 mt-2 z-10 font-mono">
        {format(time, 'ss')}
      </div>
      <div className="text-sm text-blue-400 mt-2 font-medium uppercase tracking-wide z-10">
        {format(time, 'EEEE, MMM do')}
      </div>
    </div>
  );
};
