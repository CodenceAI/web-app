import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app/AppSidebar";
import RepoSetup from "@/components/app/RepoSetup";
import ChatInterface from "@/components/app/ChatInterface";
import { RepoData } from "@/types/app";

const App = () => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRepoLoad = async (repo: RepoData) => {
    setIsLoading(true);
    // Simulate repo loading/processing
    setTimeout(() => {
      setRepoData(repo);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {!repoData ? (
        <RepoSetup onRepoLoad={handleRepoLoad} isLoading={isLoading} />
      ) : (
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar repoData={repoData} />
            <main className="flex-1">
              <ChatInterface repoData={repoData} />
            </main>
          </div>
        </SidebarProvider>
      )}
    </div>
  );
};

export default App;