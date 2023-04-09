import Head from "next/head";
import { ArrowDownOnSquareStackIcon, ShareIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Landing = () => {
  return (
    <>
      <Head>
        <title>YEETH!</title>
        <meta name="description" content="YEET your ETH!" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-7xl font-bold">YEETH!</span>
          </h1>
          <p className="text-center text-lg">
            A highly gas-unoptimized tool for one-off and reoccurring ETH splits.
          </p>
          <p className="text-center text-lg">
            Connect your wallet to get started.
          </p>
          <span className="w-full flex flex-col items-center">
            <ConnectButton />
          </span>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ArrowDownOnSquareStackIcon className="h-8 w-8 fill-secondary" />
              <p>
                Make one-off ETH splits and airdrops to recipients with our Airdrop contract.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ShareIcon className="h-8 w-8 fill-secondary" />
              <p>
                Setup a reusable, addressable Splitter which automatically splits ETH it receives!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
