export interface RecentEnrollment {
  name: string;
  location: string;
  timeAgo: string; // e.g., "2 hours ago", "1 day ago"
}

export const enrollmentCount = 127; // Total enrolled students

export const recentEnrollments: RecentEnrollment[] = [
  { name: "Priya", location: "Bangalore", timeAgo: "2 hours ago" },
  { name: "Rajesh", location: "Mumbai", timeAgo: "5 hours ago" },
  { name: "Anita", location: "Delhi", timeAgo: "1 day ago" },
  { name: "Vikram", location: "Hyderabad", timeAgo: "1 day ago" },
  { name: "Meera", location: "Chennai", timeAgo: "2 days ago" },
  { name: "Arjun", location: "Pune", timeAgo: "2 days ago" },
  { name: "Sneha", location: "Kolkata", timeAgo: "3 days ago" },
];

/**
 * Get a random recent enrollment for ticker display
 */
export function getRandomRecentEnrollment(): RecentEnrollment {
  const randomIndex = Math.floor(Math.random() * recentEnrollments.length);
  return recentEnrollments[randomIndex];
}
