export class Task {
  id?: number;
  name!: string;
  description!: string;
  planned_hours!: number;
  status!: 1 | 2 | 3;
  owner!: number;
}
