import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Clock, 
  X, 
  Edit, 
  Trash2, 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  User,
  FileText
} from 'lucide-react';

const WorklogListPage = () => {
  // Stav filtrů
  const [filters, setFilters] = useState({
    person: '',
    startDate: '',
    endDate: '',
    task: ''
  });
  
  // Stav pro zobrazení filtrů
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Stránkování
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Řazení
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Ukázková data
  const worklogData = [
    {
      id: 1,
      date: '2025-04-09',
      formattedDate: '9. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '09:00',
      endTime: '11:45',
      breakTime: 15,
      worked: 150, // v minutách
      earnings: 687.5,
      deduction: 229.17,
      task: 'Wellness',
      note: 'Ranní směna'
    },
    {
      id: 2,
      date: '2025-04-09',
      formattedDate: '9. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '13:00',
      endTime: '15:30',
      breakTime: 0,
      worked: 150, // v minutách
      earnings: 687.5,
      deduction: 229.17,
      task: 'Příprava vily',
      note: 'Odpolední směna'
    },
    {
      id: 3,
      date: '2025-04-08',
      formattedDate: '8. 4. 2025',
      person: 'marty',
      personName: 'Marty',
      startTime: '10:00',
      endTime: '14:00',
      breakTime: 30,
      worked: 210, // v minutách
      earnings: 1400,
      deduction: 700,
      task: 'Pracovní hovor',
      note: 'Telefonát s klienty'
    },
    {
      id: 4,
      date: '2025-04-08',
      formattedDate: '8. 4. 2025',
      person: 'marty',
      personName: 'Marty',
      startTime: '15:00',
      endTime: '17:30',
      breakTime: 0,
      worked: 150, // v minutách
      earnings: 1000,
      deduction: 500,
      task: 'Prádelna',
      note: 'Praní a žehlení'
    },
    {
      id: 5,
      date: '2025-04-07',
      formattedDate: '7. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '08:30',
      endTime: '12:30',
      breakTime: 20,
      worked: 220, // v minutách
      earnings: 1008.33,
      deduction: 336.11,
      task: 'Příprava vily',
      note: 'Úklid po víkendu'
    },
    {
      id: 6,
      date: '2025-04-07',
      formattedDate: '7. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '13:30',
      endTime: '17:10',
      breakTime: 30,
      worked: 190, // v minutách
      earnings: 869.79,
      deduction: 289.93,
      task: 'Wellness',
      note: 'Odpolední wellness'
    },
    {
      id: 7,
      date: '2025-04-06',
      formattedDate: '6. 4. 2025',
      person: 'marty',
      personName: 'Marty',
      startTime: '09:00',
      endTime: '14:00',
      breakTime: 45,
      worked: 255, // v minutách
      earnings: 1700,
      deduction: 850,
      task: 'Wellness',
      note: 'Víkendový provoz wellness'
    },
    {
      id: 8,
      date: '2025-04-05',
      formattedDate: '5. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '10:00',
      endTime: '16:00',
      breakTime: 60,
      worked: 300, // v minutách
      earnings: 1375,
      deduction: 458.33,
      task: 'Prádelna',
      note: 'Velké praní po týdnu'
    },
    // Přidáno více záznamů pro demonstraci stránkování
    {
      id: 9,
      date: '2025-04-04',
      formattedDate: '4. 4. 2025',
      person: 'marty',
      personName: 'Marty',
      startTime: '08:00',
      endTime: '12:00',
      breakTime: 15,
      worked: 225, // v minutách
      earnings: 1500,
      deduction: 750,
      task: 'Příprava vily',
      note: 'Příprava na příjezd hostů'
    },
    {
      id: 10,
      date: '2025-04-04',
      formattedDate: '4. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '13:00',
      endTime: '18:00',
      breakTime: 30,
      worked: 270, // v minutách
      earnings: 1237.5,
      deduction: 412.5,
      task: 'Pracovní hovor',
      note: 'Objednávka potřeb'
    },
    {
      id: 11,
      date: '2025-04-03',
      formattedDate: '3. 4. 2025',
      person: 'maru',
      personName: 'Maru',
      startTime: '09:30',
      endTime: '14:30',
      breakTime: 45,
      worked: 255, // v minutách
      earnings: 1168.75,
      deduction: 389.58,
      task: 'Wellness',
      note: 'Běžný provoz'
    },
    {
      id: 12,
      date: '2025-04-03',
      formattedDate: '3. 4. 2025',
      person: 'marty',
      personName: 'Marty',
      startTime: '15:00',
      endTime: '19:00',
      breakTime: 0,
      worked: 240, // v minutách
      earnings: 1600,
      deduction: 800,
      task: 'Příprava vily',
      note: 'Večerní příprava'
    }
  ];
  
  // Filtrovaná data
  const filteredData = worklogData.filter(entry => {
    // Filtrace podle osoby
    if (filters.person && entry.person !== filters.person) {
      return false;
    }
    
    // Filtrace podle data začátku
    if (filters.startDate && entry.date < filters.startDate) {
      return false;
    }
    
    // Filtrace podle data konce
    if (filters.endDate && entry.date > filters.endDate) {
      return false;
    }
    
    // Filtrace podle úkolu
    if (filters.task && entry.task !== filters.task) {
      return false;
    }
    
    return true;
  });
  
  // Řazení dat
  const sortedData = [...filteredData].sort((a, b) => {
    let valA, valB;
    
    // Určení hodnot pro porovnání podle sortBy
    switch(sortBy) {
      case 'date':
        valA = a.date;
        valB = b.date;
        break;
      case 'person':
        valA = a.person;
        valB = b.person;
        break;
      case 'task':
        valA = a.task;
        valB = b.task;
        break;
      case 'worked':
        valA = a.worked;
        valB = b.worked;
        break;
      case 'earnings':
        valA = a.earnings;
        valB = b.earnings;
        break;
      default:
        valA = a.date;
        valB = b.date;
    }
    
    // Řazení vzestupně nebo sestupně
    if (sortDirection === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
  
  // Stránkování dat
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  // Formátování času v minutách na hodiny a minuty (např. 01:30)
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };
  
  // Změna stránky
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Změna řazení
  const handleSort = (column) => {
    if (sortBy === column) {
      // Pokud je již řazeno podle tohoto sloupce, změnit směr řazení
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Jinak nastavit řazení podle nového sloupce
      setSortBy(column);
      setSortDirection('desc'); // Výchozí je sestupně
    }
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
  
  // Přepínání zobrazení filtrů
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  // Získání unikátních úkolů pro select
  const uniqueTasks = [...new Set(worklogData.map(item => item.task))];
  
  // Výpočet souhrnných hodnot pro filtrovaná data
  const summary = filteredData.reduce((acc, item) => {
    return {
      totalWorked: acc.totalWorked + item.worked,
      totalEarnings: acc.totalEarnings + item.earnings,
      totalDeduction: acc.totalDeduction + item.deduction
    };
  }, { totalWorked: 0, totalEarnings: 0, totalDeduction: 0 });
  
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 mt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Přehled pracovních záznamů</h1>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" />
            {new Date().toLocaleDateString('cs-CZ')}
          </div>
        </div>
      </div>
      
      {/* Vyhledávání a filtry */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Hledat v záznamech..."
              className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
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
            Export CSV
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
                  {uniqueTasks.map((task, index) => (
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
                  <X size={16} className="mr-2" />
                  Resetovat
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Souhrn */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Souhrn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <div className="text-xs text-indigo-600 mb-1">Celkem odpracováno</div>
            <div className="text-xl font-bold text-indigo-700">{formatTime(summary.totalWorked)}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="text-xs text-green-600 mb-1">Celkový výdělek</div>
            <div className="text-xl font-bold text-green-700">{summary.totalEarnings.toFixed(2)} CZK</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <div className="text-xs text-purple-600 mb-1">Celkové srážky</div>
            <div className="text-xl font-bold text-purple-700">{summary.totalDeduction.toFixed(2)} CZK</div>
          </div>
        </div>
      </div>
      
      {/* Tabulka záznamů */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Datum
                    {sortBy === 'date' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('person')}
                >
                  <div className="flex items-center">
                    Osoba
                    {sortBy === 'person' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Čas
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('task')}
                >
                  <div className="flex items-center">
                    Úkol
                    {sortBy === 'task' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('worked')}
                >
                  <div className="flex items-center justify-end">
                    Odpracováno
                    {sortBy === 'worked' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('earnings')}
                >
                  <div className="flex items-center justify-end">
                    Výdělek
                    {sortBy === 'earnings' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Srážka
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map(entry => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.formattedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        entry.person === 'maru' 
                          ? 'bg-indigo-100 text-indigo-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <User size={12} className="mr-1" />
                        {entry.personName}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      <div>{entry.startTime} - {entry.endTime}</div>
                      {entry.breakTime > 0 && (
                        <div className="text-xs text-gray-500">
                          Pauza: {entry.breakTime} min
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{entry.task}</div>
                    {entry.note && (
                      <div className="text-xs text-gray-500 max-w-xs truncate">{entry.note}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">{formatTime(entry.worked)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">{entry.earnings.toFixed(2)} CZK</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-sm">{entry.deduction.toFixed(2)} CZK</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-1 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pokud nejsou žádné výsledky */}
        {filteredData.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <FileText size={40} className="mx-auto mb-2 text-gray-400" />
            <p>Žádné záznamy neodpovídají zadaným filtrům</p>
          </div>
        )}
        
        {/* Stránkování */}
        {filteredData.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Zobrazeno <span className="font-medium">{indexOfFirstItem + 1}</span> až <span className="font-medium">{Math.min(indexOfLastItem, filteredData.length)}</span> z <span className="font-medium">{filteredData.length}</span> záznamů
              </div>
              <div className="flex justify-between sm:justify-end space-x-1">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-md border ${currentPage === 1 ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Předchozí</span>
                  <ArrowLeft size={16} />
                </button>
                
                {/* Tlačítka stránek */}
                <div className="hidden md:flex">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Výpočet, které stránky zobrazit (např. pro celkem 10 stránek a aktuální stránku 8, 
                    // chceme zobrazit stránky 6, 7, 8, 9, 10, ne 1, 2, 3, 4, 5)
                    
                    let pageNum;
                    
                    if (totalPages <= 5) {
                      // Pokud je celkový počet stránek 5 nebo méně, zobrazíme je všechny
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Pokud jsme na začátku, zobrazíme stránky 1-5
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Pokud jsme na konci, zobrazíme posledních 5 stránek
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Jinak zobrazíme 2 stránky před a 2 stránky za aktuální stránkou
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border ${currentPage === pageNum ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-md border ${currentPage === totalPages ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Další</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorklogListPage;