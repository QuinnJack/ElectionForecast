import { motion } from "framer-motion";
import React, { useState } from "react";

interface TabType {
  value: string;
  text: string;
}

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Tab: React.FC<TabProps> = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
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
          className="absolute inset-0 z-0 rounded-md bg-gray-900"
        ></motion.span>
      )}
    </button>
  );
};

const ButtonShapeTabs: React.FC<{
  tabs: TabType[];
  activeTab: string;
  onTabChange: (value: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 font-mono">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          text={tab.text}
          selected={activeTab === tab.value}
          setSelected={() => onTabChange(tab.value)}
        />
      ))}
    </div>
  );
};

export default ButtonShapeTabs;
