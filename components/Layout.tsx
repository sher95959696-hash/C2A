
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Scissors, Calendar, Image, History, Moon, Sun, Shield, Lock } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { APP_MODE } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { branding, theme, toggleTheme } = useAppContext();

  const navItems = [
    { path: '/', icon: <Home size={18} />, label: 'Home' },
    { path: '/services', icon: <Scissors size={18} />, label: 'Menu' },
    { path: '/booking', icon: <Calendar size={18} />, label: 'Book' },
    { path: '/history', icon: <History size={18} />, label: 'Trips' },
    { path: '/gallery', icon: <Image size={18} />, label: 'Looks' },
  ];

  const isAdminBuild = APP_MODE === 'admin';
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Never show user navigation if it's an Admin Build
  const showNav = !isAdminBuild && !isAdminRoute;

  return (
    <div className={`flex flex-col h-screen font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-[#020202] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      <header className={`px-5 py-3 flex items-center justify-between sticky top-0 z-[100] transition-colors duration-500 ${theme === 'dark' ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-slate-200'}`}>
        <div className="flex items-center gap-2.5">
           <div className={`w-8 h-8 rounded-xl flex items-center justify-center p-1.5 shadow-sm border transition-all ${theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'}`}>
             {isAdminBuild ? (
               <Lock size={14} className="text-amber-500" />
             ) : (
               <img 
                 src={branding.logoUrl} 
                 alt="Logo" 
                 className="w-full h-full object-contain" 
                 onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://img.icons8.com/ios-filled/150/000000/barber.png";
                 }}
               />
             )}
           </div>
          <div>
            <h1 className={`text-[10px] font-black tracking-tight uppercase italic leading-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {isAdminBuild ? "ADMIN TERMINAL" : (branding.shopName || "Elite Salon")}
            </h1>
            <p className="text-[6px] font-black text-amber-500 uppercase tracking-[0.4em] mt-1 leading-none">
              {isAdminBuild ? "SECURE MANAGEMENT" : "HQ COMMAND"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center border ${theme === 'dark' ? 'bg-zinc-900 border-white/10 text-amber-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      <main className={`flex-1 overflow-y-auto no-scrollbar ${showNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>

      {showNav && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[100]">
          <nav className={`p-1 rounded-2xl flex justify-between items-center border transition-all duration-500 ${theme === 'dark' ? 'bg-zinc-950/95 backdrop-blur-2xl border-white/10 shadow-2xl' : 'bg-white/90 backdrop-blur-2xl border-slate-200 shadow-xl shadow-slate-200/50'}`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex-1 flex flex-col items-center justify-center transition-all py-2 rounded-xl gap-0.5 ${isActive ? 'bg-amber-500 text-black font-black' : theme === 'dark' ? 'text-zinc-600 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {item.icon}
                  <span className="text-[7px] font-black uppercase tracking-widest">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
