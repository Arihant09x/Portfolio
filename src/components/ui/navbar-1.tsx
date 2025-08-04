"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll spy functionality
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -40% 0px", // Adjusted to better detect sections
      threshold: 0.2, // Increased threshold for better detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        } else {
          console.warn(`Section with id "${section}" not found`);
        }
      });
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Fallback scroll detection for sections that might be missed
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition <= offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Contact",
  ];

  return (
    <div className="flex justify-center w-full py-4 px-4 mt-5">
      <div className="flex items-center justify-between px-4 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full w-full max-w-2xl relative z-10 shadow-sm shadow-primary/30">
        <div className="flex items-center">
          <span className="ml-4 text-lg font-bold text-gray-900 dark:text-white border-b-2 border-primary">
            Portfolio
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const itemId = item.toLowerCase();
            const isActive = activeSection === itemId;

            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href={`#${itemId}`}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isActive
                      ? "text-primary text-base font-bold"
                      : "text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <motion.button
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>

          <motion.button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => {
                const itemId = item.toLowerCase();
                const isActive = activeSection === itemId;

                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <a
                      href={`#${itemId}`}
                      className={`text-base font-medium transition-all duration-300 ${
                        isActive
                          ? "text-primary text-lg font-bold"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                      onClick={() => {
                        setActiveSection(itemId);
                        toggleMenu();
                      }}
                    >
                      {item}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveUnderline"
                          className="h-0.5 bg-primary mt-1"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
