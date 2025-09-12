import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const problems = [
  {
    title: "Keyword-Only Search",
    description: "Traditional code search relies on exact keyword matching, missing contextually relevant code.",
  },
  {
    title: "Outdated Documentation",
    description: "Documentation is often incomplete or outdated, forcing manual code exploration.",
  },
  {
    title: "Privacy Concerns",
    description: "Sensitive private repositories can't be sent to cloud services for analysis.",
  },
  {
    title: "Slow Onboarding",
    description: "New contributors struggle to understand large codebases and architectural decisions.",
  },
];

const solutions = [
  {
    title: "Semantic Understanding",
    description: "Vector embeddings capture code meaning and context, not just syntax.",
  },
  {
    title: "AI-Generated Explanations",
    description: "Real-time explanations generated directly from your actual codebase.",
  },
  {
    title: "Local Deployment",
    description: "Run GitWhisper entirely on your infrastructure with zero external dependencies.",
  },
  {
    title: "Instant Code Navigation",
    description: "Natural language queries help developers find and understand code immediately.",
  },
];

const ProblemSolution = () => {
  return (
    <section className="py-24 px-6 bg-card/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            From <span className="text-destructive">Problem</span> to{" "}
            <span className="text-primary">Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GitWhisper solves the core challenges that slow down developers every day
          </p>
        </div>

        {/* Problem-Solution Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-destructive flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Current Problems
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div
                  key={problem.title}
                  className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 hover:border-destructive/30 transition-smooth"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="font-semibold text-destructive mb-2">{problem.title}</h4>
                  <p className="text-muted-foreground text-sm">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Connector */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="p-4 rounded-full bg-primary/10 animate-float">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              GitWhisper Solutions
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div
                  key={solution.title}
                  className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/30 hover-glow transition-smooth"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <h4 className="font-semibold text-primary mb-2">{solution.title}</h4>
                  <p className="text-muted-foreground text-sm">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Arrow */}
        <div className="flex lg:hidden justify-center py-8">
          <div className="p-3 rounded-full bg-primary/10 animate-float">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;