import { Trash2, Bell, BellOff } from 'lucide-react';

export interface Alarm {
  id: string;
  time: string;
  label: string;
  active: boolean;
}

interface AlarmListProps {
  alarms: Alarm[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AlarmList = ({ alarms, onToggle, onDelete }: AlarmListProps) => {
  if (alarms.length === 0) {
    return <div className="text-gray-500 text-center py-8 italic">No alarms set. Add one above!</div>;
  }

  return (
    <div className="space-y-3 w-full max-h-64 overflow-y-auto pr-2 custom-scrollbar">
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className={`flex items-center justify-between p-4 rounded-lg transition-all border-l-4 ${
            alarm.active 
              ? 'bg-gray-800 border-blue-500 shadow-lg shadow-blue-500/10' 
              : 'bg-gray-800/50 border-gray-600 text-gray-500'
          }`}
        >
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${alarm.active ? 'text-white' : 'text-gray-500'}`}>
              {alarm.time}
            </span>
            <span className="text-sm truncate max-w-[150px]">{alarm.label}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(alarm.id)}
              title={alarm.active ? "Turn Off" : "Turn On"}
              className={`p-2 rounded-full transition-colors ${
                alarm.active 
                  ? 'text-blue-400 hover:bg-blue-400/10' 
                  : 'text-gray-600 hover:bg-gray-700'
              }`}
            >
              {alarm.active ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            <button
              onClick={() => onDelete(alarm.id)}
              title="Delete Alarm"
              className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-400/10 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
