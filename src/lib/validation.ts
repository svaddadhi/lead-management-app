import { LeadFormData, VisaType } from "./types";

type ValidationError = {
  [K in keyof LeadFormData]?: string;
};

export function validateLeadForm(data: Partial<LeadFormData>): ValidationError {
  const errors: ValidationError = {};

  // First Name validation
  if (!data.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  // Last Name validation
  if (!data.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // LinkedIn Profile validation
  if (!data.linkedinProfile?.trim()) {
    errors.linkedinProfile = "LinkedIn profile is required";
  } else if (!data.linkedinProfile.includes("linkedin.com/")) {
    errors.linkedinProfile = "Please enter a valid LinkedIn URL";
  }

  // Visas of Interest validation
  if (!data.visasOfInterest || data.visasOfInterest.length === 0) {
    errors.visasOfInterest = "Please select at least one visa type";
  }

  // Resume validation (only if a resume is provided)
  if (data.resume) {
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

    if (!allowedFileTypes.includes(data.resume.type)) {
      errors.resume = "Please upload a PDF or Word document";
    } else if (data.resume.size > maxSizeInBytes) {
      errors.resume = "File size must be less than 5 MB";
    }
  }

  return errors;
}

export function isFormValid(errors: ValidationError): boolean {
  return Object.keys(errors).length === 0;
}
