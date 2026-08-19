export type Difficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type PracticeStatus =
  | "Pending"
  | "Completed";


export interface Practice {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  status: PracticeStatus;
}


export interface CreatePracticeInput {
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  status: PracticeStatus;
}