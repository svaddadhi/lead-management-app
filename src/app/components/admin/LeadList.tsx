"use client";

import React, { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/lib/types";
import LeadItem from "./LeadItem";
import Button from "@/app/components/ui/Button";

type StatusFilter = "ALL" | LeadStatus;

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("There was an error loading leads. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update lead status");
      }

      // Update the local state with the updated lead
      const updatedLead = await response.json();
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id ? updatedLead : lead))
      );
    } catch (err) {
      console.error("Error updating lead status:", err);
      alert("Failed to update lead status. Please try again.");
    }
  };

  // Filter leads based on selected status
  const filteredLeads =
    statusFilter === "ALL"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  // Count leads by status for the status tabs
  const leadCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      acc.ALL = acc.ALL + 1;
      return acc;
    },
    {
      ALL: 0,
      PENDING: 0,
      REACHED_OUT: 0,
      QUALIFIED: 0,
      NOT_QUALIFIED: 0,
    } as Record<StatusFilter, number>
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-gray-600">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-4">{error}</p>
        <Button onClick={fetchLeads}>Try Again</Button>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No leads found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no leads in the system yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Status filter tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
          {(
            [
              "ALL",
              "PENDING",
              "REACHED_OUT",
              "QUALIFIED",
              "NOT_QUALIFIED",
            ] as const
          ).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
                whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm
                ${
                  statusFilter === status
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {status === "ALL"
                ? "All Leads"
                : status === "PENDING"
                ? "Pending"
                : status === "REACHED_OUT"
                ? "Reached Out"
                : status === "QUALIFIED"
                ? "Qualified"
                : "Not Qualified"}
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {leadCounts[status]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Leads list */}
      <div>
        {filteredLeads.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500">No leads match the selected filter.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <LeadItem
              key={lead.id}
              lead={lead}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
