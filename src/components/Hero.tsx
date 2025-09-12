import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Zap, Shield, Search } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-glow-pulse animation-delay-1000" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-sm font-medium animate-fade-in">
              <Zap className="w-4 h-4 text-primary" />
              <span>AI-Powered Git Repository Assistant</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-glow">CodenceAI</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Revolutionary AI assistant that helps developers explore,
                understand, and debug
                <span className="text-primary font-semibold">
                  {" "}
                  Git repositories
                </span>{" "}
                with semantic code search and intelligent explanations
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 py-4 animate-fade-in">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                <Search className="w-4 h-4" />
                Semantic Search
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                <Shield className="w-4 h-4" />
                Privacy-First
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                <Github className="w-4 h-4" />
                Repository Analysis
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6 animate-slide-up">
              <Button variant="hero" size="xl" className="min-w-48" asChild>
                <a href="/app">
                  Try CodenceAI
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="glass" size="xl" className="min-w-48">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 text-sm text-muted-foreground animate-fade-in">
              <p>Trusted by developers • Open source • Privacy-focused</p>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-glow">
              <img
                src={heroIllustration}
                alt="CodenceAI AI interface showing semantic code search and intelligent explanations"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-4 -right-4 p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 shadow-elegant animate-float">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                <span className="text-muted-foreground">AI Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-float animation-delay-500" />
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float animation-delay-1000" />
    </section>
  );
};

export default Hero;
