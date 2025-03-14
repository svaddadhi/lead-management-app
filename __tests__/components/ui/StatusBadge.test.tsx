import React from "react";
import { render, screen } from "@testing-library/react";
import StatusBadge from "@/app/components/ui/StatusBadge";

describe("StatusBadge Component", () => {
  test("displays correct label for PENDING status", () => {
    render(<StatusBadge status="PENDING" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("displays correct label for REACHED_OUT status", () => {
    render(<StatusBadge status="REACHED_OUT" />);
    expect(screen.getByText("Reached Out")).toBeInTheDocument();
  });

  test("displays correct label for QUALIFIED status", () => {
    render(<StatusBadge status="QUALIFIED" />);
    expect(screen.getByText("Qualified")).toBeInTheDocument();
  });

  test("displays correct label for NOT_QUALIFIED status", () => {
    render(<StatusBadge status="NOT_QUALIFIED" />);
    expect(screen.getByText("Not Qualified")).toBeInTheDocument();
  });

  test("applies correct color classes based on status", () => {
    const { rerender } = render(<StatusBadge status="PENDING" />);
    expect(screen.getByText("Pending")).toHaveClass("bg-yellow-100");
    expect(screen.getByText("Pending")).toHaveClass("text-yellow-800");

    rerender(<StatusBadge status="QUALIFIED" />);
    expect(screen.getByText("Qualified")).toHaveClass("bg-green-100");
    expect(screen.getByText("Qualified")).toHaveClass("text-green-800");
  });
});
