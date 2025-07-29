export interface UserRegistryStats {
  user_id: number;
  user_name: string;
  user_email: string;
  count: number;
}

export interface DashboardStats {
  total_registries: number;
  total_users: number;
  registries_by_user: UserRegistryStats[];
  registries_this_month: number;
  registries_this_year: number;
}
