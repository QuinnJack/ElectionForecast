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
}> = ({ tabs, activeTab, onTabChange }) => {
  const colors = [
    "#35e4aa",
    "#56e9b9",
    "#82eac6",
    "#ff8ed0",
    "#ff79c8",
    "#ff61be",
  ];

  return (
    <div className="mb-0 flex flex-wrap items-center gap-2 font-mono">
      {tabs.map((tab, index) => (
        <Tab
          key={tab.value}
          text={tab.text}
          selected={activeTab === tab.value}
          setSelected={onTabChange}
          bgColor={colors[index] || "#000000"}
        />
      ))}
    </div>
  );
};

export default ButtonShapeHoverTabs;
