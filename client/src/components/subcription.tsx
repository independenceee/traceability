import { Service } from "@prisma/client";
import { Button } from "./ui/button";
import { createOrRenewSubscriptionWithPayment } from "@/services/database/payment"; // Import hàm createPayment
import { toast } from "@/hooks/use-toast"; // Import toast để hiển thị thông báo
import { useWallet } from "@/hooks/use-wallet";
import { decialPlace } from "@/constants";
import { payment } from "@/services/contract/payment";

export default function Subscription({ service }: { service: Service }) {
  const { browserWallet, address } = useWallet();
  const handlePayment = async () => {
    try {
      const createPaymentUnsignedTx = await payment({
        address: address as string,
        amount: String(service.price * decialPlace),
      });

      const signedTx = await browserWallet?.signTx(createPaymentUnsignedTx.data as string, true);
      const txHash = await browserWallet?.submitTx(signedTx as string);
      const response = await createOrRenewSubscriptionWithPayment({
        servicePlanId: service.id,
        amount: service.price,
        txHash: txHash as string,
      });

      if (response.result) {
        toast({
          title: "Success",
          description: "Payment processed successfully!",
          variant: "default",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-300 bg-slate-900 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{service.name}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{service.description}</p>
      <div className="flex items-baseline justify-center my-8">
        <span className="mr-2 text-5xl font-extrabold">₳{service.price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>

      <ul className="mb-8 space-y-4 text-left">
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Individual configuration</span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>No setup, or hidden fees</span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>
            Premium support: <span className="font-semibold">{service.duration} months</span>
          </span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>
            Free updates: <span className="font-semibold">6 months</span>
          </span>
        </li>
      </ul>
      <Button
        onClick={handlePayment}
        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-purple-900"
      >
        Get started
      </Button>
    </div>
  );
}
