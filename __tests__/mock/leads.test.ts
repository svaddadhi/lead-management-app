import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLeadStatus,
} from "@/mock/leads";
import { LeadFormData } from "@/lib/types";

describe("Lead data management", () => {
  test("getAllLeads returns leads sorted by creation date", () => {
    const leads = getAllLeads();
    expect(leads.length).toBeGreaterThan(0);

    // Check if sorted by createdAt (descending)
    for (let i = 0; i < leads.length - 1; i++) {
      expect(leads[i].createdAt.getTime()).toBeGreaterThanOrEqual(
        leads[i + 1].createdAt.getTime()
      );
    }
  });

  test("getLeadById returns the correct lead", () => {
    const leads = getAllLeads();
    const leadId = leads[0].id;

    const lead = getLeadById(leadId);
    expect(lead).toBeDefined();
    expect(lead?.id).toBe(leadId);
  });

  test("getLeadById returns undefined for non-existent ID", () => {
    const lead = getLeadById("non-existent-id");
    expect(lead).toBeUndefined();
  });

  test("createLead adds a new lead with correct data", () => {
    const initialLeadCount = getAllLeads().length;

    const newLeadData: LeadFormData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      linkedinProfile: "https://linkedin.com/in/testuser",
      visasOfInterest: ["H-1B"],
      additionalInfo: "Test info",
    };

    const newLead = createLead(newLeadData);

    // Check lead was created with correct data
    expect(newLead.id).toBeDefined();
    expect(newLead.firstName).toBe(newLeadData.firstName);
    expect(newLead.lastName).toBe(newLeadData.lastName);
    expect(newLead.status).toBe("PENDING");

    // Check lead was added to the collection
    const updatedLeads = getAllLeads();
    expect(updatedLeads.length).toBe(initialLeadCount + 1);
    expect(updatedLeads[0].id).toBe(newLead.id); // Should be at the top (newest)
  });

  test("updateLeadStatus changes lead status", () => {
    const leads = getAllLeads();
    const leadId = leads[0].id;
    const initialStatus = leads[0].status;
    const newStatus = initialStatus === "PENDING" ? "REACHED_OUT" : "PENDING";

    const updatedLead = updateLeadStatus(leadId, newStatus);

    expect(updatedLead).not.toBeNull();
    expect(updatedLead?.id).toBe(leadId);
    expect(updatedLead?.status).toBe(newStatus);

    // Verify the actual data was updated
    const lead = getLeadById(leadId);
    expect(lead?.status).toBe(newStatus);
  });

  test("updateLeadStatus returns null for non-existent ID", () => {
    const result = updateLeadStatus("non-existent-id", "QUALIFIED");
    expect(result).toBeNull();
  });
});
