import React, { useMemo, useState } from "react";
import StatusIndicator from "./StatusIndicator";
import {
  mockEscrow,
  type MockEscrow,
  type MockEscrowStatus,
  type MockEscrowType,
} from "@/lib/mock/escrow";

const Step: React.FC<{ label: string; active?: boolean }> = ({
  label,
  active,
}) => (
  <div className="flex items-center gap-2 text-xs">
    <div
      className={`h-2 w-2 rounded-full ${
        active ? "bg-emerald-400" : "bg-gray-600"
      }`}
    />
    <span className={`${active ? "text-gray-100" : "text-gray-400"}`}>
      {label}
    </span>
  </div>
);

const EscrowForm: React.FC = () => {
  const [escrow, setEscrow] = useState<MockEscrow>(mockEscrow);

  const updateField = (
    field: keyof MockEscrow,
    value: string | number | MockEscrowStatus | MockEscrowType
  ) => {
    setEscrow((prev) => ({ ...prev, [field]: value } as MockEscrow));
  };

  const onCreate = () => updateField("status", "funded");
  const onProgress = () => updateField("status", "in-progress");
  const onComplete = () => updateField("status", "complete");
  const onReset = () => setEscrow({ ...mockEscrow });

  const stepIndex = useMemo(() => {
    switch (escrow.status) {
      case "funded":
        return 1;
      case "in-progress":
        return 2;
      case "complete":
        return 3;
      default:
        return 0;
    }
  }, [escrow.status]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-600 rounded-xl p-6 overflow-hidden gap-8">
        {/* Left: form */}
        <div className=" ">
          <div>
            <h2 className="text-2xl text-white mb-2">Create Escrow</h2>
            <p className="text-xs text-gray-400">
              Steps: Pay → Class → Confirm → Release / Dispute
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-300">Escrow Type</p>
            <div className="mt-2 flex items-center gap-6 text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  className="accent-emerald-500"
                  checked={escrow.type === "single"}
                  onChange={() => updateField("type", "single")}
                />
                <span className="text-gray-200">Single release</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  className="accent-emerald-500"
                  checked={escrow.type === "milestone"}
                  onChange={() => updateField("type", "milestone")}
                />
                <span className="text-gray-200">Milestone-based</span>
              </label>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <label className="text-sm text-gray-300">
              <span className="block mb-2">Student Wallet</span>
              <input
                type="text"
                className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-gray-100 placeholder:text-gray-500"
                value={escrow.student}
                onChange={(e) => updateField("student", e.target.value)}
                placeholder="0x..."
              />
            </label>
            <label className="text-sm text-gray-300">
              <span className="block mb-2">Teacher Wallet</span>
              <input
                type="text"
                className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-gray-100 placeholder:text-gray-500"
                value={escrow.teacher}
                onChange={(e) => updateField("teacher", e.target.value)}
                placeholder="0x..."
              />
            </label>
            <label className="text-sm text-gray-300">
              <span className="block mb-2">Amount (USDC)</span>
              <input
                type="number"
                className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-gray-100 placeholder:text-gray-500"
                value={escrow.amount}
                onChange={(e) => updateField("amount", Number(e.target.value))}
                placeholder="100"
                min={0}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCreate}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
            >
              <span>Pay & Create Escrow</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-md border border-red-400/60 text-red-300 hover:bg-red-500/10"
            >
              Open Dispute
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-md border border-white/10 text-gray-300 hover:bg-white/5"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: status and flow */}
        <div className="mt-5 flex flex-col justify-items-end">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300">Current Status</p>
            <StatusIndicator status={escrow.status} />
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-2">Flow</p>
            <div className="grid grid-cols-4 gap-4">
              <Step label="Pay" active={stepIndex >= 1} />
              <Step label="Class" active={stepIndex >= 2} />
              <Step label="Confirm" active={stepIndex >= 3} />
              <Step label="Release / Dispute" active={stepIndex >= 4} />
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Escrow Type</p>
              <p className="text-gray-200 capitalize">{escrow.type}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Amount</p>
              <p className="text-gray-200">{escrow.amount}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Student</p>
              <p className="text-gray-200">{escrow.student}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Teacher</p>
              <p className="text-gray-200">{escrow.teacher}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-gray-800 text-gray-200 border border-white/10"
            >
              Confirm Class Completion
            </button>
            <button
              type="button"
              onClick={onProgress}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-gray-800 text-gray-200 border border-white/10"
            >
              Move to Confirmation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EscrowForm;
