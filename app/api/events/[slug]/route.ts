import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Event } from "@/database";
import type { IEvent } from "@/database";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 *
 * @param request - Next.js request object (unused but required by route signature)
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    // Await params to get the slug (Next.js 15+ requirement)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Slug parameter is required and must be a string",
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, no special characters)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug
    const event: IEvent | null = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with slug "${slug}" not found`,
        },
        { status: 404 }
      );
    }

    // Return success response with event data
    return NextResponse.json(
      {
        success: true,
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle MongoDB/Mongoose specific errors
    if (error instanceof Error) {
      // Mongoose validation error
      if (error.name === "ValidationError") {
        return NextResponse.json(
          {
            success: false,
            message: "Validation error occurred",
            error: error.message,
          },
          { status: 400 }
        );
      }

      // MongoDB connection error
      if (error.name === "MongoNetworkError") {
        return NextResponse.json(
          {
            success: false,
            message: "Database connection error",
          },
          { status: 503 }
        );
      }

      // Generic error with message
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch event",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Unknown error type
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
