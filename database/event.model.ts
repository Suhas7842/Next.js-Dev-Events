import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

/**
 * Event Document Interface
 * Extends Mongoose Document with Event-specific fields
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event Schema Definition
 */
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
      lowercase: true,
    },
    audience: {
      type: String,
      required: [true, "Target audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook for slug generation and data normalization
 * - Generates URL-friendly slug from title (only if title changed)
 * - Normalizes date to ISO format (YYYY-MM-DD)
 * - Normalizes time to 24-hour format (HH:MM)
 */
eventSchema.pre("save", async function () {
  // Generate slug only if title is new or modified
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Ensure slug uniqueness by appending timestamp if needed
    const existingEvent = await mongoose.models.Event.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    });

    if (existingEvent) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    try {
      const dateObj = new Date(this.date);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }
      this.date = dateObj.toISOString().split("T")[0];
    } catch {
      throw new Error("Date must be a valid date string");
    }
  }

  // Normalize time to consistent format (HH:MM in 24-hour format)
  if (this.isModified("time")) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const time12Regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

    if (timeRegex.test(this.time)) {
      // Already in 24-hour format, ensure HH:MM
      const [hours, minutes] = this.time.split(":");
      this.time = `${hours.padStart(2, "0")}:${minutes}`;
    } else if (time12Regex.test(this.time)) {
      // Convert 12-hour format to 24-hour format
      const match = this.time.match(/^(\d+):(\d+)\s?(AM|PM)$/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3].toUpperCase();

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        this.time = `${hours.toString().padStart(2, "0")}:${minutes}`;
      }
    } else {
      throw new Error("Time must be in HH:MM or HH:MM AM/PM format");
    }
  }
});

/**
 * Event Model
 * Use existing model if available (prevents OverwriteModelError in development)
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;
