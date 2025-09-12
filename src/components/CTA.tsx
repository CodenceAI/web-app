import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Download, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative p-12 rounded-2xl gradient-card border border-border/50 text-center space-y-8 hover-glow">
          {/* Background Effects */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl animate-glow-pulse" />
          
          <div className="relative space-y-6">
            {/* CTA Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Ready to revolutionize your development workflow?
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Start Using <span className="text-glow">GitWhisper</span> Today
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who have transformed their code exploration experience with AI-powered insights
              </p>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="xl" className="min-w-56" asChild>
              <a href="/app">
                <Zap className="w-5 h-5" />
                Try GitWhisper Free
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
              
              <Button variant="glass" size="xl" className="min-w-56">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Or deploy privately:</p>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4" />
                Download for Self-Hosting
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Open Source
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Privacy-First
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Enterprise Ready
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              No Vendor Lock-in
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Free for open-source projects • Flexible licensing for enterprises
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;