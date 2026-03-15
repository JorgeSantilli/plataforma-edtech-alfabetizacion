"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPadres() {
  const [showParentalGate, setShowParentalGate] = useState(false);
  const profile = useAuthStore((state) => state.profile);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 shadow-xl min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-full text-slate-500 hover:text-primary transition-colors"
              title="Cerrar sesión"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight">Portal Parental</h1>
          </div>
          <button 
            onClick={() => setShowParentalGate(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </header>

        {/* Child Profile Brief */}
        <div className="p-6">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 flex items-center gap-4 border border-primary/10 cursor-pointer hover:bg-primary/10 transition-colors">
            <div className="size-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl border-2 border-white dark:border-slate-800">
               👦
            </div>
            <div>
              <h2 className="font-bold text-lg">Progreso de Leo</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Nivel 3 • Lector en Crecimiento</p>
            </div>
            <div className="ml-auto">
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <section className="px-6 py-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Actividad de Lectura</h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">+24% vs last week</span>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-end h-32 px-2">
              {[
                { day: 'L', height: '40%', active: false },
                { day: 'M', height: '65%', active: false },
                { day: 'M', height: '90%', active: true },
                { day: 'J', height: '30%', active: false },
                { day: 'V', height: '55%', active: false },
                { day: 'S', height: '80%', active: false },
                { day: 'D', height: '70%', active: false },
              ].map((column, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full">
                  <div className={`w-2/3 ${column.active ? 'bg-primary' : 'bg-primary/20'} rounded-t-md transition-all`} style={{ height: column.height }}></div>
                  <span className="text-[10px] font-bold text-slate-400">{column.day}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Libros</p>
                <p className="font-bold text-lg text-primary">12</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Palabras Nuevas</p>
                <p className="font-bold text-lg text-primary">48</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Minutos</p>
                <p className="font-bold text-lg text-primary">125</p>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="p-6 space-y-6">
          {/* Screen Time Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Tiempo de Pantalla Diario</h3>
              <span className="text-sm font-bold text-primary">45 Minutes</span>
            </div>
            <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer">
              <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all" style={{ width: '60%' }}></div>
              <div className="absolute top-1/2 left-[60%] -translate-y-1/2 size-6 bg-white border-2 border-primary rounded-full shadow-lg cursor-grab"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
              <span>15M</span>
              <span>30M</span>
              <span>45M</span>
              <span>60M</span>
              <span>90M+</span>
            </div>
          </div>

          {/* Learning Focus Toggles */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Foco de Aprendizaje</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5 text-left transition-colors">
                <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">spellcheck</span>
                </div>
                <span className="text-xs font-bold leading-tight">Vocabulario</span>
              </button>
              
              <button className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-left opacity-60 hover:opacity-100 transition-all">
                <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                </div>
                <span className="text-xs font-bold leading-tight">Fonética y Audio</span>
              </button>
              
              <button className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-left opacity-60 hover:opacity-100 transition-all">
                <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                </div>
                <span className="text-xs font-bold leading-tight">Fluidez General</span>
              </button>
              
              <button className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5 text-left transition-colors">
                <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                </div>
                <span className="text-xs font-bold leading-tight">Comprensión</span>
              </button>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="px-6 pb-6 mt-auto">
          <div className="bg-slate-900 dark:bg-primary/20 rounded-xl p-5 text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Estado de la Suscripción</p>
              <p className="font-bold">Premium Family Plan</p>
              <p className="text-[10px] text-slate-400 mt-1">Renews on Oct 12, 2026</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 transition-colors text-white px-4 py-2 rounded-lg text-xs font-bold">
              Manage
            </button>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex justify-between items-center mt-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined font-bold">dashboard</span>
            <span className="text-[10px] font-bold">Estadísticas</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">library_books</span>
            <span className="text-[10px] font-bold">Biblioteca</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">auto_fix_high</span>
            <span className="text-[10px] font-bold">Asignar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-bold">Cuenta</span>
          </button>
        </nav>

        {/* Parental Gate Overlay */}
        {showParentalGate && (
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-xs rounded-xl p-8 text-center shadow-2xl">
              <h4 className="font-bold text-lg mb-2">Control Parental</h4>
              <p className="text-sm text-slate-500 mb-6">Resuelve esto para acceder a los ajustes:</p>
              <p className="text-3xl font-bold mb-6 text-primary tracking-widest">12 + 7 = ?</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg">17</button>
                <button 
                  onClick={() => setShowParentalGate(false)} // Simulate correct answer
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg"
                >19</button>
                <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg">21</button>
                <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg">15</button>
              </div>
              
              <button 
                onClick={() => setShowParentalGate(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                CANCELAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
