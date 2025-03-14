"use client";

import React, { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/lib/types";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Button from "@/app/components/ui/Button";

type StatusFilter = "ALL" | LeadStatus;

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, _setStatusFilter] = useState<StatusFilter>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLeads();

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll('[id^="status-dropdown-"]');
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target as Node)) {
          (dropdown as HTMLElement).classList.add("hidden");
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

      const updatedLead = await response.json();
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id ? updatedLead : lead))
      );
    } catch (err) {
      console.error("Error updating lead status:", err);
      alert("Failed to update lead status. Please try again.");
    }
  };

  // Filter leads based on status filter and search term
  const filteredLeads = leads
    .filter((lead) => statusFilter === "ALL" || lead.status === statusFilter)
    .filter((lead) => {
      if (!searchTerm) return true;
      const searchTermLower = searchTerm.toLowerCase();
      return (
        lead.firstName.toLowerCase().includes(searchTermLower) ||
        lead.lastName.toLowerCase().includes(searchTermLower) ||
        lead.email.toLowerCase().includes(searchTermLower)
      );
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
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
      <div className="bg-white rounded-lg p-8 text-center border">
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
    <div className="w-full max-w-full overflow-hidden">
      {/* Search and Filter Area */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            className="form-input pl-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm === "" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Leads Table - Mobile/Desktop Responsive */}
      <div className="bg-white rounded-md shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-3">
                  Name <span className="text-gray-400">↓</span>
                </th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">
                  Submitted <span className="text-gray-400">↓</span>
                </th>
                <th className="px-4 sm:px-6 py-3">
                  Status <span className="text-gray-400">↓</span>
                </th>
                <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                  Summary <span className="text-gray-400">↓</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-none">
                      {lead.email}
                    </div>
                    {/* Mobile-only date display */}
                    <div className="text-xs text-gray-500 md:hidden mt-1">
                      {formatDate(lead.createdAt)}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-500">
                      {formatDate(lead.createdAt)}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusBadge status={lead.status} />
                      <div className="ml-2 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const dropdown = document.getElementById(
                              `status-dropdown-${lead.id}`
                            );

                            // Check if dropdown should appear above instead of below
                            if (dropdown) {
                              const buttonRect =
                                e.currentTarget.getBoundingClientRect();
                              const spaceBelow =
                                window.innerHeight - buttonRect.bottom;
                              const dropdownHeight = 40 * 3; // Approximate height based on number of items

                              if (spaceBelow < dropdownHeight) {
                                dropdown.classList.add("dropdown-above");
                                dropdown.style.bottom = "100%";
                                dropdown.style.top = "auto";
                                dropdown.style.marginTop = "0";
                                dropdown.style.marginBottom = "0.25rem";
                              } else {
                                dropdown.classList.remove("dropdown-above");
                                dropdown.style.top = "100%";
                                dropdown.style.bottom = "auto";
                                dropdown.style.marginBottom = "0";
                                dropdown.style.marginTop = "0.25rem";
                              }

                              dropdown.classList.toggle("hidden");
                            }
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div
                          id={`status-dropdown-${lead.id}`}
                          className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 hidden"
                        >
                          {[
                            "PENDING",
                            "REACHED_OUT",
                            "QUALIFIED",
                            "NOT_QUALIFIED",
                          ]
                            .filter((status) => status !== lead.status)
                            .map((status) => (
                              <button
                                key={status}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(
                                    lead.id,
                                    status as LeadStatus
                                  );
                                  document
                                    .getElementById(
                                      `status-dropdown-${lead.id}`
                                    )
                                    ?.classList.add("hidden");
                                }}
                              >
                                Mark as{" "}
                                {status === "PENDING"
                                  ? "Pending"
                                  : status === "REACHED_OUT"
                                  ? "Reached Out"
                                  : status === "QUALIFIED"
                                  ? "Qualified"
                                  : "Not Qualified"}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* Mobile-only summary */}
                    <div className="text-xs text-gray-500 sm:hidden mt-1 truncate max-w-[200px]">
                      {lead.summary || "No summary provided"}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-800 max-w-xs">
                      {lead.summary || "No summary provided"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-4 border-t border-gray-200">
            <div>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap items-center space-x-1 sm:space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 sm:px-3 py-1 rounded-md text-sm ${
                      currentPage === pageNum ? "bg-gray-200" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <div>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1 rounded-md disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
