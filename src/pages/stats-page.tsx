import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell, 
  Pie,
  PieChart
} from 'recharts';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BarChart2,
  TrendingUp,
  Download,
  CircleDashed
} from 'lucide-react';

const StatsPage = () => {
  // Stav filtrů
  const [filters, setFilters] = useState({
    person: '',
    startDate: '',
    endDate: '',
    task: ''
  });
  
  // Stav pro zobrazení filtrů
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Aktivní typ grafu
  const [activeChart, setActiveChart] = useState('byPerson');
  
  // Přepínání zobrazení filtrů
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  // Změna filtrů
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Resetování filtrů
  const resetFilters = () => {
    setFilters({
      person: '',
      startDate: '',
      endDate: '',
      task: ''
    });
  };
  
  // Ukázkové kategorie úkolů
  const tasks = ['Wellness', 'Pracovní hovor', 'Příprava vily', 'Prádelna'];
  
  // Ukázková data pro různé typy grafů
  
  // Data pro graf podle osob
  const personData = [
    { name: 'Maru', earnings: 4867.37, deduction: 1622.46, worked: 1065 },
    { name: 'Marty', earnings: 7200, deduction: 3600, worked: 1080 }
  ];
  
  // Data pro graf podle měsíců
  const monthData = [
    { name: 'Leden', maru: 3500, marty: 4800 },
    { name: 'Únor', maru: 2800, marty: 5200 },
    { name: 'Březen', maru: 3200, marty: 4500 },
    { name: 'Duben', maru: 4867.37, marty: 7200 }
  ];
  
  // Data pro graf podle úkolů
  const taskData = [
    { name: 'Wellness', earnings: 4556.25, hours: 16.5 },
    { name: 'Pracovní hovor', earnings: 2400, hours: 6.0 },
    { name: 'Příprava vily', earnings: 3057.29, hours: 11.0 },
    { name: 'Prádelna', earnings: 2062.5, hours: 7.5 }
  ];
  
  // Barvy pro grafy
  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ef4444', '#a855f7', '#06b6d4'];
  
  // Formátování času v minutách na hodiny a minuty pro zobrazení
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Formátovací funkce pro Tooltip
  const formatTooltipTime = (value) => {
    return `${formatTime(value)}`;
  };
  
  const formatCurrency = (value) => {
    return `${value.toFixed(2)} CZK`;
  };
  
  // Vykreslení aktivního grafu
  const renderChart = () => {
    switch (activeChart) {
      case 'byPerson':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Výdělek podle osoby</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Graf výdělku */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={personData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" unit=" CZK" />
                    <Tooltip formatter={(value, name) => [formatCurrency(value), name === 'earnings' ? 'Výdělek' : 'Srážka']} />
                    <Legend formatter={(value) => value === 'earnings' ? 'Výdělek' : 'Srážka'} />
                    <Bar yAxisId="left" dataKey="earnings" name="earnings" fill="#3b82f6" />
                    <Bar yAxisId="left" dataKey="deduction" name="deduction" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Graf odpracovaného času */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={personData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={formatTooltipTime} 
                    />
                    <Tooltip formatter={(value, name) => [formatTime(value), 'Odpracováno']} />
                    <Legend formatter={() => 'Odpracováno'} />
                    <Bar dataKey="worked" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      case 'byMonth':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Výdělek podle měsíce</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit=" CZK" />
                  <Tooltip formatter={value => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="maru" stroke="#3b82f6" activeDot={{ r: 8 }} name="Maru" />
                  <Line type="monotone" dataKey="marty" stroke="#10b981" activeDot={{ r: 8 }} name="Marty" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'byTask':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Rozdělení podle úkolů</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Koláčový graf podle výdělku */}
              <div className="h-80">
                <h3 className="text-md font-medium text-gray-700 mb-2 text-center">Výdělek podle úkolů</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="earnings"
                    >
                      {
                        taskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                      }
                    </Pie>
                    <Tooltip formatter={value => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Koláčový graf podle hodin */}
              <div className="h-80">
                <h3 className="text-md font-medium text-gray-700 mb-2 text-center">Čas podle úkolů</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {
                        taskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                      }
                    </Pie>
                    <Tooltip formatter={value => `${value.toFixed(1)} h`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 mt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Statistiky a přehledy</h1>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" />
            {new Date().toLocaleDateString('cs-CZ')}
          </div>
        </div>
      </div>
      
      {/* Filtry a přepínače grafů */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <button
            onClick={toggleFilters}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Filter size={18} className="mr-2" />
            Filtry
            {isFiltersOpen ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
          </button>
          <button
            className="inline-flex items-center justify-center px-4 py-2 border border-indigo-500 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Download size={18} className="mr-2" />
            Export grafů
          </button>
        </div>
        
        {/* Rozbalovací panel s filtry */}
        {isFiltersOpen && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Osoba</label>
                <select 
                  name="person"
                  value={filters.person}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Všechny osoby</option>
                  <option value="maru">Maru</option>
                  <option value="marty">Marty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Od</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Do</label>
                <input 
                  type="date" 
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Úkol</label>
                <select 
                  name="task"
                  value={filters.task}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Všechny úkoly</option>
                  {tasks.map((task, index) => (
                    <option key={index} value={task}>{task}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center">
                  Resetovat filtry
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Sekce s celkovým přehledem */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Celkový přehled</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <div className="text-xs text-indigo-600 mb-1">Celkem odpracováno</div>
            <div className="text-xl font-bold text-indigo-700">36h 15m</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="text-xs text-green-600 mb-1">Celkový výdělek</div>
            <div className="text-xl font-bold text-green-700">12 067,37 CZK</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <div className="text-xs text-purple-600 mb-1">Celkové srážky</div>
            <div className="text-xl font-bold text-purple-700">5 222,46 CZK</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
            <div className="text-xs text-amber-600 mb-1">Průměrná hodinová sazba</div>
            <div className="text-xl font-bold text-amber-700">332,87 CZK</div>
          </div>
        </div>
      </div>
      
      {/* Přepínače typů grafů */}
      <div className="flex flex-wrap mb-6 gap-2">
        <button
          onClick={() => setActiveChart('byPerson')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeChart === 'byPerson' 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <BarChart2 size={18} className="mr-2" />
          Podle osoby
        </button>
        <button
          onClick={() => setActiveChart('byMonth')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeChart === 'byMonth' 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <TrendingUp size={18} className="mr-2" />
          Podle měsíce
        </button>
        <button
          onClick={() => setActiveChart('byTask')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeChart === 'byTask' 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <CircleDashed size={18} className="mr-2" />
          Podle úkolu
        </button>
      </div>
      
      {/* Zobrazení aktivního grafu */}
      {renderChart()}
      
      {/* Doplňující informace a statistiky */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Nejčastější úkoly</h2>
          <ul className="space-y-3">
            {taskData.map((task, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{task.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{task.hours} h</span>
                  <span className="mx-1">|</span>
                  <span>{task.earnings.toFixed(2)} CZK</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Srovnání osob</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Průměrná hodinová sazba</h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Maru</span>
                    <span className="text-xs font-medium">275 CZK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '68.75%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Marty</span>
                    <span className="text-xs font-medium">400 CZK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Odpracované hodiny</h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Maru</span>
                    <span className="text-xs font-medium">17.75 h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '98.6%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Marty</span>
                    <span className="text-xs font-medium">18 h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Celkový výdělek</h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Maru</span>
                    <span className="text-xs font-medium">4 867,37 CZK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '67.6%' }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Marty</span>
                    <span className="text-xs font-medium">7 200 CZK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;