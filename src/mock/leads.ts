import { Lead, LeadFormData, LeadStatus } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

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
    summary:
      "Tech professional with interest in H-1B visa. Has relevant experience and good qualifications for tech sector positions.",
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
    summary:
      "Distinguished AI researcher with multiple awards, strong candidate for O-1 visa based on extraordinary ability credentials.",
    status: "PENDING",
    createdAt: new Date("2025-03-05T11:15:00"),
    updatedAt: new Date("2025-03-05T11:15:00"),
  },
  {
    id: "4",
    firstName: "Anna",
    lastName: "Voronova",
    email: "anna.voronova@example.com",
    linkedinProfile: "https://linkedin.com/in/annavoronova",
    visasOfInterest: ["H-1B"],
    additionalInfo: "Senior software engineer with 8 years of experience",
    summary:
      "Experienced software engineer with 8+ years in the field. Strong technical background makes her a good candidate for H-1B.",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "5",
    firstName: "Li",
    lastName: "Zijin",
    email: "li.zijin@example.com",
    linkedinProfile: "https://linkedin.com/in/lizijin",
    visasOfInterest: ["EB-2", "EB-3"],
    resumeUrl: "/uploads/resume-li-zijin.pdf",
    additionalInfo: "Machine learning specialist",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "6",
    firstName: "Mark",
    lastName: "Antonov",
    email: "mark.antonov@example.com",
    linkedinProfile: "https://linkedin.com/in/markantonov",
    visasOfInterest: ["L-1", "EB-3"],
    additionalInfo: "Marketing director with global experience",
    summary:
      "Marketing executive with international experience. Good candidate for L-1 visa due to managerial role in multinational company.",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "7",
    firstName: "Anand",
    lastName: "Jain",
    email: "anand.jain@example.com",
    linkedinProfile: "https://linkedin.com/in/anandjain",
    visasOfInterest: ["EB-5"],
    additionalInfo: "Entrepreneur looking to invest in US startups",
    status: "REACHED_OUT",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "8",
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar.zamir@example.com",
    linkedinProfile: "https://linkedin.com/in/baharzamir",
    visasOfInterest: ["H-1B", "O-1"],
    resumeUrl: "/uploads/resume-bahar-zamir.pdf",
    additionalInfo: "PhD in Computer Science",
    summary:
      "Computer Science PhD with specialized knowledge. Could qualify for both H-1B and potentially O-1 based on academic achievements.",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "9",
    firstName: "Jane",
    lastName: "Ma",
    email: "jane.ma@example.com",
    linkedinProfile: "https://linkedin.com/in/janema",
    visasOfInterest: ["EB-1", "O-1"],
    resumeUrl: "/uploads/resume-jane-ma.pdf",
    additionalInfo: "Professor of Economics",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "10",
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge.ruiz@example.com",
    linkedinProfile: "https://linkedin.com/in/jorgeruiz",
    visasOfInterest: ["H-1B", "L-1"],
    additionalInfo: "Software engineer specializing in fintech",
    summary:
      "Fintech software engineer with specialized expertise. Good profile for H-1B visa in a specialty occupation.",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
  },
  {
    id: "11",
    firstName: "Mary",
    lastName: "Lopez",
    email: "mary.lopez@example.com",
    linkedinProfile: "https://linkedin.com/in/marylopez",
    visasOfInterest: ["EB-2"],
    resumeUrl: "/uploads/resume-mary-lopez.pdf",
    additionalInfo: "Biomedical researcher",
    status: "PENDING",
    createdAt: new Date("2025-02-02T14:45:00"),
    updatedAt: new Date("2025-02-02T14:45:00"),
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
