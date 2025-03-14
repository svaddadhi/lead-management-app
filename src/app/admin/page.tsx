import React from "react";
import LeadList from "@/app/components/admin/LeadList";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
      </div>

      <LeadList />
    </div>
  );
}
