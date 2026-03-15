"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useChildStore } from '@/store/useChildStore';
import { cn } from '@/lib/utils';

const ALL_REWARDS = [
  { id: 'estrella_brillante', name: 'Estrella Brillante', icon: '⭐', description: '¡Por completar tu primera lección!', requiredXP: 0 },
  { id: 'libro_magico', name: 'Libro Mágico', icon: '📖', description: 'Leíste 5 cuentos seguidos.', requiredXP: 50 },
  { id: 'trofeo_oro', name: 'Trofeo de Oro', icon: '🏆', description: '¡Alcanzaste el Nivel 5!', requiredXP: 500 },
  { id: 'dragon_fuego', name: 'Dragón de Fuego', icon: '🐲', description: 'Dominaste todos los sonidos de las vocales.', requiredXP: 100 },
  { id: 'medalla_rapida', name: 'Medalla Veloz', icon: '🏅', description: 'Completaste un reto en menos de 1 minuto.', requiredXP: 200 },
  { id: 'cristal_sabiduria', name: 'Cristal de Sabiduría', icon: '💎', description: 'Aprendiste 50 palabras nuevas.', requiredXP: 1000 },
];

export default function SalaRecompensas() {
  const { selectedChild } = useChildStore();

  if (!selectedChild) return null;

  const unlockedCount = selectedChild.unlockedRewards?.length || 0;

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-950 font-display p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link href="/ninos/mapa" className="flex items-center justify-center size-14 bg-white dark:bg-slate-800 rounded-full shadow-lg border-b-4 border-slate-200 dark:border-slate-900 active:translate-y-1 active:border-b-0 transition-all">
            <span className="material-symbols-outlined text-amber-600 text-3xl font-black">arrow_back</span>
          </Link>

          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-6xl font-black text-amber-900 dark:text-amber-500 uppercase tracking-tight">Sala de Trofeos</h1>
            <p className="text-amber-700 dark:text-amber-600/70 font-bold text-xl">¡Mira todo lo que has logrado, {selectedChild.name}!</p>
          </div>

          <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-3xl shadow-xl border-4 border-amber-200 dark:border-amber-900/50 flex items-center gap-3">
            <span className="text-3xl">🏅</span>
            <span className="text-2xl font-black text-amber-600">{unlockedCount} / {ALL_REWARDS.length}</span>
          </div>
        </header>

        {/* Trophy Case Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_REWARDS.map((reward, index) => {
            const isUnlocked = selectedChild.unlockedRewards?.includes(reward.id);
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[2.5rem] border-b-8 transition-all overflow-hidden",
                  isUnlocked 
                    ? "bg-white dark:bg-slate-900 border-amber-400 shadow-2xl scale-100" 
                    : "bg-slate-100 dark:bg-slate-900/50 border-slate-300 opacity-60 grayscale scale-95"
                )}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/5 flex flex-col items-center justify-center z-10">
                    <span className="material-symbols-outlined text-6xl text-slate-400 mb-2">lock</span>
                    <p className="text-slate-500 font-black text-sm uppercase">Necesitas {reward.requiredXP} XP</p>
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    "size-32 rounded-full flex items-center justify-center text-7xl mb-6 shadow-inner",
                    isUnlocked ? "bg-amber-100 dark:bg-amber-900/20" : "bg-slate-200 dark:bg-slate-800"
                  )}>
                    {reward.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 uppercase">{reward.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-snug">
                    {reward.description}
                  </p>
                </div>

                {isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-emerald-500 text-white size-8 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="material-symbols-outlined text-xl font-black">check</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-amber-200/50 dark:bg-amber-900/10 px-8 py-4 rounded-full border-2 border-amber-200 dark:border-amber-900/20">
                <span className="text-3xl">✨</span>
                <p className="text-amber-900 dark:text-amber-500 font-black uppercase tracking-widest text-lg">¡Sigue jugando para desbloquear más sorpresas!</p>
                <span className="text-3xl">✨</span>
            </div>
        </div>
      </div>
    </div>
  );
}
