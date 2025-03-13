import { Lead, LeadFormData, LeadStatus } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

// In-memory storage for leads
let leads: Lead[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    linkedinProfile: "https://linkedin.com/in/johndoe",
    visasOfInterest: ["H-1B", "L-1"],
    resumeUrl: "/uploads/resume-john-doe.pdf",
    additionalInfo: "Looking for opportunities in the tech industry",
    status: "PENDING",
    createdAt: new Date("2025-01-15T08:30:00"),
    updatedAt: new Date("2025-01-15T08:30:00"),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    linkedinProfile: "https://linkedin.com/in/janesmith",
    visasOfInterest: ["EB-2", "EB-3"],
    resumeUrl: "/uploads/resume-jane-smith.pdf",
    additionalInfo: "5 years of experience in healthcare",
    status: "REACHED_OUT",
    createdAt: new Date("2025-02-10T14:45:00"),
    updatedAt: new Date("2025-02-12T09:20:00"),
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    linkedinProfile: "https://linkedin.com/in/michaelj",
    visasOfInterest: ["O-1", "EB-1"],
    resumeUrl: "/uploads/resume-michael-johnson.pdf",
    additionalInfo: "Award-winning researcher in AI",
    status: "PENDING",
    createdAt: new Date("2025-03-05T11:15:00"),
    updatedAt: new Date("2025-03-05T11:15:00"),
  },
];

export function getAllLeads(): Lead[] {
  return [...leads].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((lead) => lead.id === id);
}

export function createLead(leadData: LeadFormData): Lead {
  const now = new Date();
  const newLead: Lead = {
    id: uuidv4(),
    ...leadData,
    resumeUrl: leadData.resume ? `/uploads/${leadData.resume.name}` : undefined,
    status: "PENDING" as LeadStatus,
    createdAt: now,
    updatedAt: now,
  };

  leads = [newLead, ...leads];
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead | null {
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;

  const updatedLead = {
    ...leads[index],
    status,
    updatedAt: new Date(),
  };

  leads[index] = updatedLead;
  return updatedLead;
}
