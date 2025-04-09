import React, { useState, useEffect } from 'react';
import { Play, Pause, StopCircle, Clock, DollarSign, ChevronDown, ChevronUp, User } from 'lucide-react';

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
  
  // Efekt pro časovač
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
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
      // V reálné aplikaci bychom zobrazili alert nebo toast
      console.warn("Vyberte úkol před spuštěním časovače");
      return;
    }
    setIsRunning(true);
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleStop = () => {
    // V reálné aplikaci bychom uložili záznam do databáze
    setIsRunning(false);
    setTime(0);
    setNote('');
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Horní část s časem a earnings */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <User size={20} className="mr-2" />
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
              <Play size={24} fill="white" />
            </button>
          ) : (
            <button 
              onClick={handlePause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition-all"
            >
              <Pause size={24} />
            </button>
          )}
          
          <button 
            onClick={handleStop}
            className={`${time > 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-full p-3 shadow-lg transition-all`}
            disabled={time === 0}
          >
            <StopCircle size={24} />
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

export default Timer;