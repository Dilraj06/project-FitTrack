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



export interface TrainerProfile {
  id: string; 
  bio?: string;
  specialties?: string[];
  clients?: string[]; 
  createdAt?: string;
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
}
