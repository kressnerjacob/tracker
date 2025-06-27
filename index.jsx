import { useState } from 'react';

export default function Home() {
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
    <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Weekly Tracker</h1>
      {days.map((day, idx) => (
        <div key={day} style={{ backgroundColor: 'white', marginBottom: '1rem', padding: '1rem', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>{day}</h2>
          {habits.map(habit => (
            <label key={habit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={checks[idx][habit]}
                onChange={() => toggleCheck(idx, habit)}
              />
              {habit}
            </label>
          ))}
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '6px', height: '12px', marginTop: '0.5rem' }}>
            <div style={{ backgroundColor: '#3b82f6', height: '12px', borderRadius: '6px', width: `${getProgress(idx)}%` }} />
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{getProgress(idx)}% complete</p>
        </div>
      ))}
    </main>
  );
}