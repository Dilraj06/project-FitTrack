export interface Exercise {
  id?: string;
  name: string;
  description?: string;
  muscles?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  mediaUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  creatorId?: string;
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
  visibility?: 'public' | 'private';
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainerProfile {
  id: string;
  userId: string;
  bio?: string;
  specialties?: string[];
  clients?: string[];
  createdAt?: string;
  updatedAt?: string;
}


export interface Client {
  id?: string;
  userId: string;
  name: string;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goals?: string[];
  assignedTrainerId?: string;
  createdAt?: string;
  updatedAt?: string;
}
