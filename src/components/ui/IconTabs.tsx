import { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const tabs = [
  {
    title: "2004",
    color: "#FE2C32",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#FE2C32",
          backgroundColor: "#FE2C3259", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2006",
    color: "#17A5FF",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#17A5FF",
          backgroundColor: "#17A5FF59", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2008",
    color: "#17A5FF",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#17A5FF",
          backgroundColor: "#17A5FF59", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2011",
    color: "#17A5FF",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#17A5FF",
          backgroundColor: "#17A5FF59", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2015",
    color: "#FE2C32",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#FE2C32",
          backgroundColor: "#FE2C3259", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2019",
    color: "#FE2C32",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#FE2C32",
          backgroundColor: "#FE2C3259", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2021",
    color: "#FE2C32",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#FE2C32",
          backgroundColor: "#FE2C3259", // 35% opacity
        }}
      ></div>
    ),
  },
  {
    title: "2025",
    color: "#00000090",
    icon: (
      <div
        className="w-5 h-5 rounded-full mr-2 border"
        style={{
          borderColor: "#00000090",
          backgroundColor: "#AFAFAF35", // 35% opacity
        }}
      ></div>
    ),
  },
];

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (selected) => ({
    gap: selected ? ".5rem" : 0,
    paddingLeft: selected ? "1rem" : ".5rem",
    paddingRight: selected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.35 };

const Tab = ({ text, selected, setSelected, index, children }) => {
  const color = tabs[index].color;
  const is2025 = tabs[index].title === "2025";
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      custom={selected}
      onClick={() => setSelected(tabs[index].title)}
      transition={transition}
      className={`relative flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 focus-within:outline-none ${
        selected
          ? is2025
            ? "bg-gray-300 text-gray-700"
            : "bg-opacity-15 text-current"
          : "hover:text-gray-900 dark:hover:text-gray-100"
      }`}
      style={{
        backgroundColor: selected
          ? is2025
            ? "#f5f5f5" // light grey for 2025 tab
            : color + "26" // 15% opacity for other tabs
          : "transparent",
        color: selected ? (is2025 ? "#4A4A4A" : color) : "",
      }}
    >
      {children}
      <AnimatePresence>
        {selected && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const IconTabs = ({ center, selectedTab, setSelectedTab }) => {
  return (
    <div
      className={`${
        center ? "justify-center " : ""
      } mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-600`}
    >
      {tabs.map((tab, index) => (
        <Tab
          text={tab.title}
          selected={selectedTab === tab.title}
          setSelected={setSelectedTab}
          index={index}
          key={tab.title}
        >
          {tab.icon}
        </Tab>
      ))}
    </div>
  );
};

export default IconTabs;
