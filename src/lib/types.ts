export type VisaType =
  | "H-1B"
  | "L-1"
  | "O-1"
  | "EB-1"
  | "EB-2"
  | "EB-3"
  | "EB-5";

export const VISA_OPTIONS: VisaType[] = [
  "H-1B",
  "L-1",
  "O-1",
  "EB-1",
  "EB-2",
  "EB-3",
  "EB-5",
];

export type LeadStatus =
  | "PENDING"
  | "REACHED_OUT"
  | "QUALIFIED"
  | "NOT_QUALIFIED";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: VisaType[];
  resumeUrl?: string;
  additionalInfo?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: VisaType[];
  resume?: File;
  additionalInfo?: string;
}
