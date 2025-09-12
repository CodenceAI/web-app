import { Search, Brain, Shield, Code, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Semantic Code Search",
    description: "Ask questions in natural language like 'Where is the authentication logic?' and get contextually relevant code snippets.",
    highlight: "Vector embeddings",
  },
  {
    icon: Brain,
    title: "Intelligent Explanations",
    description: "Automatically generated explanations in plain English for complex code functionality and architecture patterns.",
    highlight: "AI-powered",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "Fully offline support for private repositories. No sensitive code ever leaves your infrastructure.",
    highlight: "Zero data upload",
  },
  {
    icon: Code,
    title: "Multi-Language Support",
    description: "Works with Python, JavaScript, Go, Rust, and more. Understands syntax and semantics across languages.",
    highlight: "Universal",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant results powered by optimized vector search and efficient caching mechanisms.",
    highlight: "Sub-second",
  },
  {
    icon: Globe,
    title: "Flexible Deployment",
    description: "Public web UI for open-source projects or private deployment for enterprise security requirements.",
    highlight: "Your choice",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Developers <span className="text-primary">Love</span> GitWhisper
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary features that transform how you explore and understand codebases
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-xl gradient-card border border-border/50 hover-lift hover-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Feature Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-smooth">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                  {feature.highlight}
                </span>
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;