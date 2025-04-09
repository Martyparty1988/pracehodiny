import React, { useState } from 'react';
import { Clock, Calendar, ChevronDown, ChevronUp, Plus, AlertCircle, FileText, Edit, Trash2 } from 'lucide-react';

// Timer Component
const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [person, setPerson] = useState('maru');
  const [task, setTask] = useState('');
  const [note, setNote] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  // Hodinové sazby podle osoby
  const hourlyRates = {
    maru: 275,
    marty: 400
  };
  
  // Sazby srážek podle osoby
  const deductionRates = {
    maru: 1/3, // 33.33%
    marty: 0.5  // 50%
  };
  
  // Přednastavené úkoly
  const predefinedTasks = [
    'Wellness',
    'Pracovní hovor',
    'Příprava vily',
    'Prádelna'
  ];
  
  // Formátování času
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  // Výpočet výdělku
  const calculateEarnings = () => {
    const hours = time / 3600;
    return hours * hourlyRates[person];
  };
  
  // Výpočet srážky
  const calculateDeduction = () => {
    return calculateEarnings() * deductionRates[person];
  };
  
  // Obsluha tlačítek
  const handleStart = () => {
    if (!task) {
      alert("Prosím vyberte úkol před spuštěním časovače");
      return;
    }
    setIsRunning(true);
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleStop = () => {
    if (time === 0) return;
    
    if (window.confirm("Opravdu chcete ukončit a uložit tento časovač?")) {
      // V reálné aplikaci bychom uložili záznam do databáze
      setIsRunning(false);
      setTime(0);
      setNote('');
    }
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Horní část s časem a earnings */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="relative">
              <select 
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="bg-transparent border-b border-white/50 font-bold text-lg pl-1 pr-6 py-0 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="maru" className="text-gray-800">Maru</option>
                <option value="marty" className="text-gray-800">Marty</option>
              </select>
              <ChevronDown size={16} className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="text-sm opacity-80">
            {hourlyRates[person]} CZK/h
          </div>
        </div>
        
        <div className="text-center my-6">
          <div className="text-5xl font-mono font-bold tracking-wider drop-shadow-md">
            {formatTime(time)}
          </div>
          
          {time > 0 && (
            <div className="flex justify-center gap-4 mt-2 text-sm font-medium">
              <div>
                <span>{calculateEarnings().toFixed(2)} CZK</span>
              </div>
              <div className="opacity-75">
                <span>Srážka: {calculateDeduction().toFixed(2)} CZK</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button 
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all"
              disabled={isRunning}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="white" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={handlePause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16" fill="white" />
                <rect x="14" y="4" width="4" height="16" fill="white" />
              </svg>
            </button>
          )}
          
          <button 
            onClick={handleStop}
            className={`${time > 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-full p-3 shadow-lg transition-all`}
            disabled={time === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <rect x="9" y="9" width="6" height="6" fill="white" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Spodní část s úkolem a poznámkou */}
      <div className="p-4 bg-white">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Úkol</label>
          <div className="relative">
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isRunning}
            >
              <option value="">-- Vyberte úkol --</option>
              {predefinedTasks.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              {task && !predefinedTasks.includes(task) && (
                <option value={task}>{task}</option>
              )}
              <option value="custom">+ Vlastní úkol</option>
            </select>
          </div>
          
          {task === 'custom' && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Zadejte název úkolu"
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setTask(e.target.value)}
                disabled={isRunning}
                autoFocus
              />
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleDetails} 
          className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <span>Poznámka</span>
          {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showDetails && (
          <div className="mt-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Zadejte poznámku k úkolu..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
            />
          </div>
        )}
      </div>
      
      {/* Indikátor běžícího časovače */}
      {isRunning && (
        <div className="py-2 bg-green-100 text-green-800 text-center text-sm font-medium flex justify-center items-center">
          <Clock size={14} className="mr-2 animate-pulse" />
          Časovač běží
        </div>
      )}
    </div>
  );
};

// Komponenta pro manuální přidání záznamu
const ManualEntryForm = ({ isOpen, toggle }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
    <button 
      onClick={toggle}
      className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center font-medium text-gray-700">
        <Plus size={18} className="mr-2 text-indigo-600" />
        Manuální záznam
      </div>
      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
    
    {isOpen && (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Osoba</label>
            <select className="block w-full p-2 border border-gray-300 rounded-md text-sm">
              <option value="maru">Maru</option>
              <option value="marty">Marty</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
            <input 
              type="date" 
              className="block w-full p-2 border border-gray-300 rounded-md text-sm"
              // Nastavení možnosti vybrat datum až rok zpátky
              min={(() => {
                const d = new Date();
                d.setFullYear(d.getFullYear() - 1);
                return d.toISOString().split('T')[0];
              })()}
              max={(() => {
                return new Date().toISOString().split('T')[0];
              })()}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Od</label>
            <input type="time" className="block w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Do</label>
            <input type="time" className="block w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pauza (minuty)</label>
          <input type="number" min="0" className="block w-full p-2 border border-gray-300 rounded-md text-sm" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Úkol</label>
          <select className="block w-full p-2 border border-gray-300 rounded-md text-sm">
            <option value="">-- Vyberte úkol --</option>
            <option>Wellness</option>
            <option>Pracovní hovor</option>
            <option>Příprava vily</option>
            <option>Prádelna</option>
            <option value="custom">+ Vlastní úkol</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Poznámka</label>
          <textarea className="block w-full p-2 border border-gray-300 rounded-md text-sm" rows="2"></textarea>
        </div>
        
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
          Přidat záznam
        </button>
      </div>
    )}
  </div>
);

// Ukázková komponenta recentních záznamů
const RecentEntries = () => {
  // Přidání stavu pro editovaný záznam
  const [editingId, setEditingId] = useState(null);
  
  // Ukázkové záznamy pro demonstraci
  const [entries, setEntries] = useState([
    {
      id: 1,
      task: "Wellness",
      person: "maru",
      dateText: "Dnes",
      timeRange: "13:45-15:30",
      startTime: "13:45",
      endTime: "15:30",
      earnings: 481.25,
      duration: "01:45:00"
    },
    {
      id: 2,
      task: "Pracovní hovor",
      person: "marty",
      dateText: "Dnes",
      timeRange: "10:00-12:30",
      startTime: "10:00",
      endTime: "12:30",
      earnings: 1000.00,
      duration: "02:30:00"
    },
    {
      id: 3,
      task: "Příprava vily",
      person: "maru",
      dateText: "Včera",
      timeRange: "09:15-11:45",
      startTime: "09:15",
      endTime: "11:45",
      earnings: 687.50,
      duration: "02:30:00"
    }
  ]);
  
  // Funkce pro odstranění záznamu
  const deleteEntry = (id) => {
    if (window.confirm("Opravdu chcete smazat tento záznam?")) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };
  
  // Funkce pro uložení upravovaného záznamu
  const saveEdit = (id, updatedData) => {
    setEntries(entries.map(entry => 
      entry.id === id 
        ? { 
            ...entry, 
            ...updatedData,
            timeRange: `${updatedData.startTime}-${updatedData.endTime}`
          } 
        : entry
    ));
    setEditingId(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="font-medium text-gray-800 mb-3 flex items-center">
        <Calendar size={18} className="mr-2" />
        Poslední záznamy
      </h3>
      <ul className="divide-y divide-gray-200">
        {entries.map(entry => (
          <li key={entry.id} className="py-3">
            {editingId === entry.id ? (
              // Editovací režim
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Úkol</label>
                    <select 
                      className="block w-full p-1 text-sm border border-gray-300 rounded" 
                      defaultValue={entry.task}
                      onChange={(e) => entry.task = e.target.value}
                    >
                      <option>Wellness</option>
                      <option>Pracovní hovor</option>
                      <option>Příprava vily</option>
                      <option>Prádelna</option>
                      <option value="custom">+ Vlastní úkol</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Osoba</label>
                    <select 
                      className="block w-full p-1 text-sm border border-gray-300 rounded"
                      defaultValue={entry.person}
                      onChange={(e) => entry.person = e.target.value}
                    >
                      <option value="maru">Maru</option>
                      <option value="marty">Marty</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Od</label>
                    <input 
                      type="time" 
                      className="block w-full p-1 text-sm border border-gray-300 rounded"
                      defaultValue={entry.startTime}
                      onChange={(e) => entry.startTime = e.target.value}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Do</label>
                    <input 
                      type="time" 
                      className="block w-full p-1 text-sm border border-gray-300 rounded"
                      defaultValue={entry.endTime}
                      onChange={(e) => entry.endTime = e.target.value}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-2">
                  <button 
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 text-xs text-gray-600 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Zrušit
                  </button>
                  <button 
                    onClick={() => saveEdit(entry.id, {
                      task: entry.task,
                      person: entry.person,
                      startTime: entry.startTime,
                      endTime: entry.endTime
                    })}
                    className="px-2 py-1 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                  >
                    Uložit
                  </button>
                </div>
              </div>
            ) : (
              // Zobrazovací režim
              <div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{entry.task}</p>
                    <p className="text-sm text-gray-500">
                      {entry.person === 'maru' ? 'Maru' : 'Marty'} • {entry.dateText}, {entry.timeRange}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{entry.earnings.toFixed(2)} CZK</p>
                    <p className="text-sm text-gray-500">{entry.duration}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-1">
                  <button 
                    onClick={() => setEditingId(entry.id)}
                    className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => deleteEntry(entry.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="w-full mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center">
        Zobrazit všechny záznamy
        <ChevronDown size={16} className="ml-1" />
      </button>
    </div>
  );
};

// Hlavní stránka s časovačem
const HomePage = () => {
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  
  const toggleManualEntry = () => {
    setIsManualEntryOpen(!isManualEntryOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6 mt-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Časovač</h1>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {new Date().toLocaleDateString('cs-CZ')}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hlavní časovač */}
          <div className="lg:col-span-2">
            <Timer />
          </div>
          
          {/* Boční panel */}
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Tip</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Nezapomeňte zastavit časovač při dokončení práce. Časovač se automaticky uloží jako pracovní záznam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulář pro manuální zadání */}
            <ManualEntryForm 
              isOpen={isManualEntryOpen}
              toggle={toggleManualEntry}
            />
          </div>
        </div>
        
        {/* Sekce s posledními záznamy */}
        <div className="mt-6">
          <RecentEntries />
        </div>
      </div>
    </div>
  );
};

export default HomePage;