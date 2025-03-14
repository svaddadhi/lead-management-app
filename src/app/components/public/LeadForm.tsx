"use client";

import React, { useState } from "react";
import FormField from "@/app/components/ui/FormField";
import MultiSelect from "@/app/components/ui/MultiSelect";
import FileUpload from "@/app/components/ui/FileUploader";
import Button from "@/app/components/ui/Button";
import { LeadFormData, VISA_OPTIONS, VisaType } from "@/lib/types";
import { validateLeadForm, isFormValid } from "@/lib/validation";
import Image from "next/image";

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
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Thank You</h2>
        <p className="text-gray-600 mb-6">
          Your information was submitted to our team of immigration
          <br />
          attorneys. Expect an email from hello@tryalma.ai.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="secondary"
        >
          Go Back to Homepage
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center md:text-left">
        <div className="flex justify-center md:justify-start mb-4">
          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">
          Want to understand your visa options?
        </h2>
        <p className="text-gray-600">
          Submit the form below and our team of experienced attorneys will
          <br />
          review your information and send a preliminary assessment of your
          <br />
          case based on your goals.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        suppressHydrationWarning
      >
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.form}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          label="LinkedIn / Personal Website URL"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedinProfile || ""}
          onChange={handleInputChange}
          error={errors.linkedinProfile}
          required
        />

        <div className="mb-6">
          <h3 className="font-medium mb-4">Visa categories of interest?</h3>
          <div className="space-y-3">
            {VISA_OPTIONS.map((visa) => (
              <div key={visa} className="flex items-center">
                <input
                  id={`visa-${visa}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={formData.visasOfInterest?.includes(visa) || false}
                  onChange={() => {
                    const current = formData.visasOfInterest || [];
                    const newVisas = current.includes(visa)
                      ? current.filter((v) => v !== visa)
                      : [...current, visa];

                    handleVisaSelect(newVisas);
                  }}
                />
                <label
                  htmlFor={`visa-${visa}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {visa}
                </label>
              </div>
            ))}
            {errors.visasOfInterest && (
              <p className="mt-1 text-sm text-red-600">
                {errors.visasOfInterest}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Resume/CV</h3>
          <FileUpload
            id="resume"
            label=""
            onChange={handleFileChange}
            error={errors.resume}
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">How can we help you?</h3>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            className="form-input"
            placeholder="Tell us about your background and goals..."
            value={formData.additionalInfo || ""}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <Button type="submit" isLoading={isLoading} fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
}
