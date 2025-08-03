import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { ExtrudeGeometry, Shape } from "three";
import * as THREE from "three";
import { wrap } from "@motionone/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import * as z from "zod";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiAmazon,
  SiNextdotjs,
  SiPython,
  SiPostgresql,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiKubernetes,
  SiRedis,
  SiTurborepo,
  SiPostman,
  SiC,
  SiExpress,
} from "react-icons/si";
import photo from "/arihant_photo.jpg";
import PDF from "/Arihant_Chougule_Resume.pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle,
  Clock,
  Circle,
  ArrowRight,
  Send,
} from "lucide-react";
import { Navbar1 } from "@/components/ui/navbar-1";
import sendEmail from "../lib/service";

// Utility function
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Direction Aware Hover Component
const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  const variants = {
    initial: { x: 0 },
    exit: { x: 0, y: 0 },
    top: { y: 20 },
    bottom: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  const textVariants = {
    initial: { y: 0, x: 0, opacity: 0 },
    exit: { y: 0, x: 0, opacity: 0 },
    top: { y: -20, opacity: 1 },
    bottom: { y: 2, opacity: 1 },
    left: { x: -2, opacity: 1 },
    right: { x: 20, opacity: 1 },
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative",
        className
      )}
    >
      <motion.div
        className="relative h-full w-full"
        initial="initial"
        whileHover={direction}
        exit="exit"
      >
        <motion.div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
        <motion.div
          variants={variants}
          className="h-full w-full relative bg-gray-50 dark:bg-black"
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <img
            alt="image"
            className={cn(
              "h-full w-full object-cover scale-[1.15]",
              imageClassName
            )}
            width="1000"
            height="1000"
            src={imageUrl}
          />
        </motion.div>
        <motion.div
          variants={textVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "text-white absolute bottom-4 left-4 z-40",
            childrenClassName
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Marquee Animation Component
function MarqueeAnimation({
  children,
  className,
  direction = "left",
  baseVelocity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  baseVelocity: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 0], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (direction === "left") {
      directionFactor.current = 1;
    } else if (direction === "right") {
      directionFactor.current = -1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden max-w-[100vw] text-nowrap flex-nowrap flex relative">
      <motion.div
        className={cn(
          "font-bold uppercase text-5xl flex flex-nowrap text-nowrap *:block *:me-10",
          className
        )}
        style={{ x }}
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

// 3D Box Component for Hero
interface BoxProps {
  position: [number, number, number];
  width?: number;
  length?: number;
  cornerRadius?: number;
  gridPosition: [number, number];
  hoveredBox: [number, number] | null;
  rippleScale?: number;
  rippleRadius?: number;
}

const Box = ({
  position,
  width = 4,
  length = 4,
  cornerRadius = 2,
  gridPosition,
  hoveredBox,
  rippleScale = 0.3,
  rippleRadius = 3,
}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentScale, setCurrentScale] = useState(1);

  const geometry = useMemo(() => {
    const shape = new Shape();
    const angleStep = Math.PI * 0.5;
    const radius = cornerRadius;

    const halfWidth = width / 2;
    const halfLength = length / 2;

    shape.absarc(
      halfWidth - radius,
      halfLength - radius,
      radius,
      angleStep * 0,
      angleStep * 1
    );
    shape.absarc(
      -halfWidth + radius,
      halfLength - radius,
      radius,
      angleStep * 1,
      angleStep * 2
    );
    shape.absarc(
      -halfWidth + radius,
      -halfLength + radius,
      radius,
      angleStep * 2,
      angleStep * 3
    );
    shape.absarc(
      halfWidth - radius,
      -halfLength + radius,
      radius,
      angleStep * 3,
      angleStep * 4
    );

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    return geometry;
  }, [width, length, cornerRadius]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(() => {
    if (meshRef.current) {
      let targetScale = 1;

      const isThisBoxHovered =
        hoveredBox &&
        gridPosition[0] === hoveredBox[0] &&
        gridPosition[1] === hoveredBox[1];

      if (isThisBoxHovered) {
        targetScale = 5;
      } else if (hoveredBox) {
        const dx = gridPosition[0] - hoveredBox[0];
        const dz = gridPosition[1] - hoveredBox[1];
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance <= rippleRadius && distance > 0) {
          const falloff = Math.max(0, 1 - distance / rippleRadius);
          const rippleEffect = falloff * rippleScale;
          targetScale = 1 + rippleEffect * 3;
        }
      }

      const lerpFactor = 0.1;
      const newScale = currentScale + (targetScale - currentScale) * lerpFactor;
      setCurrentScale(newScale);

      meshRef.current.scale.z = newScale;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.gridPosition = gridPosition;
    }
  }, [gridPosition]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshPhysicalMaterial
        color="#232323"
        roughness={0.5}
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
};

function HoverDetector({
  onHoverChange,
}: {
  gridSize: number;
  spacingX: number;
  spacingZ: number;
  onHoverChange: (hoveredBox: [number, number] | null) => void;
}) {
  const { camera, raycaster, pointer, scene } = useThree();

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      for (const intersect of intersects) {
        const mesh = intersect.object;
        if (mesh.userData && mesh.userData.gridPosition) {
          const gridPos = mesh.userData.gridPosition as [number, number];
          onHoverChange(gridPos);
          return;
        }
      }
    }

    onHoverChange(null);
  });

  return null;
}

function GridOfBoxes() {
  const gridSize = 10;
  const boxWidth = 4;
  const boxLength = 4;
  const gap = 0.05;
  const spacingX = boxWidth + gap;
  const spacingZ = boxLength + gap;

  const [hoveredBox, setHoveredBox] = useState<[number, number] | null>(null);
  const rippleScale = 2.5;
  const rippleRadius = 2;

  const boxes = [];

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const posX = (x - (gridSize - 1) / 2) * spacingX;
      const posZ = (z - (gridSize - 1) / 2) * spacingZ;

      boxes.push(
        <Box
          key={`${x}-${z}`}
          position={[posX, -0.85, posZ]}
          width={boxWidth}
          length={boxLength}
          cornerRadius={0.8}
          gridPosition={[x, z]}
          hoveredBox={hoveredBox}
          rippleScale={rippleScale}
          rippleRadius={rippleRadius}
        />
      );
    }
  }

  return (
    <>
      <HoverDetector
        gridSize={gridSize}
        spacingX={spacingX}
        spacingZ={spacingZ}
        onHoverChange={setHoveredBox}
      />
      {boxes}
    </>
  );
}

// Timeline Component
interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
  status?: "completed" | "current" | "upcoming";
  category?: string;
}

const getStatusConfig = (status: TimelineItem["status"]) => {
  const configs = {
    completed: {
      progressColor: "bg-primary",
      borderColor: "border-primary/20",
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
    },
    current: {
      progressColor: "bg-secondary",
      borderColor: "border-secondary/20",
      badgeBg: "bg-secondary/10",
      badgeText: "text-secondary",
    },
    upcoming: {
      progressColor: "bg-muted-foreground",
      borderColor: "border-muted-foreground/20",
      badgeBg: "bg-muted-foreground/10",
      badgeText: "text-muted-foreground",
    },
  };

  return configs[status || "upcoming"];
};

const getStatusIcon = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "current":
      return Clock;
    default:
      return Circle;
  }
};

function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-center text-muted-foreground">
          No timeline items to display
        </p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

        <motion.div
          className="absolute left-4 sm:left-6 top-0 w-px bg-primary origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{
            scaleY: 1,
            transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
          }}
          viewport={{ once: true }}
        />

        <div className="space-y-8 sm:space-y-12 relative">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status);
            const IconComponent = getStatusIcon(item.status);

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-background shadow-lg relative z-10">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.title} avatar`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/70" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex-1 min-w-0"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={cn(
                        "border transition-all duration-300 hover:shadow-md relative",
                        "bg-card/50 backdrop-blur-sm",
                        config.borderColor,
                        "group-hover:border-primary/30"
                      )}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <motion.h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </motion.h3>

                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              {item.category && (
                                <span className="font-medium">
                                  {item.category}
                                </span>
                              )}
                              {item.category && item.date && (
                                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                              )}
                              {item.date && (
                                <time dateTime={item.date}>{item.date}</time>
                              )}
                            </div>
                          </div>

                          <Badge
                            className={cn(
                              "w-fit text-xs font-medium border",
                              config.badgeBg,
                              config.badgeText,
                              "border-current/20"
                            )}
                          >
                            {item.status
                              ? item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)
                              : "Upcoming"}
                          </Badge>
                        </div>

                        <motion.p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                          {item.description}
                        </motion.p>

                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              config.progressColor
                            )}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                item.status === "completed"
                                  ? "100%"
                                  : item.status === "current"
                                    ? "65%"
                                    : "25%",
                            }}
                            transition={{
                              duration: 1.2,
                              delay: index * 0.2 + 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Main Portfolio Component
const DeveloperPortfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const color = useMotionValue("#13FFAA");

  useEffect(() => {
    animate(color, ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"], {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const contactForm = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    try {
      sendEmail(data);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      contactForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: "C", icon: SiC },
    { name: "Python", icon: SiPython },
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
    { name: "React", icon: SiReact },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "expressjs", icon: SiExpress },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "turborepo", icon: SiTurborepo },
    { name: "Postman", icon: SiPostman },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: SiAmazon },
    { name: "Kubernetes", icon: SiKubernetes },
    { name: "Redis", icon: SiRedis },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
  ];

  const projects = [
    {
      title: "Canvasflow: Real-Time Collaborative Whiteboard",
      description:
        "A real-time collaborative whiteboard built with Next.js, Node.js, and WebSockets. Features a PostgreSQL backend and a full CI/CD pipeline for seamless multi-user brainstorming and deployment",
      image: "https://i.ibb.co/pvkT6vR8/Canvasflow.jpg",
      liveUrl: "http://canvasflow.devvault.site/",
      githubUrl: "https://github.com/Arihant09x/canvasflow",
      tech: [
        "Turborepo",
        "Next.Js",
        "Tailwindcss",
        "Node.js",
        "WebSocket",
        "PostgresSQL",
        "CI/CD",
      ],
    },
    {
      title: "AI-Suggestions PayWallet",
      description:
        "A smart payment wallet built with Next.js and Node.js that uses the Gemini API to offer personalized spending recommendations. Features secure QR code payments and robust data handling",
      image: "https://i.ibb.co/KxYS7YP5/pay-Wallet.webp",
      liveUrl: "https://paywallet.vercel.app/",
      githubUrl: "https://github.com/Arihant09x/Ai-Suggestions_paywallet/",
      tech: [
        "NextJs",
        "ExpressJs",
        "Gemini API",
        "MongoDB",
        "TailwindCSS",
        "QR Code",
      ],
    },
    {
      title: " Second Brain: AI-Powered Note-Taking Tool",
      description:
        "An AI-powered note-taking app using React, Node.js, and MongoDB. Integrates LangChain and the Gemini API to provide advanced semantic search, transforming notes into an intelligent knowledge base",
      image: "https://i.ibb.co/zWCt8Xpf/second-brain.jpg",
      liveUrl: "https://second-brain-frontend-nwov.onrender.com/",
      githubUrl: "https://github.com/Arihant09x/second-Brain",
      tech: ["React.js", "NodeJs", "MonogoDB", "LangChain", "Gemini API"],
    },
  ];

  const timelineItems: TimelineItem[] = [
    {
      title: "Full stack Developer at localview",
      description:
        "Working as a Full Stack Developer Intern, building scalable applications like real-time whiteboards and AI-powered tools using Next.js, Node.js, PostgreSQL, and MongoDB. I manage both frontend and backend logic, CI/CD pipelines, and secure API integration",
      date: "August 01 - Present",
      category: "Internship",
      status: "upcoming",
    },
    {
      title: "Web Developer Intern at vlaueofcode",
      description:
        " Currently interning as a Web Developer, where I design and build responsive web interfaces using React.js and integrate backend APIs for dynamic functionality. I collaborate in agile teams, contribute to code reviews, and enhance frontend performance and usability.",
      date: "Augest 01 - Present",
      category: "Intership",
      status: "upcoming",
    },
    {
      title: "Web Developer Intern at Dark Elite Creations",
      description:
        " Collaborated with cross-functional development team to design and implement responsive web interfacesusing modern JavaScript frameworksIntegrated backend APIs with frontend components leveraging React.js and Node.js for seamless userexperience",
      date: "March 20 - May 10 - 2025",
      category: "Intership",
      status: "completed",
    },
    {
      title: "Computer Science Degree",
      description:
        "Bachelor's degree in Computer Science with focus on software engineering and algorithms.",
      date: "2022 - 2026",
      category: "Education",
      status: "upcoming",
    },
  ];

  // Smooth scrolling for navbar links
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');

      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 w-full z-50">
        <Navbar1 />
      </div>

      {/* Hero Section */}
      <motion.section
        id="home"
        style={{ backgroundImage }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-gray-200"
      >
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-black">
            <Canvas
              camera={{
                position: [-9.31, 12, 24.72],
                rotation: [-0.65, -0.2, -0.13],
                fov: 35,
              }}
            >
              <ambientLight intensity={1} />
              <directionalLight position={[10, 15, 10]} intensity={10} />
              <directionalLight
                position={[-10, 10, -5]}
                intensity={10}
                color="#ffffff"
              />
              <pointLight position={[0, 20, 3]} intensity={2} distance={50} />
              <GridOfBoxes />
              <Stars radius={50} count={2500} factor={4} fade speed={2} />
            </Canvas>
          </div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Arihant Chougule
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Full Stack Developer & DevOps Enthusiast
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/Arihant_Chougule_Resume.pdf" download={PDF}>
                <motion.button
                  style={{ border, boxShadow }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 rounded-full bg-gray-950/10 px-6 py-3 text-gray-50 transition-colors hover:bg-gray-950/50"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.button>
              </a>
              <a href="mailto:arihantc677@gmail.com?subject=Job Opportunity - Full Stack Developer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full border border-gray-600 px-6 py-3 text-gray-50 hover:bg-gray-800 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Hire Me
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              About Me
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-64 h-64 rounded-full overflow-hidden">
                <img
                  src={photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Full Stack Developer with a strong foundation in JavaScript,
                  React.js, Node.js, and TypeScript. Adept at problem-solving
                  and collaborating in team environments to deliver scalable web
                  applications. Experienced in modern web development frameworks
                  and emerging technologies including Web3 and AI integration
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects,
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl  font-bold mb-6 text-foreground">
              Skills & Technologies
            </h2>
            <div className="overflow-hidden">
              <MarqueeAnimation
                direction="left"
                baseVelocity={-0.5}
                className="text-3xl md:text-5xl text-foreground/20 py-4 mt-7"
              >
                {skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center mx-4  hover:text-primary transition-colors duration-300"
                    >
                      <IconComponent className="w-8 h-8 mr-2" />
                      <span className="text-xl">{skill.name}</span>
                    </span>
                  );
                })}
              </MarqueeAnimation>
              <MarqueeAnimation
                direction="right"
                baseVelocity={-0.5}
                className="text-3xl md:text-5xl text-foreground/20 py-4 mt-7"
              >
                {skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center mx-4  hover:text-primary transition-colors duration-300"
                    >
                      <IconComponent className="w-8 h-8 mr-2" />
                      <span className="text-xl">{skill.name}</span>
                    </span>
                  );
                })}
              </MarqueeAnimation>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Live Demo
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button variant="outline" size="lg" asChild className="group">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View All Projects on GitHub
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Vertical Roadmap */}
      <section id="experience" className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              Career Roadmap
            </h2>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 rounded-full" />

              <div className="space-y-8 relative">
                {timelineItems.map((item, index) => {
                  const config = getStatusConfig(item.status);
                  const IconComponent = getStatusIcon(item.status);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-0 top-6 w-16 h-16 rounded-full border-4 border-background shadow-lg flex items-center justify-center bg-card z-10">
                        <motion.div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            config.progressColor
                          )}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        className="ml-24"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className={cn(
                            "border transition-all duration-300 hover:shadow-lg relative",
                            "bg-card/80 backdrop-blur-sm",
                            config.borderColor,
                            "hover:border-primary/50 group-hover:shadow-xl"
                          )}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <Badge
                                className={cn(
                                  "text-xs font-medium",
                                  config.badgeBg,
                                  config.badgeText
                                )}
                              >
                                {item.date}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>

                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Progress indicator */}
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={cn(
                                  "h-full rounded-full",
                                  config.progressColor
                                )}
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    item.status === "completed"
                                      ? "100%"
                                      : item.status === "current"
                                        ? "65%"
                                        : "25%",
                                }}
                                transition={{
                                  duration: 1.2,
                                  delay: index * 0.2 + 0.8,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Connection line */}
                      {index < timelineItems.length - 1 && (
                        <div className="absolute left-7.5 top-22 w-px h-8 bg-gradient-to-b from-primary to-primary/20" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-foreground">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out and I'll get back to you as soon as
              possible.
            </p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground flex">
                      Email
                    </h3>
                    <span className="text-foreground">
                      arihantc677@gmail.com
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <span className="text-foreground">+91 9113582352</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <span className="text-foreground">karnataka, India</span>
                  </div>
                </div>
              </div>

              <Card className="p-6 shadow-lg">
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              {...field}
                              className="min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Arihant Chougule. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperPortfolio;
