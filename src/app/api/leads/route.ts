import { NextRequest, NextResponse } from "next/server";
import { createLead, getAllLeads, updateLeadStatus } from "@/mock/leads";
import { LeadStatus } from "@/lib/types";

// GET /api/leads - Get all leads
export async function GET(_request: NextRequest) {
  try {
    const leads = getAllLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newLead = createLead(data);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// PATCH /api/leads?id={leadId} - Update a lead status
export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const { status } = data;

    if (
      !status ||
      !["PENDING", "REACHED_OUT", "QUALIFIED", "NOT_QUALIFIED"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Valid status is required" },
        { status: 400 }
      );
    }

    const updatedLead = updateLeadStatus(id, status as LeadStatus);

    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead status" },
      { status: 500 }
    );
  }
}
