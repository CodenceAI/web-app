import { Button } from "@/components/ui/button";
import { Github, Menu, X, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import codencelogo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={codencelogo}
              alt="CodenceAI logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-bold text-lg">CodenceAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm hover:text-primary transition-smooth"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm hover:text-primary transition-smooth"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-sm hover:text-primary transition-smooth"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-sm hover:text-primary transition-smooth"
            >
              Docs
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button variant="hero" size="lg" asChild>
              <a href="/app">
                <Zap className="w-4 h-4" />
                Try CodenceAI Free
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-smooth"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 p-6 space-y-4 animate-fade-in">
            <nav className="space-y-3">
              <a
                href="#features"
                className="block py-2 text-sm hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-sm hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block py-2 text-sm hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="block py-2 text-sm hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </a>
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              <Button variant="ghost" size="sm" className="justify-start">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href="/app">Try CodenceAI</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
