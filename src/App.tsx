import { useState, useEffect } from 'react';
import { Clock } from './components/Clock';
import { AlarmList, Alarm } from './components/AlarmList';
import { AlarmForm } from './components/AlarmForm';
import { startAlarm, stopAlarm } from './lib/audio';
import { format } from 'date-fns';
import { BellRing, X } from 'lucide-react';

function App() {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('alarms');
    return saved ? JSON.parse(saved) : [];
  });

  const [triggeredAlarm, setTriggeredAlarm] = useState<Alarm | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Time Check Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeString = format(now, 'HH:mm');
      const currentSeconds = now.getSeconds();

      // Only check at the start of the minute (approx) to avoid constant re-triggering
      // Actually, we should check if it matches AND hasn't triggered yet for this instance.
      // For simplicity in this MVP: 
      // If time matches an active alarm, trigger it. 
      // To avoid re-triggering every second of that minute, we could track "lastTriggeredTime" 
      // or just trigger if we aren't already triggered.
      
      if (triggeredAlarm) return; // Already ringing

      if (currentSeconds === 0) { // Check only at :00 seconds
         const match = alarms.find(a => a.active && a.time === currentTimeString);
         if (match) {
           setTriggeredAlarm(match);
           startAlarm();
         }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, triggeredAlarm]);


  const addAlarm = (alarm: Alarm) => {
    setAlarms(prev => [...prev, alarm]);
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const handleStopAlarm = () => {
    stopAlarm();
    setTriggeredAlarm(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 font-sans relative">
      
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-blue-500 flex items-center gap-2">
           <BellRing /> React Alarm Clock
        </h1>
        
        <Clock />
        
        <div className="w-full bg-gray-800/30 p-6 rounded-3xl backdrop-blur-sm border border-gray-700 shadow-2xl">
           <AlarmForm onAdd={addAlarm} />
           <AlarmList alarms={alarms} onToggle={toggleAlarm} onDelete={deleteAlarm} />
        </div>
      </div>

      {/* Alarm Modal Overlay */}
      {triggeredAlarm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
           <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-red-500 max-w-sm w-full text-center animate-bounce-slight">
              <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <BellRing size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{triggeredAlarm.time}</h2>
              <p className="text-xl text-gray-300 mb-8">{triggeredAlarm.label}</p>
              
              <button 
                onClick={handleStopAlarm}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <X size={24} /> Stop Alarm
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

export default App