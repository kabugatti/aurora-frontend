import TopHeaders from "../components/practice/TopHeaders";
import QuestionsSection from "../components/practice/QuestionsSection";
import { useState } from "react";
const PracticeSystem = () => {
  const web3Questions = [
    {
      number: 1,
      question: "What is Web3, and how does it differ from Web2?",
      options: [
        "Web3 is the next evolution of the internet that focuses on decentralization and user control through blockchain technology.", // Correct
        "Web3 is a centralized platform that enables faster communication through proprietary networks.",
        "Web3 is a version of the internet focused on social media and centralized applications.",
        "Web3 is another term for Web2 but with better graphics.",
      ],
      correctAnswer: 0,
    },
    {
      number: 2,
      question:
        "What is Ethereum, and why is it significant in the Web3 space?",
      options: [
        "Ethereum is a decentralized blockchain platform that introduced smart contracts, enabling developers to create decentralized applications (dApps).", // Correct
        "Ethereum is a centralized platform for hosting websites in Web2.",
        "Ethereum is a cryptocurrency wallet exclusively for storing Bitcoin.",
        "Ethereum is a company that designs smart home devices.",
      ],
      correctAnswer: 0,
    },
    {
      number: 3,
      question: "What are smart contracts, and how do they work?",
      options: [
        "Smart contracts are self-executing programs stored on the blockchain that run when predefined conditions are met.", // Correct
        "Smart contracts are agreements signed electronically and stored in centralized servers.",
        "Smart contracts are blockchain apps that send emails automatically.",
        "Smart contracts are PDFs stored in a database for user agreements.",
      ],
      correctAnswer: 0,
    },
    {
      number: 4,
      question: "What does 'gas fee' mean in Ethereum?",
      options: [
        "A gas fee is the cost of performing transactions or executing smart contracts on the Ethereum blockchain.", // Correct
        "A gas fee is the payment users make to internet providers for bandwidth.",
        "A gas fee refers to the subscription cost for using Web3 applications.",
        "A gas fee is the cost of sending emails via decentralized email systems.",
      ],
      correctAnswer: 0,
    },
    {
      number: 4,
      question: "What is a decentralized application (dApp)?",
      options: [
        "A dApp is an application built on a blockchain that operates without a central authority.", // Correct
        "A dApp is a Web2 application stored in a physical server farm.",
        "A dApp is a mobile app used to access blockchain mining tools.",
        "A dApp is a centralized database application used in financial systems.",
      ],
      correctAnswer: 0,
    },
    {
      number: 6,
      question:
        "What is the difference between Proof of Work (PoW) and Proof of Stake (PoS)?",
      options: [
        "PoW requires miners to solve complex mathematical problems to validate transactions, while PoS allows validators to validate transactions based on the amount of cryptocurrency they hold.", // Correct
        "PoW is a staking mechanism where miners deposit funds, and PoS is a mechanism to solve puzzles.",
        "PoW refers to lightweight transactions, while PoS refers to heavy transactions.",
        "PoW is a process for hosting websites, while PoS is used for storing data.",
      ],
      correctAnswer: 0,
    },
    {
      number: 7,
      question: "What is the Ethereum Virtual Machine (EVM)?",
      options: [
        "The EVM is the runtime environment for executing smart contracts on Ethereum.", // Correct
        "The EVM is a hardware device for mining Ethereum.",
        "The EVM is a cryptocurrency wallet designed for storing Ethereum.",
        "The EVM is a decentralized web browser for Ethereum-based websites.",
      ],
      correctAnswer: 0,
    },
    {
      number: 8,
      question: "What is the significance of Ethereum's Merge in 2022?",
      options: [
        "The Merge transitioned Ethereum from Proof of Work to Proof of Stake, reducing its energy consumption by over 99%.", // Correct
        "The Merge allowed Ethereum to create new versions of Bitcoin.",
        "The Merge replaced Ethereum with a completely new blockchain platform.",
        "The Merge enabled Ethereum to become a centralized system.",
      ],
      correctAnswer: 0,
    },
    {
      number: 9,
      question: "What are Layer 2 solutions in blockchain?",
      options: [
        "Layer 2 solutions are protocols built on top of blockchains to improve scalability and reduce transaction costs.", // Correct
        "Layer 2 solutions are extra hardware devices used for blockchain mining.",
        "Layer 2 solutions refer to advanced blockchain nodes used for storing data.",
        "Layer 2 solutions are backup systems for recovering lost blockchain transactions.",
      ],
      correctAnswer: 0,
    },
    {
      number: 10,
      question: "What are Non-Fungible Tokens (NFTs)?",
      options: [
        "NFTs are unique digital assets stored on the blockchain that cannot be replicated.", // Correct
        "NFTs are digital currencies used only for buying virtual goods.",
        "NFTs are interchangeable tokens used for trading on exchanges.",
        "NFTs are decentralized apps used for financial transactions.",
      ],
      correctAnswer: 0,
    },
    {
      number: 11,
      question: "What is Decentralized Finance (DeFi)?",
      options: [
        "DeFi refers to financial services and products that operate on decentralized blockchains without intermediaries.", // Correct
        "DeFi is a centralized banking service that uses blockchain for transactions.",
        "DeFi is a method of storing cryptocurrencies in hardware wallets.",
        "DeFi is a government-regulated blockchain-based tax system.",
      ],
      correctAnswer: 0,
    },
    {
      number: 12,
      question: "What is a DAO (Decentralized Autonomous Organization)?",
      options: [
        "A DAO is an organization managed by smart contracts and governed by members through token-based voting.", // Correct
        "A DAO is a physical entity used for blockchain governance.",
        "A DAO is a centralized group of developers creating smart contracts.",
        "A DAO is a traditional corporation that uses blockchain for record-keeping.",
      ],
      correctAnswer: 0,
    },
  ];
 
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion=()=>{
     if(currentQuestion < web3Questions.length-1){
        setCurrentQuestion(currentQuestion +1)
     }
  }

  const handleBackQuestion=()=>{
    if(currentQuestion > 0){
        setCurrentQuestion(currentQuestion -1)
    }
  }
  return (
    <div className="md:w-[1200px]">
      <TopHeaders />
      <QuestionsSection question={web3Questions[currentQuestion]} />
      <div className="mt-5 flex items-center justify-between w-full">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBackQuestion}
          className="text-white bg-gradient-to-br from-blue-300 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back
        </button>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        </div>
        {/* Next button */}
        <button
          type="button"
          onClick={handleNextQuestion}
          className="text-white bg-gradient-to-br from-blue-300 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PracticeSystem;
