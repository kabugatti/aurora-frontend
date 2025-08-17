import React from "react";
import Hero from "./components/Hero";
import EscrowForm from "./components/EscrowForm";

const EscrowClassesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Hero />
      <EscrowForm />
    </div>
  );
};

export default EscrowClassesPage;
