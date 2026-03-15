"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useChildStore } from '@/store/useChildStore';
import { supabase } from '@/lib/supabase';

const QUESTIONS = [
  {
    id: 1,
    prompt: "¿Cuál empieza con el sonido MMM?",
    targetSound: "m",
    options: [
      { id: "a", icon: "👕", name: "Camisa", sound: "c" },
      { id: "b", icon: "🪑", name: "Mesa", sound: "m" },
    ],
    correctId: "b"
  }
];

export default function ActividadFonologica() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const { selectedChild, addXP } = useChildStore();
  const question = QUESTIONS[currentStep];

  const handleChoice = async (choiceId: string) => {
    if (choiceId === question.correctId) {
      setFeedback("✅ ¡EXCELENTE!");
      addXP(10);
      
      // Registrar en DB (opcional por ahora para velocidad)
      if (selectedChild) {
        await supabase.from("activity_logs").insert({
          child_id: selectedChild.id,
          activity_type: "fonologica",
          performance_score: 1.0
        });
      }

      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
    } else {
      setFeedback("❌ ¡Inténtalo de nuevo!");
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-emerald-400 flex flex-col items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-9xl mb-8">🏆</motion.div>
        <h1 className="text-6xl font-black mb-4 uppercase">¡LO LOGRASTE!</h1>
        <p className="text-3xl font-bold mb-10">Has ganado +10 monedas de cristal</p>
        <Link href="/ninos/mapa">
          <button className="bg-white text-emerald-500 px-12 py-6 rounded-full text-3xl font-black shadow-2xl hover:scale-110 transition-transform">
            VOLVER AL MAPA
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden min-h-screen">
      <div className="relative flex h-screen w-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link href="/ninos/mapa" className="flex items-center justify-center size-14 bg-white rounded-full shadow-lg border-b-4 border-slate-200 active:translate-y-1 active:border-b-0 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl font-black">close</span>
          </Link>
          
          <div className="flex bg-white px-6 py-2 rounded-full shadow-md border-2 border-primary/10 items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="font-black text-primary">{selectedChild?.total_xp || 0}</span>
          </div>
        </div>

        {/* Interaction */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div className="relative flex flex-col items-center gap-6">
            <div className="bg-white p-4 rounded-full border-4 border-primary shadow-2xl">
                <div className="size-32 md:size-40 rounded-full bg-indigo-100 flex items-center justify-center text-8xl">
                    🦉
                </div>
            </div>
            
            <div className="bg-white px-8 py-4 rounded-3xl shadow-xl border-4 border-sky-200 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-4 border-t-4 border-sky-200 rotate-45"></div>
                <p className="text-2xl font-black text-sky-900 text-center uppercase">{question.prompt}</p>
            </div>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className={cn(
                  "p-4 rounded-2xl font-black text-xl text-white shadow-lg",
                  feedback.includes("✅") ? "bg-emerald-500" : "bg-rose-500"
                )}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-lg grid grid-cols-2 gap-6">
            {question.options.map((opt) => (
              <motion.button
                key={opt.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(opt.id)}
                className="bg-white rounded-3xl p-8 border-b-8 border-slate-200 shadow-xl hover:border-primary active:border-b-0 transition-all"
              >
                <span className="text-8xl">{opt.icon}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
