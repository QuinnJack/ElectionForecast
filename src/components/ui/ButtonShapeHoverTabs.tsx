import { motion } from "framer-motion";
import React from "react";

interface TabType {
  value: string;
  text: string;
}

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  bgColor: string;
}

const Tab: React.FC<TabProps> = ({ text, selected, setSelected, bgColor }) => {
  return (
    <button
      onMouseEnter={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className={`absolute inset-0 z-0 rounded-md`}
          style={{ backgroundColor: bgColor }}
        ></motion.span>
      )}
    </button>
  );
};

const ButtonShapeHoverTabs: React.FC<{
  tabs: TabType[];
  activeTab: string;
  onTabChange: (value: string) => void;
  type: "provinces" | "tabs";
}> = ({ tabs, activeTab, onTabChange, type }) => {
  // const provinceColors = [
  //   "#35e3a9",
  //   "#64de8c",
  //   "#85d772",
  //   "#a2ce5d",
  //   "#bcc54f",
  //   "#d4b949",
  //   "#e9ad4d",
  //   "#faa059",
  //   "#ff926a",
  //   "#ff8982",
  //   "#ff8399",
  //   "#ff7aaf",
  //   "#ff7ac8",
  // ];

  const provinceColors = [
    "#35e3a9",
    "#5eddac",
    "#78d6af",
    "#8ccfb1",
    "#9ec8b4",
    "#adc0b7",
    "#bcb8b9",
    "#c8afbc",
    "#d5a6be",
    "#e09dc1",
    "#eb92c3",
    "#f587c6",
    "#ff7ac8",
  ];

  const tabColors = ["#35e4aa", "#56e9b9", "#82eac6", "#ff8ed0", "#ff79c8"];

  const colors = type === "provinces" ? provinceColors : tabColors;

  return (
    <div className="mb-0 flex flex-wrap items-center gap-2 font-mono">
      {tabs.map((tab, index) => (
        <Tab
          key={tab.value}
          text={tab.text}
          selected={activeTab === tab.value}
          setSelected={onTabChange}
          bgColor={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default ButtonShapeHoverTabs;
