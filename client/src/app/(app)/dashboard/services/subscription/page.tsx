"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import Title from "@/components/title";
import Subscription from "@/components/subcription";
import { getUserSubscriptions } from "@/services/database/subscription";
import { Card, CardTitle } from "@/components/ui/card";

export default function SubscriptionPage() {
  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["getUserSubscriptions"],
    queryFn: getUserSubscriptions,
  });

  if (isLoading) {
    return (
      <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
        <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5 flex items-center justify-center h-full w-full">
          <Loading />
        </div>
      </div>
    );
  }

  if (!servicesData?.data?.length) {
    return (
      <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
        <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5 flex items-center justify-center h-full w-full">
          <p className="text-gray-500">You have no subscriptions.</p>
        </div>
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mostExpensiveService = servicesData.data.reduce((prev: any, current: any) => {
    return current.service.price > prev.service.price ? current : prev;
  });

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <Title title="Subscriptions" description="Manage your subscriptions and services" />
        <section className="flex content-start justify-stretch gap-8 rounded-lg">
          <div className="flex-[1]">
            <Subscription service={mostExpensiveService.service} />
          </div>
          <div className="flex-[2]">
            <Card className="h-full p-4">
              <CardTitle className="text-2xl font-semibold">Service List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto mt-4">
                <table className="w-full border-collapse border">
                  <thead className="">
                    <tr>
                      <th className="border px-4 py-2 text-left">Service Name</th>
                      <th className="border px-4 py-2 text-left">Start Date</th>
                      <th className="border px-4 py-2 text-left">End Date</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {servicesData.data.map((subscription: any) => (
                      <tr key={subscription.id}>
                        <td className="border px-4 py-2">{subscription.service.name}</td>
                        <td className="border px-4 py-2">{new Date(subscription.startDate).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">{new Date(subscription.endDate).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">
                          <span className={`${subscription.status === "active" ? "text-green-300" : "text-red-500"} font-semibold`}>
                            {subscription.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
