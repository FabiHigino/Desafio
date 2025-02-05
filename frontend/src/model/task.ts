export interface Task {
  id: number;
  name: string;
  description: string;
  planned_hours: number;
  status: 1 | 2 | 3; // 1: A fazer, 2: Em andamento, 3: Concluído
  owner: number; // ID do usuário dono da tarefa
  comments: Comment[];
  worked_hours: WorkedHour[];
}

export interface Comment {
  id?: number; // O id pode ser opcional ao criar um comentário
  text: string;
  task: number; // ID da tarefa
  user: number; // ID do usuário que comentou
}


export interface WorkedHour {
  id?: number;  // O id pode ser opcional ao adicionar horas
  hours: number;
  date: string; // Formato ISO 8601 (YYYY-MM-DD)
  task: number; // ID da tarefa
  user: number; // ID do usuário que trabalhou nas horas
}
