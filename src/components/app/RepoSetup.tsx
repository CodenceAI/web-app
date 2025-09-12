import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Upload, Link, Loader2, Zap, CheckCircle } from "lucide-react";
import { RepoData } from "@/types/app";

interface RepoSetupProps {
  onRepoLoad: (repo: RepoData) => void;
  isLoading: boolean;
}

const RepoSetup = ({ onRepoLoad, isLoading }: RepoSetupProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleRepoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    // Mock repo data - in real app, this would fetch from GitHub API
    const mockRepo: RepoData = {
      id: "1",
      name: repoUrl.split("/").pop() || "repository",
      url: repoUrl,
      description: "A sample repository for demonstration",
      language: "TypeScript",
      stars: 1234,
      forks: 456,
      totalFiles: 89,
      lastUpdated: "2024-01-15",
      files: [
        {
          name: "src",
          path: "src",
          type: "directory",
          children: [
            { name: "components", path: "src/components", type: "directory" },
            { name: "utils", path: "src/utils", type: "directory" },
            { name: "index.ts", path: "src/index.ts", type: "file", size: 1234 }
          ]
        },
        { name: "README.md", path: "README.md", type: "file", size: 2567 },
        { name: "package.json", path: "package.json", type: "file", size: 890 }
      ]
    };

    onRepoLoad(mockRepo);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Handle file drop logic here
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-primary/20 animate-ping" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Processing Repository</h3>
            <p className="text-muted-foreground">
              Analyzing code structure and generating embeddings...
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Repository cloned</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating semantic embeddings</span>
            </div>
            <div className="flex items-center justify-center gap-2 opacity-50">
              <div className="w-4 h-4 rounded-full border-2 border-muted" />
              <span>Building search index</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">GW</span>
            </div>
            <h1 className="text-3xl font-bold">GitWhisper</h1>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Connect Your Repository</h2>
            <p className="text-muted-foreground">
              Start exploring your codebase with AI-powered semantic search
            </p>
          </div>
        </div>

        {/* Setup Options */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Choose Your Method
            </CardTitle>
            <CardDescription>
              Connect a GitHub repository or upload your project files
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="github" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub URL
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="github" className="space-y-4 mt-6">
                <form onSubmit={handleRepoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Repository URL</label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="url"
                        placeholder="https://github.com/username/repository"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" variant="hero" size="lg">
                    <Github className="w-4 h-4" />
                    Analyze Repository
                  </Button>
                </form>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Supports public GitHub repositories</p>
                  <p>• Private repos require authentication</p>
                  <p>• Processing time varies by repository size</p>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4 mt-6">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-border/80"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="font-medium">Drop your project files here</h3>
                    <p className="text-sm text-muted-foreground">
                      Or click to browse and select files
                    </p>
                  </div>
                  
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Supports .zip, .tar.gz archives</p>
                  <p>• Individual files up to 100MB</p>
                  <p>• All data processed locally</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-medium text-sm">Semantic Search</h4>
            <p className="text-xs text-muted-foreground">
              Find code by meaning, not just keywords
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h4 className="font-medium text-sm">AI Explanations</h4>
            <p className="text-xs text-muted-foreground">
              Understand complex code instantly
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Github className="w-4 h-4" />
            </div>
            <h4 className="font-medium text-sm">Repository Insights</h4>
            <p className="text-xs text-muted-foreground">
              Complete codebase overview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoSetup;