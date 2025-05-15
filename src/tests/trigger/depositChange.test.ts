const { expect } = require("chai");
import { PublicKey } from "@solana/web3.js";
const sinon = require("sinon");

import { triggerDepositChange } from "../../relayer/trigger";
import { socketManager } from "../../socketManager";

describe("triggerDepositChange", () => {
  it("should broadcast correct deposit change payload", () => {
    const player = new PublicKey("11111111111111111111111111111111");
    const depositAmount = 500;
    const spy = sinon.spy(socketManager, "broadcast");
    triggerDepositChange(player, depositAmount);
    expect(spy.calledOnce).to.be.true;
    expect(spy.firstCall.args[0]).to.include({
      event: "game:started",
      player: player.toBase58(),
      depositAmount: depositAmount,
    });
    spy.restore(); // 꼭 리셋
  });
});

it("should not trigger broadcast if depositAmount has not changed", () => {
  const player = new PublicKey("11111111111111111111111111111111");
  const depositAmount = 500;
  const spy = sinon.spy(socketManager, "broadcast");
  // Call once with the amount
  triggerDepositChange(player, depositAmount);
  // Call again with the same amount (should not trigger)
  triggerDepositChange(player, depositAmount);
  expect(spy.calledOnce).to.be.true; // still only one call
  spy.restore();
});
