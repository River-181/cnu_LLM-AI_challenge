import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Dashboard } from "@/pages/Dashboard";
import { LectureReformatter } from "@/pages/LectureReformatter";
import { EmotionalTranslator } from "@/pages/EmotionalTranslator";
import { CommunicationHelper } from "@/pages/CommunicationHelper";
import { InitialSetup } from "@/pages/InitialSetup";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  const [userPreferences, setUserPreferences] = useState<{
    name: string;
    preferredLanguage: string;
  } | null>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSetupComplete = (preferences: { name: string; preferredLanguage: string }) => {
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        {!userPreferences ? (
          <InitialSetup onSetupComplete={handleSetupComplete} />
        ) : (
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/lecture-reformatter">
              <LectureReformatter userPreferences={userPreferences} />
            </Route>
            <Route path="/emotional-translator">
              <EmotionalTranslator userPreferences={userPreferences} />
            </Route>
            <Route path="/communication-helper">
              <CommunicationHelper userPreferences={userPreferences} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
