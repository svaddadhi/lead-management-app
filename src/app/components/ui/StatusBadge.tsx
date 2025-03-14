import React from "react";
import { LeadStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: LeadStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      label: "Pending",
      className: "text-yellow-800 bg-yellow-50 border border-yellow-200",
    },
    REACHED_OUT: {
      label: "Reached Out",
      className: "text-blue-800 bg-blue-50 border border-blue-200",
    },
    QUALIFIED: {
      label: "Qualified",
      className: "text-green-800 bg-green-50 border border-green-200",
    },
    NOT_QUALIFIED: {
      label: "Not Qualified",
      className: "text-gray-800 bg-gray-50 border border-gray-200",
    },
  };

  const { label, className } = statusConfig[status];

  return (
    <span
      className={`text-sm font-medium px-2 py-1 rounded-md inline-block w-32 text-center ${className}`}
    >
      {label}
    </span>
  );
}
