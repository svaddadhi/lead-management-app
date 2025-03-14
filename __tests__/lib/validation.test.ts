import { validateLeadForm, isFormValid } from "@/lib/validation";
import { LeadFormData } from "@/lib/types";

describe("Lead Form Validation", () => {
  test("validates required fields", () => {
    const data: Partial<LeadFormData> = {
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      visasOfInterest: ["H-1B"],
    };

    const errors = validateLeadForm(data);
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeUndefined();
  });

  test("validates email format", () => {
    const data: Partial<LeadFormData> = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      visasOfInterest: ["H-1B"],
    };

    const errors = validateLeadForm(data);
    expect(errors.email).toBeDefined();

    data.email = "john@example.com";
    const updatedErrors = validateLeadForm(data);
    expect(updatedErrors.email).toBeUndefined();
  });

  test("validates LinkedIn URL", () => {
    const data: Partial<LeadFormData> = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      linkedinProfile: "https://google.com",
      visasOfInterest: ["H-1B"],
    };

    const errors = validateLeadForm(data);
    expect(errors.linkedinProfile).toBeDefined();

    data.linkedinProfile = "https://linkedin.com/in/johndoe";
    const updatedErrors = validateLeadForm(data);
    expect(updatedErrors.linkedinProfile).toBeUndefined();
  });

  test("validates visa selection", () => {
    const data: Partial<LeadFormData> = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      visasOfInterest: [],
    };

    const errors = validateLeadForm(data);
    expect(errors.visasOfInterest).toBeDefined();

    data.visasOfInterest = ["H-1B"];
    const updatedErrors = validateLeadForm(data);
    expect(updatedErrors.visasOfInterest).toBeUndefined();
  });

  test("validates resume file type", () => {
    const pdfFile = new File(["sample"], "sample.pdf", {
      type: "application/pdf",
    });
    const textFile = new File(["sample"], "sample.txt", { type: "text/plain" });

    const data: Partial<LeadFormData> = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      visasOfInterest: ["H-1B"],
      resume: textFile,
    };

    const errors = validateLeadForm(data);
    expect(errors.resume).toBeDefined();

    data.resume = pdfFile;
    const updatedErrors = validateLeadForm(data);
    expect(updatedErrors.resume).toBeUndefined();
  });

  test("isFormValid returns true when no errors exist", () => {
    const errors = {};
    expect(isFormValid(errors)).toBe(true);

    const errorsWithContent = { email: "Invalid email" };
    expect(isFormValid(errorsWithContent)).toBe(false);
  });
});
