"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { isNil } from "lodash";
import { useWallet } from "@/hooks/use-wallet";
import Account from "./account";
import { useRouter } from "next/navigation";

const CardanoWallet = () => {
  const { wallet } = useWallet();
  const router = useRouter();
  return (
    <div style={{ width: "min-content", zIndex: 50 }}>
      {!isNil(wallet) ? (
        <Account />
      ) : (
        <div>
          <Button onClick={() => router.push("/login")}>Connect Wallet</Button>
        </div>
      )}
    </div>
  );
};

export const WalletConnectButton = dynamic(() => Promise.resolve(CardanoWallet), {
  loading: () => <></>,
  ssr: false,
});
