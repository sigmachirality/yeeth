import React from "react";
import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <Link href="/">
            <div className="flex flex-col">
              <span className="font-bold leading-tight">YEETH!</span>
              <span className="text-xs">Yeet your ETH!</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
