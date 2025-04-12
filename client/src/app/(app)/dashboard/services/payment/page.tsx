"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "@/services/database/service";
import Loading from "@/components/loading";
import Title from "@/components/title";
import Subscription from "@/components/subcription";

export default function PaymentPage() {
  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["getAllServices"],
    queryFn: getAllServices,
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

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <Title title="Service Plan" description="The driving force behind our success" />
        <section className="grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg max-lg:grid-cols-2 max-sm:grid-cols-1">
          {servicesData?.data?.map((service) => <Subscription key={service.id} service={service} />)}
        </section>
      </div>
    </div>
  );
}
