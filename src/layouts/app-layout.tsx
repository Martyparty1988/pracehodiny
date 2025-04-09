import React, { useState } from 'react';
import { 
  Clock, 
  ClipboardList, 
  BarChart, 
  DollarSign, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';

// Ukázková komponenta pro obsah stránky
const PageContent = ({ children, title }) => (
  <div className="p-4 max-w-4xl mx-auto">
    <h1 className="text-xl font-bold mb-4">{title}</h1>
    <div className="bg-white rounded-lg shadow p-4">
      {children}
    </div>
  </div>
);

const AppLayout = () => {
  // Aktivní stránka (časovač je výchozí)
  const [activePage, setActivePage] = useState('timer');
  // Stav pro mobilní menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Konfigurace navigačních položek
  const navItems = [
    { id: 'timer', label: 'Časovač', icon: <Clock size={20} /> },
    { id: 'worklog', label: 'Záznamy', icon: <ClipboardList size={20} /> },
    { id: 'reports', label: 'Přehledy', icon: <BarChart size={20} /> },
    { id: 'finance', label: 'Finance', icon: <DollarSign size={20} /> },
    { id: 'settings', label: 'Nastavení', icon: <Settings size={20} /> }
  ];

  // Funkce pro změnu stránky
  const changePage = (pageId) => {
    setActivePage(pageId);
    setMenuOpen(false); // Zavře mobilní menu při změně stránky
  };

  // Funkce pro přepínání mobilního menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Vykreslení obsahu podle aktivní stránky
  const renderContent = () => {
    switch (activePage) {
      case 'timer':
        return (
          <PageContent title="Časovač">
            <div className="text-center text-gray-500">
              Zde bude komponenta časovače
            </div>
          </PageContent>
        );
      case 'worklog':
        return (
          <PageContent title="Pracovní záznamy">
            <div className="text-center text-gray-500">
              Zde bude přehled pracovních záznamů
            </div>
          </PageContent>
        );
      case 'reports':
        return (
          <PageContent title="Přehledy">
            <div className="text-center text-gray-500">
              Zde budou grafy a statistiky
            </div>
          </PageContent>
        );
      case 'finance':
        return (
          <PageContent title="Finance a dluhy">
            <div className="text-center text-gray-500">
              Zde bude správa financí a dluhů
            </div>
          </PageContent>
        );
      case 'settings':
        return (
          <PageContent title="Nastavení">
            <div className="text-center text-gray-500">
              Zde bude nastavení aplikace
            </div>
          </PageContent>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Horní lišta - pouze pro mobilní zobrazení */}
      <header className="bg-indigo-600 text-white md:hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-lg font-bold">Pracovní výkazy</h1>
          <button
            onClick={toggleMenu}
            className="p-1 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Boční navigace - desktop */}
        <nav className="hidden md:flex flex-col w-64 bg-indigo-800 text-white">
          <div className="p-4 bg-indigo-900">
            <h1 className="text-xl font-bold">Pracovní výkazy</h1>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => changePage(item.id)}
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activePage === item.id
                    ? 'bg-indigo-700 font-medium'
                    : 'hover:bg-indigo-700/50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobilní navigace - vysune se z boku */}
        <div
          className={`fixed inset-0 z-20 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform duration-300 ease-in-out`}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleMenu}></div>
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-indigo-800 text-white shadow-xl">
            <div className="flex justify-between items-center p-4 bg-indigo-900">
              <h1 className="text-xl font-bold">Pracovní výkazy</h1>
              <button
                onClick={toggleMenu}
                className="p-1 rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <div className="py-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => changePage(item.id)}
                  className={`flex items-center w-full px-6 py-4 text-left ${
                    activePage === item.id
                      ? 'bg-indigo-700 font-medium'
                      : 'hover:bg-indigo-700/50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spodní navigace - pouze pro mobilní zobrazení */}
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 md:hidden z-10">
          <div className="flex justify-around">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => changePage(item.id)}
                className={`flex flex-1 flex-col items-center py-2 ${
                  activePage === item.id
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-500'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hlavní obsah */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;