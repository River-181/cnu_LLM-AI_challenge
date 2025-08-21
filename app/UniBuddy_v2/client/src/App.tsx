import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NavigationHeader from "@/components/NavigationHeader";
import MobileNavigation from "@/components/MobileNavigation";
import FloatingChatButton from "@/components/FloatingChatButton";
import EmotionalSupportModal from "@/components/EmotionalSupportModal";

import Dashboard from "@/pages/Dashboard";
import OnboardingForm from "@/pages/OnboardingForm";
import LectureAnalyzer from "@/pages/LectureAnalyzer";
import EmotionalTranslator from "@/pages/EmotionalTranslator";
import CommunicationHelper from "@/pages/CommunicationHelper";
import StudentLifeInfo from "@/components/StudentLifeInfo";
import Community from "@/pages/Community";
import NotFound from "@/pages/not-found";

import { useMockAuth } from "@/hooks/useAuth";
import { queryClient } from "./lib/queryClient";
import { useState } from "react";

function Router() {
  const { user, isLoading, isAuthenticated } = useMockAuth();
  const [isEmotionalModalOpen, setIsEmotionalModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.profile?.completedOnboarding) {
    return (
      <Switch>
        <Route path="/" component={OnboardingForm} />
        <Route component={OnboardingForm} />
      </Switch>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      
      <main className="pb-16 md:pb-0">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/lecture-analyzer" component={LectureAnalyzer} />
          <Route path="/emotional-translator" component={EmotionalTranslator} />
          <Route path="/communication-helper" component={CommunicationHelper} />
          <Route path="/student-life-info" component={StudentLifeInfo} />
          <Route path="/community" component={Community} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <MobileNavigation />
      <FloatingChatButton onClick={() => setIsEmotionalModalOpen(true)} />
      
      <EmotionalSupportModal
        isOpen={isEmotionalModalOpen}
        onClose={() => setIsEmotionalModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
