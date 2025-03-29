import React from "react";
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

const RamazanEndNotice = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-200 to-slate-500 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl sm:text-2xl font-extrabold text-gray-800">🌙 Ramazani ka përfunduar!</h2>
        <p className="text-gray-600 mt-4 text-lg sm:text-xl">Shihemi në Ramazanin e radhës! Urojmë që t’ju ketë sjellë paqe dhe begati. 🙏</p>
        
        <div className="mt-6">
          <p className="text-gray-500 font-semibold text-lg">A GM CREATION</p>
          <div className="flex justify-center mt-2 space-x-4 text-2xl sm:text-3xl">
            <a href="https://www.instagram.com/malokugentt/" className="text-gray-600 hover:text-blue-600">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/gentmaloku/" className="text-gray-600 hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="https://www.gentmaloku.live/" className="text-gray-600 hover:text-blue-600">
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RamazanEndNotice;
