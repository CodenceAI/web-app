import { Github, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/20 border-t border-border/50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  CA
                </span>
              </div>
              <span className="text-xl font-bold">CodenceAI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered assistant that revolutionizes how developers explore
              and understand Git repositories.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground hover:text-primary transition-smooth"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground hover:text-primary transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground hover:text-primary transition-smooth"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Self-Hosting
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 CodenceAI. Made with</span>
            <Heart className="w-4 h-4 text-primary" />
            <span>for developers.</span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-smooth">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
