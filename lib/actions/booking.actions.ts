"use server";

import connectToDatabase from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();

    // Booking model only needs eventId and email (slug is not needed)
    await Booking.create({ eventId, email });

    return { success: true};
  } catch (error) {
    console.error("Error creating booking:", error);

    // Handle duplicate booking error
    if (error instanceof Error && error.message.includes("duplicate")) {
      return { success: false, error: "You have already booked this event" };
    }

    return { success: false, error: "Failed to create booking. Please try again later." };
  }
};