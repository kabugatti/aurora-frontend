import { FaPlus } from "react-icons/fa6";
import { MdCreditScore } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";




const TopHeaders = () => {
  return (
    <div className="flex   bg-white w-[60%] justify-between">
      {/* current question */}
      <div className=" max-w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 text-black   flex flex-row items-center">
          <div className="rounded-full bg-blue-300 w-10 h-10 flex items-center align-middle flex-row justify-center">
          <FaPlus className="text-blue-600"/>  
          </div>
          <div className="ml-5">
              <h2 className="text-sm">Current Question</h2>
              <span className="font-bold text-lg">15 of 25</span>
          </div>
      </div>

      {/*scores  */}
      <div className=" w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white text-black flex flex-row items-center">
          <div className="rounded-full bg-green-200 w-10 h-10 flex items-center align-middle flex-row justify-center">
          <MdCreditScore className="text-green-600"/>  
          </div>
          <div className="ml-5">
              <h2 className="text-sm">Score</h2>
              <span className="font-extrabold text-lg">85%</span>
          </div>
      </div>

      {/* Time reminaning */}
      <div className=" w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white text-black  flex flex-row items-center">
          <div className="rounded-full bg-violet-300  w-10 h-10 flex items-center align-middle flex-row justify-center">
          <MdOutlineAccessTime className="text-violet-500 font-semibold" />
          
          </div>
          <div className="ml-5">
              <h2 className="text-sm">Time Remaining</h2>
              <span className="font-bold text-lg">25:00</span>
          </div>
      </div>
    </div>
  );
};

export default TopHeaders;
