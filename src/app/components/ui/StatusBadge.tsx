import React from "react";
import { LeadStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: LeadStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Pending",
    },
    REACHED_OUT: {
      color: "bg-blue-100 text-blue-800",
      label: "Reached Out",
    },
    QUALIFIED: {
      color: "bg-green-100 text-green-800",
      label: "Qualified",
    },
    NOT_QUALIFIED: {
      color: "bg-gray-100 text-gray-800",
      label: "Not Qualified",
    },
  };

  const { color, label } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}
