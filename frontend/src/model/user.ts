export class Users {
  id!: number;
  password!: string;
  last_login!: string | null;
  is_superuser!: boolean;
  username!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  is_staff!: boolean;
  is_active!: boolean;
  date_joined!: string;
  groups!: number[];
  user_permissions!: number[];
}
