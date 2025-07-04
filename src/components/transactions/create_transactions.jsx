'use client';

import { useState } from 'react';
import { Contract } from '../../bindings/transactions';
import { Address } from 'soroban-client';
import { getActiveWallet, getContractId } from '@/utils/soroban-helpers';
import { toast } from 'react-hot-toast';

export default function Transactions() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    try {
      const user = await getActiveWallet(); 
      const contractId = getContractId('transactions');
      const contract = new Contract(contractId);

      await contract.create_transaction({
        env: user, 
        to: Address.fromString(to),
        amount: BigInt(amount),
      });

      toast.success('Transaction submitted! 🚀');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send transaction');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">Send Transaction</h2>
      <input
        placeholder="To Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleSend} className="bg-blue-600 text-white w-full p-2 rounded">
        Send
      </button>
    </div>
  );
}
