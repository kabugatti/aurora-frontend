import React, {useState} from "react";
import "../../App.css";
const PracticeDropdown = () => {
   const [dropdown, setDropdown] = useState(false);

   const handleNavClick = (key) => {
      const path = {
         sentenceBbuilder: "/sentence-builder",
         wordMatching: "/wordmatching",
         memoryCard: "/memoryCard",
         storyGame: "/story-game",
         dragAndDrop: "/drag-and-drop",
         idiomChallenge: "/idiom-challenge",
         multipleChoice: "/multiple-choice",
      }[key.toLowerCase()];

      if (path) {
         navigate(path);
      } else console.warn("❗Ruta inválida desde Header:", key);
   };
   return (
      <div className="relative ">
         <button
            className="md:text-xs  font-medium text-gray-700 py-2 border-radius-none border-transparent hover:border-transparent hover:border-radius-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
            onClick={() => setDropdown(!dropdown)}
         >
            Practice
         </button>
         {dropdown && (
            <div className="absolute bg-white top-12 -left-6 w-48 h-52 rounded-md border overflow-y-auto hide-scrollbar transition-all duration-300 z-10">
               <ul className="p-4 flex flex-col justify-start items-start gap-2 overflow-y-auto hide-scrollbar font-medium text-gray-700">
                  {["Sentence Builder", "Word matching", "Memory Card", "Story Game", "Drag and Drop", "Idiom Challenge", "Multiple Choice"].map((item) => (
                     <button
                        key={item}
                        onClick={() => handleNavClick(item)}
                        className="text-xs font-medium text-gray-700 py-2 border-radius-none border-transparent hover:border-transparent hover:border-radius-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
                     >
                        {item}
                     </button>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default PracticeDropdown;
