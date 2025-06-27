'use client';
import { useState } from 'react';

export default function Page() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const habits = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Workout', 'Water'];
  const [checks, setChecks] = useState(
    Array(7).fill(null).map(() => Object.fromEntries(habits.map(h => [h, false])))
  );

  const toggleCheck = (dayIdx, habit) => {
    const newChecks = [...checks];
    newChecks[dayIdx][habit] = !newChecks[dayIdx][habit];
    setChecks(newChecks);
  };

  const getProgress = (dayIdx) => {
    const dayHabits = Object.values(checks[dayIdx]);
    return Math.round((dayHabits.filter(Boolean).length / habits.length) * 100);
  };

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Weekly Tracker</h1>
      {days.map((day, idx) => (
        <div key={day} className="bg-white p-4 rounded-xl shadow space-y-2">
          <h2 className="font-semibold">{day}</h2>
          {habits.map(habit => (
            <label key={habit} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checks[idx][habit]}
                onChange={() => toggleCheck(idx, habit)}
              />
              {habit}
            </label>
          ))}
          <div className="w-full bg-gray-200 rounded h-3 mt-2">
            <div className="bg-blue-500 h-3 rounded" style={{ width: `${getProgress(idx)}%` }} />
          </div>
          <p className="text-sm text-gray-500">{getProgress(idx)}% complete</p>
        </div>
      ))}
    </main>
  );
}