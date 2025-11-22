export interface Exercise {
  id?: string;
  name: string;
  description?: string;
  muscles?: string[]; 
  difficulty?: 'easy'|'medium'|'hard';
  mediaUrl?: string;
  createdAt?: string;
}

export interface WorkoutExerciseItem {
  exerciseId: string;
  order?: number;
  reps?: number;
  sets?: number;
  restSeconds?: number;
}

export interface Workout {
  id?: string;
  title: string;
  description?: string;
  creatorId: string;
  exercises: WorkoutExerciseItem[];
  visibility?: 'public'|'private';
  createdAt?: string;
}

export interface ProgressLogItemSet {
  reps?: number;
  weight?: number;
  durationSeconds?: number;
}

export interface ProgressLogItem {
  exerciseId: string;
  sets: ProgressLogItemSet[];
}

export interface ProgressLog {
  id?: string;
  userId: string;
  workoutId?: string;
  date: string; 
  items: ProgressLogItem[];
  notes?: string;
  totalDurationSeconds?: number;
  createdAt?: string;
}

export interface TrainerProfile {
  id: string; 
  bio?: string;
  specialties?: string[];
  clients?: string[]; 
  createdAt?: string;
}
