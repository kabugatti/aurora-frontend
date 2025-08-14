export type MockEscrowStatus = "none" | "funded" | "in-progress" | "complete";
export type MockEscrowType = "single" | "milestone";

export interface MockEscrow {
  student: string;
  teacher: string;
  amount: number;
  status: MockEscrowStatus;
  type: MockEscrowType;
}

export const mockEscrow: MockEscrow = {
  student: "0x7f5c0...3a4b",
  teacher: "0x92e1a...7c1d",
  amount: 150,
  status: "none",
  type: "single",
};
