import { motion } from "framer-motion";
import { cn } from "./utils";
import { useState } from "react";
import React from "react";

interface TabProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  customID?: string;
}

const Tab = ({ text, selected, onClick, customID }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        selected
          ? "text-black"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors duration-300 focus-within:outline-black/50 font-mono`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.div
          className="absolute left-0 top-0 flex h-full w-full items-end justify-center"
          layoutId={customID + "linetab"}
          transition={{ type: "spring", duration: 0.4, bounce: 0, delay: 0.1 }}
        >
          <span className="z-0 h-[3px] w-[60%] rounded-t-full bg-black"></span>
        </motion.div>
      )}
    </button>
  );
};

interface LineTabsProps {
  tabs: { text: string; value: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  center?: boolean;
  customID?: string;
}

const LineTabs = ({
  tabs,
  activeTab,
  onTabChange,
  center,
  customID,
}: LineTabsProps) => {
  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-600",
        center && "justify-center"
      )}
    >
      {tabs.map((tab) => (
        <Tab
          text={tab.text}
          selected={activeTab === tab.value}
          onClick={() => onTabChange(tab.value)}
          key={tab.value}
          customID={customID}
        />
      ))}
    </div>
  );
};

export default LineTabs;
