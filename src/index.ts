import { cetusMainnetSDKOptions } from "./cetusMainnetSDKOptions";
import { CetusClmmSDK } from "@cetusprotocol/cetus-sui-clmm-sdk";
import BN from "bn.js";

export async function getPrice() {
  const sdk = new CetusClmmSDK(cetusMainnetSDKOptions);
  const a2b = false;
  const pool = await sdk.Pool.getPool(
    "0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20",
  );
  const byAmountIn = true;
  const amount = new BN(1_000_000);

  console.log(pool.poolAddress, pool.coinTypeA, pool.coinTypeB);
  const swapTicks = await sdk.Pool.fetchTicks({
    pool_id: pool.poolAddress,
    coinTypeA: pool.coinTypeA,
    coinTypeB: pool.coinTypeB,
  });

  console.log("swapTicks length: ", swapTicks.length);

  const res = sdk.Swap.calculateRates({
    decimalsA: 6,
    decimalsB: 6,
    a2b,
    byAmountIn,
    amount,
    swapTicks,
    currentPool: pool,
  });

  console.log("calculateRates###res###", {
    estimatedAmountIn: res.estimatedAmountIn.toString(),
    estimatedAmountOut: res.estimatedAmountOut.toString(),
    estimatedEndSqrtPrice: res.estimatedEndSqrtPrice.toString(),
    estimatedFeeAmount: res.estimatedFeeAmount.toString(),
    isExceed: res.isExceed,
    extraComputeLimit: res.extraComputeLimit,
    amount: res.amount.toString(),
    aToB: res.aToB,
    byAmountIn: res.byAmountIn,
  });
}

getPrice();
