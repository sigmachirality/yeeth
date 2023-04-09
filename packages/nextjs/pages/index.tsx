import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { isAddress } from "@ethersproject/address";
import { parseUnits, formatEther, formatUnits } from "ethers/lib/utils.js";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";
import { AddressInput, EtherInput, IntegerInput } from "~~/components/scaffold-eth/Input";
import LargeSwitch from "~~/components/LargeSwitch";
import Landing from "~~/components/Landing";
import { notification } from "~~/utils/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

const SPLIT_TYPES = ["One-Time", "Reoccurring"] as const;
type SplitTypes = typeof SPLIT_TYPES[number];

type SplitRecipient = {
  address: string;
  amount: string;
}

const Home: NextPage = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const [splitType, setSplitType] = useState<SplitTypes>(SPLIT_TYPES[0]);
  const [newUserAddress, setNewUserAddress] = useState<string>("");
  const [newUserAmount, setNewUserAmount] = useState<string>("");
  const [recipients, setRecipients] = useState<SplitRecipient[]>([]);

  const values = useMemo(() => {
    // If splitType is "One-Time", interpret strings as ether, otherwise interpret as raw numbers
    return recipients.map(({ amount }) => parseUnits(amount, splitType === "One-Time" ? "ether" : "wei"));
  }, [recipients.length]);
  // TODO: rewrite this with big numbers (this breaks if IntegerInput's value is too high)
  const totalValues = recipients.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // TODO: Extract the airdrop and factory case into separate containers/providers
  const { write: submitAirdropSplit, error: airdropError, isSuccess: airdropSuccess } = useScaffoldContractWrite({
    contractName: "Dropper",
    functionName: "sendETH",
    args: [
      recipients.map(recipient => recipient.address),
      values
    ],
    value: formatEther(parseUnits(String(totalValues), "ether")),
  });

  const { write: submitFactorySplit, error: factoryError, isSuccess: factorySuccess } = useScaffoldContractWrite({
    contractName: "SplitterFactory",
    functionName: "createSplitter",
    args: [
      recipients.map(recipient => recipient.address),
      values
    ]
  })

  const { data: splitters } = useScaffoldContractRead({
    contractName: "SplitterFactory",
    functionName: "getSplitters",
    args: [address],
  })

  useEffect(() => {
    if (airdropSuccess) {
      notification.success("Airdropped your split successfully!");
      setRecipients([]);
    }
  }, [airdropSuccess]);

  useEffect(() => {
    if (factorySuccess) {
      notification.success("Created your permanent split successfully!");
      setRecipients([]);
    }
  }, [factorySuccess]);

  useEffect(() => {
    if (airdropError) notification.error(airdropError.message);
  }, [airdropError]);

  useEffect(() => {
    if (factoryError) notification.error(factoryError.message);
  }, [factoryError]);

  useEffect(() => {
    setNewUserAddress("");
    setNewUserAmount("");
    setRecipients([]);
  }, [splitType])

  const pushRecipient = () => {
    if (!isAddress(newUserAddress.trim()) || !newUserAmount) {
      notification.error("Please enter a valid address and value");
      return;
    };
    setRecipients([...recipients, { address: newUserAddress.trim(), amount: newUserAmount }]);
    setNewUserAddress("");
    setNewUserAmount("");
  }

  const deleteRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  }

  if (!address) return <Landing />;
  return <div className="flex items-center flex-col flex-grow pt-10">
    <Head>
      <title>YEETH!</title>
      <meta name="description" content="YEET your ETH!" />
    </Head>
    <div className="w-3/4">
      <h2 className="text-3xl font-bold text-neutral-100 mb-4">Split Transaction</h2>

      <div className="flex flex-row space-x-4 mb-8">
        <div className="flex-auto w-[40%] bg-accent rounded-2xl p-10">
          <h1 className="font-bold text-4xl">{splitType} Split Info</h1>
          <div className="mb-2">
            <label className="text-xl w-1/6">
              Split Type
            </label>
            <LargeSwitch
              selected={splitType}
              setSelected={setSplitType}
              options={SPLIT_TYPES}
            />
          </div>
          <div className="mb-4">
            <label className="text-2xl w-1/6">
              Total Split {splitType === "One-Time" ? "Amount" : "Proportion"}
            </label>
            {/* TODO: Extract this component. */}
            {splitType === "One-Time"
              ? <EtherInput
                value={String(totalValues)}
                onChange={() => { }}
              />
              : <IntegerInput
                value={String(totalValues)}
                onChange={() => { }}
              />
            }
          </div>
          <button
            disabled={recipients.length <= 0}
            className="btn w-full text-2xl"
            onClick={() => splitType === 'One-Time' ? submitAirdropSplit() : submitFactorySplit()}
          >
            YEET THIS SPLIT
          </button>
        </div>

        <div className="flex-auto w-[40%] bg-accent rounded-2xl p-10">
          <h2 className="font-bold text-3xl">Add a Recipient:</h2>
          <div className="mb-2">
            <label className="text-2xl w-1/6">
              Address
            </label>
            <AddressInput
              value={newUserAddress}
              onChange={setNewUserAddress}
            />
          </div>
          <div className="mb-4">
            <label className="text-2xl w-1/6">
              {splitType === "One-Time" ? `Amount (${balance?.symbol ?? 'ETH'})` : "Proportion"}
            </label>
            {splitType === "One-Time"
              ? <EtherInput
                value={newUserAmount}
                onChange={setNewUserAmount}
              />
              : <IntegerInput
                value={newUserAmount}
                onChange={val => typeof val === 'string' ? setNewUserAmount(val) : setNewUserAmount(formatUnits(val))}
              />
            }
          </div>
          <button className="btn" onClick={pushRecipient}>Add Recipient</button>
        </div>
      </div>

      {recipients.length > 0 && <>
        <h3 className="text-3xl font-bold text-neutral-100 mb-4">Recipients</h3>
        <div className="flex flex-col justify-end	space-y-4 border-accent border-2 rounded-2xl p-10">
          {recipients.map((recipient, index) => (
            <div className="bg-accent rounded-2xl p-10 space-x-4 flex flex-row content-between items-center">
              <Address
                format="long"
                address={recipient.address}
              />
              <span className="ml-auto w-1/16">
                {splitType === "One-Time"
                  ? <EtherInput
                    value={recipient.amount}
                    onChange={() => { }}
                  />
                  : <span>
                    {recipient.amount} (~{Math.floor(parseFloat(recipient.amount) / totalValues * 100)}%)
                  </span>
                }
              </span>
              {/* TODO: This is a hack. Investigate proper CSS. */}
              <span className="flex-grow" />
              <button
                key={`${recipient.address}-${index}`}
                className="self-end btn btn-accent py-0"
                onClick={() => deleteRecipient(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </>}

      {splitType === "Reoccurring" && splitters && splitters.length > 0 && <>
        <h3 className="text-3xl font-bold text-neutral-100 mb-4">Active Splitters</h3>
        <div className="flex flex-col justify-end	space-y-4 border-accent border-2 rounded-2xl p-10">
          {splitters.map((splitter) => {
            return <div className="bg-accent rounded-2xl p-10 space-x-4 flex flex-row content-between items-center">
              <Address
                format="long"
                address={splitter}
              />
            </div>
          })}
        </div>

      </>}
    </div>
  </div >
};

export default Home;
