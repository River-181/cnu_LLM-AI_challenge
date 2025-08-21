import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}

export function useMockAuth() {
  // Mock user data for development
  const mockUser = {
    id: "mock-user-id",
    email: "ngoctran@example.com",
    firstName: "Ngọc",
    lastName: "Trân",
    profileImageUrl: "",
    profile: {
      preferredName: "Ngọc Trân",
      nationality: "vietnam",
      nativeLanguage: "vi",
      preferredLanguage: "ko",
      koreanLevel: "intermediate",
      topikLevel: "3",
      department: "business",
      year: 2,
      admissionYear: 2023,
      koreaResidenceDuration: 4,
      previousKoreaExperience: false,
      culturalUnderstanding: 3,
      learningGoals: ["korean_improvement", "cultural_adaptation", "social_connections"],
      difficulties: ["language_barrier", "cultural_differences"],
      learningStyle: "visual",
      completedOnboarding: true,
    },
  };

  return {
    user: mockUser,
    isLoading: false,
    isAuthenticated: true,
    error: null,
  };
}
