import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Connect Globally",
      description: "Build meaningful connections with people from around the world",
    },
    {
      icon: Heart,
      title: "Express Yourself",
      description: "Share your thoughts, photos, and moments with your community",
    },
    {
      icon: MessageCircle,
      title: "Real Conversations",
      description: "Engage in authentic discussions that matter to you",
    },
    {
      icon: Share2,
      title: "Spread Ideas",
      description: "Amplify voices and share content that inspires you",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-1 to-background" />
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">Ronin</div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button className="glow-sm hover:glow-md transition-all" onClick={() => navigate("/auth")}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div 
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full glass border border-primary/30 glow-sm">
              <span className="text-sm text-primary font-medium">Join the Movement</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Connect</span>
              <br />
              Without Limits
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to Ronin - where authentic connections flourish. Share your story, 
              discover new perspectives, and build a community that matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 glow-md hover:glow-lg transition-all group"
                onClick={() => navigate("/auth")}
              >
                Join Ronin
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>

          {/* 3D Hero Mockup */}
          <div 
            className="relative mt-20 max-w-5xl mx-auto"
            style={{
              transform: `perspective(2000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="glass-strong rounded-3xl p-8 glow-lg border-2 border-primary/30 transform-3d">
              <div className="aspect-video bg-gradient-to-br from-surface-2 to-surface-3 rounded-2xl flex items-center justify-center">
                <Users className="h-24 w-24 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Ronin</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A social platform designed for genuine human connection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group relative p-6 glass-strong border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:glow-sm transition-all">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-strong rounded-3xl p-12 md:p-20 text-center border-2 border-primary/30 glow-lg relative overflow-hidden">
            <div className="absolute inset-0 gradient-radial opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="gradient-text">Connect?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands already building meaningful connections on Ronin
              </p>
              
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 glow-md hover:glow-lg transition-all group"
                onClick={() => navigate("/auth")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold gradient-text">Ronin</div>
            <p className="text-sm text-muted-foreground">
              © 2025 Ronin. Connect authentically.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;