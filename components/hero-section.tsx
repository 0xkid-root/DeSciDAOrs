"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { AtomIcon, Sparkles, Brain, FlaskRound as Flask, Microscope } from "lucide-react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [subtitleRef, subtitleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [buttonsRef, buttonsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [iconsRef, iconsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      connections: number[];
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20)); // Scale with screen size
    const connectionDistance = 150;
    const colors = [
      "rgba(64, 196, 255, 0.7)",
      "rgba(120, 120, 255, 0.7)",
      "rgba(180, 64, 255, 0.7)",
      "rgba(255, 64, 180, 0.7)",
      "rgba(255, 120, 64, 0.7)",
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      });
    }

    const findConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].connections = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
              particles[i].connections.push(j);
            }
          }
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (const j of particles[i].connections) {
          const opacity =
            1 -
            Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2)) /
              connectionDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          particle.vx += (dx / distance) * 0.05;
          particle.vy += (dy / distance) * 0.05;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;

        // Limit speed
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 2) {
          particle.vx = (particle.vx / speed) * 2;
          particle.vy = (particle.vy / speed) * 2;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      findConnections();
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    setTimeout(() => setAnimationComplete(true), 1000);

    // Hide scroll indicator on scroll
    const unsubscribeScroll = scrollY.on("change", (latest) => {
      setShowScrollIndicator(latest < 50);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId); // Clean up animation
      unsubscribeScroll();
    };
  }, [scrollY]);

  const floatingIcons = [
    { icon: <AtomIcon className="h-8 w-8" />, delay: 0, x: -20, y: -30 },
    { icon: <Sparkles className="h-6 w-6" />, delay: 0.1, x: 30, y: -20 },
    { icon: <Brain className="h-7 w-7" />, delay: 0.2, x: -30, y: 20 },
    { icon: <Flask className="h-6 w-6" />, delay: 0.3, x: 20, y: 30 },
    { icon: <Microscope className="h-8 w-8" />, delay: 0.4, x: 0, y: -40 },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

      <motion.div className="container relative z-10 px-4 md:px-6" style={{ y, opacity }}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            ref={iconsRef}
            className="relative h-40 mb-8"
            initial="hidden"
            animate={iconsInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 text-primary/80"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  x: item.x,
                  y: item.y,
                  transition: { delay: item.delay, duration: 0.5 },
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                aria-hidden="true"
              >
                {item.icon}
              </motion.div>
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: 180,
                height: 180,
                opacity: 0.6,
                transition: { duration: 1, ease: "easeOut" },
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { delay: 0.3, duration: 0.5 },
              }}
              aria-hidden="true"
            >
              <AtomIcon className="h-16 w-16" />
            </motion.div>
          </motion.div>

          <motion.h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to DeSci Learning DAO
          </motion.h1>

          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Join the future of decentralized education and research
          </motion.p>

          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={buttonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <Button asChild size="lg" className="relative overflow-hidden group">
              <Link href="/proposals" aria-label="Explore Proposals">
                <span className="relative z-10">Explore Proposals</span>
                <span className="absolute inset-0 bg-primary-foreground/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden group"
              asChild
            >
              <Link href="/join" aria-label="Join the DAO">
                <span className="relative z-10">Join the DAO</span>
                <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {animationComplete && showScrollIndicator && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 bg-primary/50 rounded-full mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Scroll to explore</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}