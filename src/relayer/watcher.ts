import { connection, program } from "../anchor/program";
import { PublicKey } from "@solana/web3.js";
import { triggerDepositChange } from "./trigger";

// 📌 GameAccount PDA 계산
async function findGameAccount(
  player: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [Buffer.from("program-account"), player.toBuffer()],
    program.programId
  );
}

// 👀 감시 시작 함수
export async function startWatcher() {
  console.log("🔍 Starting GameAccount watcher...");

  // ✅ 테스트 유저 지갑 주소 (실제 유저로 교체 필요)
  const player = new PublicKey("ENTER_PLAYER_PUBKEY_HERE"); // 👈 여기에 감시할 유저 주소 입력
  const [gameAccount] = await findGameAccount(player);

  console.log(`🧠 Watching account: ${gameAccount.toBase58()}`);

  let previousDepositAmount: number | null = null;

  // ✅ 계정 변화 감지 (onAccountChange)
  connection.onAccountChange(gameAccount, async (accountInfo, context) => {
    console.log("🚨 GameAccount updated at slot:", context.slot);

    // Buffer로부터 필드 추출
    const data = accountInfo.data;
    const playerKey = new PublicKey(data.slice(8, 40));
    const depositAmount = Number(data.readBigUInt64LE(40));
    const frontendResult = Number(data.readBigUInt64LE(48));
    const backendResult = Number(data.readBigUInt64LE(56));

    console.log("👤 player:", playerKey.toBase58());
    console.log("💰 depositAmount:", depositAmount);
    console.log("🧮 frontendResult:", frontendResult);
    console.log("🧠 backendResult:", backendResult);

    // depositAmount가 변화가 되었으면 트리거 발생
    if (
      previousDepositAmount === null ||
      previousDepositAmount !== depositAmount
    ) {
      console.log(
        `⚡ depositAmount changed: ${previousDepositAmount} -> ${depositAmount}`
      );
      triggerDepositChange(playerKey, depositAmount);
      previousDepositAmount = depositAmount;
    }
  });
}
