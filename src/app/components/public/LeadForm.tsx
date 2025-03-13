"use client";

import React, { useState } from "react";
import FormField from "@/app/components/ui/FormField";
import MultiSelect from "@/app/components/ui/MultiSelect";
import FileUpload from "@/app/components/ui/FileUploader";
import Button from "@/app/components/ui/Button";
import { LeadFormData, VISA_OPTIONS, VisaType } from "@/lib/types";
import { validateLeadForm, isFormValid } from "@/lib/validation";

export default function LeadForm() {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    firstName: "",
    lastName: "",
    email: "",
    linkedinProfile: "",
    visasOfInterest: [],
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleVisaSelect = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      visasOfInterest: selected as VisaType[],
    }));

    if (errors.visasOfInterest) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.visasOfInterest;
        return newErrors;
      });
    }
  };

  const handleFileChange = (file: File | undefined) => {
    setFormData((prev) => ({ ...prev, resume: file }));

    if (errors.resume) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLeadForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        linkedinProfile: "",
        visasOfInterest: [],
        additionalInfo: "",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setErrors({
        form: "There was an error submitting your information. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-8 px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-8 w-8 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Your information has been successfully submitted. Our team will
            contact you shortly.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setIsSubmitted(false)} variant="secondary">
              Submit Another Lead
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="py-6 px-6 bg-blue-600">
        <h2 className="text-xl font-bold text-white">
          Submit Your Information
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Please fill out the form below to get started with your visa process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="py-6 px-6">
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.form}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="First Name"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />

          <FormField
            id="lastName"
            label="Last Name"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
        </div>

        <FormField
          id="email"
          label="Email"
          type="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <FormField
          id="linkedinProfile"
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedinProfile || ""}
          onChange={handleInputChange}
          error={errors.linkedinProfile}
          required
        />

        <MultiSelect
          id="visasOfInterest"
          label="Visas of Interest"
          options={VISA_OPTIONS}
          selected={formData.visasOfInterest || []}
          onChange={handleVisaSelect}
          error={errors.visasOfInterest}
          required
        />

        <FileUpload
          id="resume"
          label="Resume/CV"
          onChange={handleFileChange}
          error={errors.resume}
          required
        />

        <FormField
          id="additionalInfo"
          label="Additional Information"
          value={formData.additionalInfo || ""}
          onChange={handleInputChange}
          multiline
          rows={4}
        />

        <div className="mt-6">
          <Button type="submit" isLoading={isLoading} fullWidth>
            Submit Information
          </Button>
        </div>
      </form>
    </div>
  );
}
