"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useChildStore } from "@/store/useChildStore";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const AVATARS = [
  { id: "1", char: "🦊", color: "bg-orange-400", name: "Zorro" },
  { id: "2", char: "🦉", color: "bg-blue-400", name: "Búho" },
  { id: "3", char: "🐨", color: "bg-gray-400", name: "Koala" },
  { id: "4", char: "🦄", color: "bg-purple-400", name: "Unicornio" },
];

export default function OnboardingNinos() {
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const profile = useAuthStore((state) => state.profile);
  const setSelectedChild = useChildStore((state) => state.setSelectedChild);
  const router = useRouter();

  const handleFinish = async () => {
    if (!selectedAvatar || !name || !profile) return;
    
    setIsSubmitting(true);
    const avatar = AVATARS.find(a => a.id === selectedAvatar);

    const { data: newChild, error } = await supabase
      .from("children")
      .insert({
        parent_id: profile.id,
        name: name,
        avatar_url: avatar?.char || "👦",
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    // Guardar en estado global y navegar al mapa
    setSelectedChild({
      id: newChild.id,
      name: newChild.name,
      current_level: 1,
      total_xp: 0,
      avatar_url: newChild.avatar_url,
      neurodivergent_mode: false
    });

    router.push("/ninos/mapa");
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-6 font-display overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl"
          >
            <div className="text-8xl mb-6">👋</div>
            <h1 className="text-4xl md:text-6xl font-black text-sky-900 mb-8 leading-tight">
              ¡Hola! ¿Cómo te llamas?
            </h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-md p-6 rounded-3xl border-4 border-sky-300 text-3xl font-bold text-center focus:outline-none focus:border-primary shadow-xl"
              placeholder="Escribe tu nombre aquí..."
              autoFocus
            />
            {name.length > 2 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setStep(2)}
                className="mt-10 bg-primary text-white px-10 py-5 rounded-full text-2xl font-black shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                ¡LISTO! ➔
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center w-full max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-black text-sky-900 mb-10">
              ¡Genial, <span className="text-primary truncate">{name}</span>! <br/> Elige a tu compañero:
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={cn(
                    "p-6 rounded-3xl aspect-square flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 border-8",
                    selectedAvatar === avatar.id 
                      ? "border-primary bg-white shadow-2xl scale-110" 
                      : "border-transparent bg-white/50"
                  )}
                >
                  <span className="text-7xl mb-2">{avatar.char}</span>
                  <span className="font-bold text-sky-900">{avatar.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex gap-4 justify-center">
              <button
                onClick={() => setStep(1)}
                className="bg-sky-200 text-sky-900 px-8 py-4 rounded-full font-bold text-xl"
              >
                Atrás
              </button>
              {selectedAvatar && (
                <button
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  className="bg-primary text-white px-10 py-5 rounded-full text-2xl font-black shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                >
                  {isSubmitting ? "Cargando..." : "¡VAMOS A JUGAR! 🚀"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VUI Mentor Simulation */}
      <div className="fixed bottom-8 right-8 flex items-center gap-4 bg-white/90 p-4 rounded-2xl shadow-xl border-2 border-primary/20">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-primary">record_voice_over</span>
        </div>
        <div className="text-xs font-bold text-sky-900 leading-tight">
            TE ESCUCHO...<br/>DIME TU NOMBRE
        </div>
      </div>
    </div>
  );
}
