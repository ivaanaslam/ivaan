import { useState } from 'react';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Alarm } from './AlarmList';

interface AlarmFormProps {
  onAdd: (alarm: Alarm) => void;
}

export const AlarmForm = ({ onAdd }: AlarmFormProps) => {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) return;
    
    onAdd({
      id: uuidv4(),
      time,
      label: label || 'Alarm',
      active: true,
    });
    
    // Reset form but keep time close to what was picked? No, clear it.
    setTime('');
    setLabel('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 w-full bg-gray-800 p-3 rounded-xl shadow-lg">
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-1/3"
        required
      />
      <input
        type="text"
        placeholder="Label..."
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-w-0"
      />
      <button
        type="submit"
        title="Add Alarm"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center aspect-square"
      >
        <Plus size={24} />
      </button>
    </form>
  );
};
