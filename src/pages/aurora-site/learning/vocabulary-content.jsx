import React, { useState } from "react";
import Categories from "@/components/learning-path/categories";
import Practice from "@/components/learning-path/practice";
import Progress from "@/components/learning-path/progress";
import SavedWork from "@/components/learning-path/saved-work";
import LanguageSkils from "@/components/learning-path/language-skils";

const VocabularySection = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Categories");

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Categories":
        return (
          <>
            <h2 className="text-3xl font-semibold text-center mb-8 ">
              Vocabulary Categories
            </h2>
            <Categories />
          </>
        );
      case "Saved Words":
        return (
          <SavedWork setActiveTab={setActiveTab}/>
        );
      case "Practice":
        return (
          <div className="text-center text-gray-400">
           <Practice/>
          </div>
        );
      case "Progress":
        return (
          <div className="text-center text-gray-400">
            <Progress />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Vocabulary Builder</h1>
        <div className="w-full flex justify-center mt-3">
          <p className="text-white w-[60%] text-2xl">
            Expand your vocabulary with our AI-powered learning system that
            adapts to your level and learning style.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for words..."
          className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="container mx-auto">
        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-12 bg-gray-700 container mx-auto">
          {["Categories", "Saved Words", "Practice", "Progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "text-white bg-gray-800 outline-none"
                  : "text-gray-400 hover:text-white"
              } pb-2  w-full`}
            >
              {tab}
            </button>
          ))}
        </div>

       
        {renderContent()}
      </div>

      <div className="mb-10 mt-16">
      <LanguageSkils/>
      </div>
    </div>
  );
};

export default VocabularySection;
