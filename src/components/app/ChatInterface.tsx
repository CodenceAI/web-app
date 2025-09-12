import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  User,
  Bot,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Code,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";
import { RepoData, ChatMessage, CodeResult } from "@/types/app";
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  repoData: RepoData;
}

const ProcessingAnimation = () => (
  <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
    <div className="relative">
      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center animate-pulse">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-ping" />
    </div>

    <div className="space-y-2 flex-1">
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        <span className="text-sm font-medium">CodenceAI is thinking...</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Analyzing codebase and generating semantic matches
      </div>
    </div>
  </div>
);

const CodeBlock = ({ result }: { result: CodeResult }) => {
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(result.code);
    toast({
      title: "Code copied!",
      description: "Code snippet copied to clipboard",
    });
  };

  return (
    <Card className="gradient-card border-border/50 hover-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Code className="w-4 h-4 text-primary" />
            <span className="truncate">{result.fileName}</span>
          </CardTitle>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {result.language}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {result.relevanceScore}% match
            </Badge>
            <Button variant="ghost" size="sm" onClick={copyCode}>
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {result.filePath} • Lines {result.startLine}-{result.endLine}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Code Snippet */}
        <div className="relative">
          <pre className="bg-secondary/50 rounded-lg p-4 text-sm font-mono overflow-x-auto border">
            <code>{result.code}</code>
          </pre>
        </div>

        {/* AI Explanation */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Explanation
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "gradient-primary text-primary-foreground"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 space-y-3 ${
          isUser ? "max-w-md ml-auto" : "max-w-4xl"
        }`}
      >
        {/* Text Message */}
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-card/50 border border-border/50"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>

        {/* Loading State */}
        {message.isLoading && <ProcessingAnimation />}

        {/* Code Results */}
        {message.codeResults && message.codeResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>
                Found {message.codeResults.length} relevant code snippets
              </span>
            </div>

            {message.codeResults.map((result) => (
              <CodeBlock key={result.id} result={result} />
            ))}

            {!isUser && (
              <div className="flex items-center gap-2 pt-2">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                  Copy All
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatInterface = ({ repoData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hello! I'm CodenceAI, your AI assistant for exploring ${repoData.name}. I can help you understand the codebase, find specific functionality, and explain complex logic. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const mockResults: CodeResult[] = [
        {
          id: "1",
          filePath: "src/auth/middleware.ts",
          fileName: "middleware.ts",
          language: "TypeScript",
          code: `export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};`,
          explanation:
            "This middleware function handles JWT authentication by extracting the token from the Authorization header, verifying it against the JWT secret, and either allowing the request to proceed or returning an unauthorized response.",
          relevanceScore: 95,
          startLine: 15,
          endLine: 28,
        },
        {
          id: "2",
          filePath: "src/auth/routes.ts",
          fileName: "routes.ts",
          language: "TypeScript",
          code: `router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ token, user: { id: user.id, email: user.email } });
});`,
          explanation:
            "This login endpoint validates user credentials by comparing the provided password with the stored hash using bcrypt, then generates and returns a JWT token for successful authentication.",
          relevanceScore: 88,
          startLine: 42,
          endLine: 52,
        },
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content:
          "I found the authentication logic in your codebase! Here are the key components that handle user authentication:",
        timestamp: new Date(),
        codeResults: mockResults,
      };

      setMessages((prev) => prev.slice(0, -1).concat(aiResponse));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/20 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Chat with CodenceAI</h1>
            <p className="text-sm text-muted-foreground">
              Ask questions about {repoData.name} • {repoData.totalFiles} files
              indexed
            </p>
          </div>

          <Tabs defaultValue="chat" className="w-auto">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="border-t border-border/50 bg-card/20 p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the codebase... (e.g., 'Where is the authentication logic?')"
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              variant="hero"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setInputValue("Where is the authentication logic implemented?")
              }
              disabled={isLoading}
            >
              Authentication
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setInputValue("How does the API rate limiting work?")
              }
              disabled={isLoading}
            >
              Rate Limiting
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Show me the database schema")}
              disabled={isLoading}
            >
              Database
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setInputValue("How do I set up the development environment?")
              }
              disabled={isLoading}
            >
              Setup Guide
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
