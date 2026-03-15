-- Tipo de rol de usuario (Docente o Padre)
CREATE TYPE user_role AS ENUM ('padre', 'docente', 'admin');

-- Tabla de Usuarios Principales (Padres o Docentes)
-- Se enlaza con auth.users de Supabase
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'padre',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de Perfiles de Niños (Subcuentas que dependen de un Padre/Docente)
CREATE TABLE IF NOT EXISTS public.children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  pin_code TEXT, -- PIN Opcional para niños
  birth_date DATE,
  neurodivergent_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de Progreso Global del Niño
CREATE TABLE IF NOT EXISTS public.child_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_level INTEGER NOT NULL DEFAULT 1,
  total_xp INTEGER NOT NULL DEFAULT 0,
  vocabulary_score INTEGER NOT NULL DEFAULT 0,
  phonics_score INTEGER NOT NULL DEFAULT 0,
  comprehension_score INTEGER NOT NULL DEFAULT 0,
  fluency_score INTEGER NOT NULL DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de Registro de Actividades Diarias (para gráficos)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL, -- 'phonics', 'vocabulary', 'book_read', etc.
  duration_seconds INTEGER NOT NULL,
  score INTEGER, -- Opcional, calificación o precisión de la actividad
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de Logro/Recompensas Desbloqueadas
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  reward_id TEXT NOT NULL, -- ID estático en el frontend (ej. 'estrella_dorada')
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(child_id, reward_id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Políticas Básicas de Seguridad (RLS)

-- Users: Sólo el dueño puede ver su registro
CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- Children: Los padres/docentes pueden ver y editar sus propios niños
CREATE POLICY "Parents can view their children" 
ON public.children FOR SELECT 
USING (parent_id = auth.uid());

CREATE POLICY "Parents can insert children" 
ON public.children FOR INSERT 
WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can update their children" 
ON public.children FOR UPDATE 
USING (parent_id = auth.uid());

CREATE POLICY "Parents can delete their children" 
ON public.children FOR DELETE 
USING (parent_id = auth.uid());

-- Child Progress: Visto/Editado por el padre
CREATE POLICY "Parents can view their children progress" 
ON public.child_progress FOR SELECT 
USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can update their children progress" 
ON public.child_progress FOR ALL 
USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Activity Logs
CREATE POLICY "Parents can view their children logs" 
ON public.activity_logs FOR SELECT 
USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can insert logs for their children" 
ON public.activity_logs FOR INSERT 
WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Rewards
CREATE POLICY "Parents can view their children rewards" 
ON public.rewards FOR SELECT 
USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can insert rewards" 
ON public.rewards FOR INSERT 
WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Triggers para Update_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_children_modtime
    BEFORE UPDATE ON public.children
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
    
CREATE TRIGGER update_child_progress_modtime
    BEFORE UPDATE ON public.child_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
