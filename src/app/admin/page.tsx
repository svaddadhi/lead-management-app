import React from "react";
import LeadList from "@/app/components/admin/LeadList";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Lead Management Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage all submitted leads
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Lead Submissions
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update lead status as you progress through the outreach process
          </p>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <LeadList />
        </div>
      </div>
    </div>
  );
}
