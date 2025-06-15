"use client";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "@/components/Loading";
import { Purchase } from "@/@types/purchase";
import { Pagination as PaginationType } from "@/@types/pagination";
import { numberToBRL } from "@/utils/currency";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Purchases = () => {
  const { fetchPrivate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [purchases, setPurchases] = useState<PaginationType<Purchase>>();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPurchases = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      const response = await fetchPrivate<PaginationType<Purchase>>(
        `purchases/pagination?take=2&page=${page}`,
        {}
      );
      if (response.success) {
        setPurchases(response.data);
        setTotalPages(response.data.meta.lastPage);
      }
      setIsLoading(false);
    },
    [fetchPrivate, setIsLoading]
  );

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  useEffect(() => {
    if (currentPage) {
      fetchPurchases(currentPage);
    }
  }, [currentPage, fetchPurchases]);

  const lastPage = currentPage === totalPages;
  const firstPage = currentPage === 1;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1 md:p-4 max-w-4xl mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>Ebook</th>
            <th>Valor</th>
            <th>Taxa</th>
            <th>Valor líquido</th>
          </tr>
        </thead>
        <tbody>
          {purchases?.data?.map((purchase, index) => {
            const value = purchase.ebook?.value
              ? Number(purchase.ebook?.value)
              : 0;
            const fee = purchase.application_fee
              ? Number(purchase.application_fee)
              : 0;
            const netValue = value - fee;

            return (
              <tr key={index}>
                <td>{purchase.ebook?.title}</td>
                <td>{numberToBRL(value)}</td>
                <td>{numberToBRL(fee)}</td>
                <td>{numberToBRL(netValue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination className="![&_li]:cursor-pointer">
        <PaginationContent className="list-none p-0 [&_a]:cursor-pointer [&_a]:hover:bg-amber-200">
          <PaginationItem>
            <PaginationPrevious
              className={`${firstPage ? "opacity-50" : ""}`}
              onClick={() => {
                if (!firstPage) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={`${firstPage ? "border-2" : ""}`}
              onClick={() => {
                if (!firstPage) {
                  setCurrentPage(1);
                }
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage && (
            <Fragment>
              {currentPage !== 1 && currentPage != totalPages && (
                <PaginationItem>
                  <PaginationLink className="border-2">
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}
            </Fragment>
          )}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                className={`${lastPage ? "border-2" : ""}`}
                onClick={() => {
                  if (!lastPage) {
                    setCurrentPage(totalPages);
                  }
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              className={`${lastPage ? "opacity-50" : ""}`}
              onClick={() => {
                if (!lastPage) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Purchases;
