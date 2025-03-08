"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Vote, Coins, FileCheck } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Submit a Proposal",
    description: "Students and educators can submit educational experiment proposals for consideration by the DAO.",
  },
  {
    icon: <Vote className="h-10 w-10 text-primary" />,
    title: "Community Voting",
    description: "DAO members vote on proposals using their governance tokens, ensuring decentralized decision-making.",
  },
  {
    icon: <Coins className="h-10 w-10 text-primary" />,
    title: "Receive Funding",
    description: "Approved proposals receive funding from the DAO treasury to conduct their educational experiments.",
  },
  {
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    title: "Share Results",
    description: "After completion, results are published on the platform for the benefit of the entire community.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Changed to once: true for performance

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden bg-background">
      {/* Background pattern with better opacity control */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5 pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 relative">
            How It Works
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "30%" } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Our decentralized approach to funding educational experiments and research
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col">
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                className="relative z-10"
              >
                <Card
                  className="h-full border-2 hover:border-primary/50 transition-all duration-300 bg-card/95 backdrop-blur-sm"
                  tabIndex={0} // Make card focusable
                  aria-label={`${step.title}: ${step.description}`}
                >
                  <CardHeader className="pb-2">
                    <motion.div
                      className="mb-4 relative"
                      whileHover={{
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {step.icon}
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring" }}
                      >
                        {index + 1}
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-lg md:text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Connecting lines - Responsive and fixed positioning */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-1/2 right-0 translate-x-1/2 lg:right-auto lg:left-full lg:-translate-x-1/2 w-6 h-0.5 bg-primary/30 z-0 hidden sm:block"
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  style={{
                    width: "calc(100% - 75%)", // Adjust based on gap
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}