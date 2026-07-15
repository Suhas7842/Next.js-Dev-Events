import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Booking Document Interface
 * Extends Mongoose Document with Booking-specific fields
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 */
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email: string): boolean {
          // Email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook for event reference validation
 * Verifies that the referenced event exists in the database
 * Prevents orphaned bookings by throwing an error if event is not found
 */
bookingSchema.pre("save", async function () {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified("eventId")) {
    // Check if Event model exists to prevent circular dependency issues
    const Event = mongoose.models.Event;

    if (!Event) {
      throw new Error("Event model is not registered");
    }

    // Verify that the event exists
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(
        `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
      );
    }
  }
});

/**
 * Compound index for efficient queries
 * Allows fast lookups of bookings by event and prevents duplicate bookings
 */
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Booking Model
 * Use existing model if available (prevents OverwriteModelError in development)
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
