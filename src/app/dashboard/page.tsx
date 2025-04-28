"use client";

import { Button } from "@/components/ui/button";
import isAuth from "@/hoc/isAuth";
import { redirect } from "next/navigation";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => redirect("dashboard/ebooks/create")}>
          Criar Ebook
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-lg mt-4">Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default isAuth(Dashboard);
