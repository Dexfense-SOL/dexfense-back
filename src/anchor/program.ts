import * as dotenv from "dotenv";
dotenv.config();

import { AnchorProvider, Program, Idl, Wallet } from "@coral-xyz/anchor";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import idl from "../../core_contract.json"; // ✅ 이미 metadata.address 포함된 IDL

const connection = new Connection(process.env.RPC_URL!, "confirmed");

// ✅ dummy wallet (read-only 목적)
const dummyKeypair = Keypair.generate();
const dummyWallet: Wallet & { payer: Keypair } = {
  publicKey: dummyKeypair.publicKey,
  signAllTransactions: async (txs) => txs,
  signTransaction: async (tx) => tx,
  payer: dummyKeypair
};

const provider = new AnchorProvider(connection, dummyWallet, {});

// ✅ 타입 경고 방지를 위한 안전한 타입 캐스팅
export const program = new Program(idl as unknown as Idl, provider);
export { connection };
