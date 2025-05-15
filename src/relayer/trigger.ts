// trigger.ts
import { PublicKey } from "@solana/web3.js";
import { socketManager } from "../socketManager"; // socket.io 인스턴스를 import했다고 가정

export function triggerDepositChange(player: PublicKey, newAmount: number) {
  console.log(
    `🚀 Triggering deposit change for ${player.toBase58()}: ${newAmount}`
  );

  const payload = {
    event: "game:started",
    player: player.toBase58(),
    depositAmount: newAmount,
    timestamp: Date.now(),
  };

  // 프론트 전체 브로드캐스트
  socketManager.broadcast(payload);
}
