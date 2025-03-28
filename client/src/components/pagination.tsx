"use client";

import React from "react";
import Image from "next/image";
import { paginationIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className={`flex justify-center items-center mt-6 text-white `}>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <Image className="w-2 h-2 object-contain" src={paginationIcon.arrowLeftPagination} alt="First Page" />
        <span className="mx-1">First</span>
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        <Image className="w-2 h-2 object-contain" src={paginationIcon.arrowLeftPagination} alt="Previous Page" />
        <span className="mx-1">Previous</span>
      </Button>
      <span className="text-[16px] font-light leading-8 min-w-[110px] text-center">
        {currentPage} of {totalPages}
      </span>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        <span className="mx-1">Next</span>
        <Image className="w-2 h-2 object-contain" src={paginationIcon.arrowRightPagination} alt="Next Page" />
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        <span className="mx-1">Last</span>
        <Image className="w-2 h-2 object-contain" src={paginationIcon.arrowRightPagination} alt="Last Page" />
      </Button>
    </div>
  );
};

export default Pagination;
