import React from "react";
import { Shield } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-emerald-900 to-cyan-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <p className="inline-flex  items-center text-xs uppercase tracking-widest border border-gray-500 rounded-full px-3 py-1 mb-4">
          
          <Shield className=" mr-2"/>
           Smart
          escrow for classes
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Aurora
          </span>
          : escrow that releases when classes are complete
        </h1>
        <p className="text-white/90 mt-3 max-w-3xl text-sm">
          Pay per class, lock funds in escrow, confirm completion, and release
          or dispute — all in one elegant flow.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-1 rounded-md text-white font-semibold shadow"
          >
            Create Escrow
          </button>
          <button
            type="button"
            className="px-5 py-1 bg-slate-900 rounded-md border text-white/95 hover:bg-slate-800"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
