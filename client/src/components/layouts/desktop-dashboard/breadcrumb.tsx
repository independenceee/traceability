import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { shortenString } from "@/utils";
import { usePathname } from "next/navigation";
import React from "react";

export function BreadcrumbDashboard() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Bỏ qua "dashboard" từ segments
  const filteredSegments = segments.slice(1);

  // Hàm viết hoa chữ cái đầu tiên
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Bắt đầu từ Dashboard */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separator sau Dashboard */}
        {filteredSegments.length > 0 && <BreadcrumbSeparator />}

        {filteredSegments.map((segment, index) => {
          const isLast = index === filteredSegments.length - 1;
          const path = `/dashboard/${filteredSegments.slice(0, index + 1).join("/")}`;
          const segmentTruncated = shortenString(segment, 7);
          const segmentCapitalized = capitalizeFirstLetter(segmentTruncated);

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {isLast ? <BreadcrumbPage>{segmentCapitalized}</BreadcrumbPage> : <BreadcrumbLink href={path}>{segmentCapitalized}</BreadcrumbLink>}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
