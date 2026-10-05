export interface UserProfile {
  name: string;
  email: string;
  avatarLetter: string;
  role?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number | string;
  badgeColor?: string;
  isActive?: boolean;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface AttendanceStatus {
  checkInTime: string | null;
  checkOutTime: string | null;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  dateStr: string;
}

export interface DailyTaskStats {
  completedCount: number;
  totalCount: number;
  percentage: number;
  dateStr: string;
}

export interface DashboardData {
  user: UserProfile;
  lastUpdated: string;
  currentDateFormatted: string;
  attendance: AttendanceStatus;
  dailyStats: DailyTaskStats;
}
