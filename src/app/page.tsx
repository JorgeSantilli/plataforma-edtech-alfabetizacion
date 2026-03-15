"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface Child {
  id: string;
  name: string;
  avatar_url: string;
}

export default function DashboardDocente() {
  const profile = useAuthStore((state) => state.profile);
  const router = useRouter();
  const [students, setStudents] = useState<Child[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!profile) return;
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', profile.id);
      
      if (data) setStudents(data);
      setLoadingStudents(false);
    };

    fetchStudents();
  }, [profile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">LiteracyFlow</h1>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <span className="material-symbols-outlined text-[14px]">sync</span>
              <span>Sincronizado con Google Classroom • Ahora mismo</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-primary/10 transition-colors relative">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{profile?.full_name || 'Docente'}</p>
              <p className="text-[10px] text-slate-500 font-medium">Primaria • 2º Grado</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500">logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Competencia de la Clase</p>
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <p className="text-3xl font-bold">78.4%</p>
            <p className="text-xs text-green-500 mt-2 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> +4.2% desde la semana pasada
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Práctica Diaria Promedio</p>
              <span className="material-symbols-outlined text-primary">schedule</span>
            </div>
            <p className="text-3xl font-bold">22m</p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">info</span> Consistente con metas curriculares
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Intervenciones Necesarias</p>
              <span className="material-symbols-outlined text-red-400">error</span>
            </div>
            <p className="text-3xl font-bold">04</p>
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">warning</span> Urgente: Alto riesgo de regresión
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Live Classroom & Predictive Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Heatmap Section */}
            <section className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Mapa de Calor de Conciencia Fonológica</h2>
                <div className="flex gap-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">COMPETENCIA:</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-primary/10"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/30"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary border border-primary/20"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 overflow-x-auto">
                <div className="col-span-7 flex justify-between text-[10px] font-bold text-slate-400 mb-1 px-1">
                  <span>Aislamiento de Fonemas</span>
                  <span>Combinación</span>
                  <span>Segmentación</span>
                  <span>Adición</span>
                  <span>Eliminación</span>
                  <span>Sustitución</span>
                  <span>Rima</span>
                </div>
                
                {/* Simulated Data */}
                <div className="contents gap-1 space-y-1">
                  {[
                    [90, 70, 40, 20, 80, 100, 60],
                    [30, 10, 20, 5, 15, 10, 20],
                    [100, 90, 100, 80, 95, 100, 90]
                  ].map((row, i) => (
                    <div key={i} className="contents">
                      {row.map((val, j) => (
                        <div key={j} className="w-full bg-primary rounded-sm h-10 md:h-12" style={{ opacity: val / 100 }}></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Live Classroom List */}
            <section className="bg-white dark:bg-slate-800/50 rounded-xl border border-primary/5 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-primary/5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Estado del Aula en Vivo</h2>
                <button className="text-sm text-primary font-semibold flex items-center gap-1">
                  Ver Todos los Estudiantes <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
              <div className="divide-y divide-primary/5">
                {loadingStudents ? (
                  <p className="text-center py-6 text-slate-400 text-sm">Cargando aula...</p>
                ) : students.length > 0 ? students.map((student, i) => (
                  <div key={student.id} className="p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors">
                    <div className="relative">
                       <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-2xl">
                          {student.avatar_url || '👶'}
                       </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm tracking-tight">{student.name}</h3>
                      <p className="text-[10px] uppercase font-bold text-slate-400">ISLA DE LOS SONIDOS • NIVEL 1</p>
                    </div>
                    <div className="w-24 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: '0%' }}></div>
                    </div>
                    <button className="text-[10px] font-black text-primary hover:underline">VER DETALLES</button>
                  </div>
                )) : (
                  <div className="p-8 text-center text-slate-400">
                    <p className="text-sm mb-4">No hay alumnos conectados.</p>
                    <button 
                      onClick={() => router.push('/ninos/onboarding')}
                      className="text-xs font-bold text-primary px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all"
                    >
                      + AGREGAR ALUMNO
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Predictive Alerts & AI Assistant */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-red-200 dark:border-red-900/30 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <span className="material-symbols-outlined">analytics</span>
                <h2 className="font-bold">Intervención Necesaria</h2>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-red-700 dark:text-red-400">Leo Miller</p>
                    <span className="text-[10px] bg-red-100 dark:bg-red-900 text-red-600 px-1.5 py-0.5 rounded">Urgente</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Regresión predicha en habilidades de rima. Caída del 15% en precisión durante 3 sesiones.
                  </p>
                  <button className="mt-2 text-[10px] font-bold text-primary uppercase tracking-tight flex items-center gap-1">
                    Iniciar Plan de Intervención <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </button>
                </div>

                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-orange-400">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-orange-700 dark:text-orange-400">Elena Rossi</p>
                    <span className="text-[10px] bg-orange-100 dark:bg-orange-900 text-orange-600 px-1.5 py-0.5 rounded">Moderado</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Estancamiento en Combinación nivel 2. Se sugiere actividad táctil 1:1.
                  </p>
                  <button className="mt-2 text-[10px] font-bold text-primary uppercase tracking-tight flex items-center gap-1">
                    Agregar a Grupo Pequeño <span className="material-symbols-outlined text-[12px]">add</span>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-primary to-blue-600 p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <h2 className="font-bold">Asistente IA</h2>
                </div>
                <p className="text-sm opacity-90 mb-6">
                  "Basado en los datos de Leo y Elena, puedo generar un plan de conciencia fonológica de 15 minutos para la sesión de grupo pequeño de mañana."
                </p>
                <button className="w-full bg-white text-primary py-3 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
                  Generar Plan de Lección
                </button>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-white/20 py-2 rounded-lg text-xs font-medium hover:bg-white/30">Hacer una Pregunta</button>
                  <button className="flex-1 bg-white/20 py-2 rounded-lg text-xs font-medium hover:bg-white/30">Resumen Rápido</button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            </section>
          </div>
        </div>
      </main>

      {/* Floating AI Bubble for quick chat */}
      <button className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-background-light">1</span>
      </button>
    </div>
  );
}
