"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles, Shield } from "lucide-react";

export function JoinDaoCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Changed to once: true for performance
  
  // Simulated wallet connection state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Governance",
      description: "Participate in decision-making and shape the future of decentralized education",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Exclusive Access",
      description: "Get early access to educational resources and research findings",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Voting Rights",
      description: "Vote on proposals and help allocate funding to innovative projects",
    },
  ];

  // Simulated wallet connection
  const handleJoin = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1000); // Simulated delay
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0" />

      {/* Background image with fallback */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('/images/decentralized-bg.jpg')`, // Local fallback image
          }}
          aria-hidden="true"
        />
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">
                {isConnected
                  ? "Welcome to DeSci Learning DAO"
                  : "Join the DeSci Learning DAO Today"}
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-md">
                {isConnected
                  ? "You're now part of a revolutionary community!"
                  : "Become part of a community that's revolutionizing education and research through decentralized governance"}
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {isConnected ? (
                <Button
                  size="lg"
                  variant="secondary"
                  className="group"
                  asChild
                  aria-label="Go to Dashboard"
                >
                  <a href="/dashboard">
                    Go to Dashboard
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="secondary"
                  className="group"
                  onClick={handleJoin}
                  disabled={isConnecting}
                  aria-label={isConnecting ? "Connecting to wallet" : "Join the DAO"}
                >
                  {isConnecting ? "Connecting..." : "Join Now"}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300"
                asChild
                aria-label="Learn more about DeSci Learning DAO"
              >
                <a href="/about">Learn More</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-start gap-4 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transition: { duration: 0.2 },
                }}
                tabIndex={0} // Make focusable
                aria-label={`${feature.title}: ${feature.description}`}
              >
                <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}