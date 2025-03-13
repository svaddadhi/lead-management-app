import React, { useState } from "react";
import { Lead, LeadStatus } from "@/lib/types";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Button from "@/app/components/ui/Button";

interface LeadItemProps {
  lead: Lead;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export default function LeadItem({ lead, onStatusChange }: LeadItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: LeadStatus) => {
    setIsUpdating(true);
    await onStatusChange(lead.id, status);
    setIsUpdating(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-4 border border-gray-200">
      {/* Lead summary */}
      <div className="px-4 py-4 sm:px-6 flex flex-wrap items-center justify-between">
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {lead.firstName} {lead.lastName}
          </h3>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-4">
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {lead.email}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {formatDate(lead.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center mt-2 sm:mt-0 flex-wrap">
          <StatusBadge status={lead.status} />
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            {expanded ? "Hide details" : "View details"}
            <svg
              className={`ml-1 h-5 w-5 transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  LinkedIn Profile
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a
                    href={lead.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {lead.linkedinProfile}
                  </a>
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Visas of Interest
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {lead.visasOfInterest.map((visa) => (
                      <span
                        key={visa}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {visa}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>

              {lead.resumeUrl && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Resume</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={lead.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download Resume
                    </a>
                  </dd>
                </div>
              )}

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(lead.updatedAt)}
                </dd>
              </div>

              {lead.additionalInfo && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Additional Information
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {lead.additionalInfo}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Status update actions */}
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-gray-500">
                Update status:
              </p>
              <div className="flex flex-wrap gap-2">
                {lead.status !== "REACHED_OUT" && (
                  <Button
                    size="sm"
                    variant={lead.status === "PENDING" ? "primary" : "outline"}
                    onClick={() => handleStatusChange("REACHED_OUT")}
                    isLoading={isUpdating}
                    disabled={isUpdating}
                  >
                    Mark as Reached Out
                  </Button>
                )}

                {lead.status !== "QUALIFIED" && (
                  <Button
                    size="sm"
                    variant={
                      lead.status === "REACHED_OUT" ? "primary" : "outline"
                    }
                    onClick={() => handleStatusChange("QUALIFIED")}
                    isLoading={isUpdating}
                    disabled={isUpdating}
                  >
                    Mark as Qualified
                  </Button>
                )}

                {lead.status !== "NOT_QUALIFIED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange("NOT_QUALIFIED")}
                    isLoading={isUpdating}
                    disabled={isUpdating}
                  >
                    Mark as Not Qualified
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
