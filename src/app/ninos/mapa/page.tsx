"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useChildStore } from '@/store/useChildStore';
import { motion } from 'framer-motion';

export default function MapaAventuras() {
  const { selectedChild } = useChildStore();
  const router = useRouter();

  useEffect(() => {
    if (!selectedChild) {
      router.push('/ninos/onboarding');
    }
  }, [selectedChild, router]);

  if (!selectedChild) return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center">
      <div className="animate-bounce text-6xl">🚀</div>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Academia de Aventuras</h2>
          </div>
          
          <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
            <div className="flex gap-2">
              <div className="flex min-w-[100px] items-center justify-center rounded-full h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg">
                <span className="material-symbols-outlined mr-1 text-lg">star</span>
                <span className="truncate">{selectedChild.total_xp}</span>
              </div>
            </div>
            
            <div className="bg-primary/20 p-0.5 rounded-full border-2 border-primary">
                <div className="bg-white rounded-full size-10 flex items-center justify-center text-primary font-bold text-xl">
                  {selectedChild.avatar_url || '👦'}
                </div>
            </div>
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-slate-500 leading-none">NIVEL {selectedChild.current_level}</p>
                <p className="font-black text-primary leading-none uppercase">{selectedChild.name}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 md:p-10">
          <div className="mb-10 text-center">
            <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-4xl md:text-5xl font-black mb-4 uppercase">¡Hola {selectedChild.name}!</h1>
            <p className="text-slate-500 text-xl font-bold">¿A qué isla viajamos hoy?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Isla 1: Fonética */}
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-3xl p-8 border-b-8 border-emerald-500 shadow-xl">
                <div className="text-7xl mb-4 text-center">🏝️</div>
                <h3 className="text-2xl font-black text-center mb-4">ISLA DE LOS SONIDOS</h3>
                <p className="text-slate-500 text-center mb-6 font-bold">Aprende los sonidos de las letras con el profe Búho.</p>
                <Link href="/ninos/actividad-fonologica">
                    <button className="w-full py-4 bg-emerald-500 text-white rounded-full font-black text-xl shadow-lg hover:bg-emerald-600 transition-colors uppercase">¡JUGAR!</button>
                </Link>
            </motion.div>

            {/* Isla 2: Sílabas (Bloqueada) */}
            <div className="bg-slate-100 rounded-3xl p-8 border-b-8 border-slate-300 shadow-xl opacity-60 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-500">lock</span>
                </div>
                <div className="text-7xl mb-4 text-center grayscale">🌊</div>
                <h3 className="text-2xl font-black text-center mb-4 text-slate-400">PUEBLO SILÁBICO</h3>
                <div className="h-2 w-full bg-slate-200 rounded-full mt-4"></div>
            </div>

            {/* Isla 3: Palabras (Bloqueada) */}
            <div className="bg-slate-100 rounded-3xl p-8 border-b-8 border-slate-300 shadow-xl opacity-60 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-500">lock</span>
                </div>
                <div className="text-7xl mb-4 text-center grayscale">🌋</div>
                <h3 className="text-2xl font-black text-center mb-4 text-slate-400">VOLCÁN DE PALABRAS</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
