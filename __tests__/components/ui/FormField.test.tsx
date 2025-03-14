import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormField from "@/app/components/ui/FormField";

describe("FormField Component", () => {
  test("renders label and input correctly", () => {
    render(<FormField id="name" label="Name" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "name");
  });

  test("shows required indicator when required", () => {
    render(
      <FormField id="name" label="Name" value="" onChange={() => {}} required />
    );

    const label = screen.getByText("Name");
    expect(label.parentElement).toHaveTextContent("*");
  });

  test("shows error message when error is provided", () => {
    render(
      <FormField
        id="email"
        label="Email"
        value="test"
        onChange={() => {}}
        error="Invalid email format"
      />
    );

    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <FormField id="name" label="Name" value="" onChange={handleChange} />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "John Doe" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renders textarea when multiline is true", () => {
    render(
      <FormField
        id="description"
        label="Description"
        value=""
        onChange={() => {}}
        multiline
        rows={4}
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });
});
