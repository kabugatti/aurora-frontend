import React from "react";
import type { MockEscrowStatus } from "@/lib/mock/escrow";

const statusStyles: Record<MockEscrowStatus, string> = {
  none: "bg-gray-800 text-gray-200 border border-gray-700",
  funded: "bg-amber-900/40 text-amber-300 border border-amber-700/60",
  "in-progress": "bg-blue-900/40 text-blue-200 border border-blue-700/60",
  complete: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/60",
};

const statusLabel: Record<MockEscrowStatus, string> = {
  none: "No Escrow",
  funded: "Funded",
  "in-progress": "In Progress",
  complete: "Complete",
};

type Props = {
  status: MockEscrowStatus;
  className?: string;
};

const StatusIndicator: React.FC<Props> = ({ status, className }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        statusStyles[status]
      } ${className ?? ""}`}
    >
      {statusLabel[status]}
    </span>
  );
};

export default StatusIndicator;
