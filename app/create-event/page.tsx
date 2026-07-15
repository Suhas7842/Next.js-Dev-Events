"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Parse tags and agenda as JSON arrays
    const tagsInput = formData.get("tags") as string;
    const agendaInput = formData.get("agenda") as string;

    try {
      // Convert comma-separated strings to JSON arrays
      const tags = JSON.stringify(
        tagsInput.split(",").map((tag) => tag.trim()).filter(Boolean)
      );
      const agenda = JSON.stringify(
        agendaInput.split("\n").map((item) => item.trim()).filter(Boolean)
      );

      formData.set("tags", tags);
      formData.set("agenda", agenda);

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      // Redirect to the newly created event
      if (data.event?.slug) {
        router.push(`/events/${data.event.slug}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="header">
        <h1>Create New Event</h1>
        <p className="mt-2">Fill in the details to create a new event.</p>
      </div>

      <div className="mt-10 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React Summit 2026"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Short Description *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., The biggest React conference of the year"
            />
          </div>

          <div>
            <label htmlFor="overview" className="block text-sm font-medium mb-2">
              Overview *
            </label>
            <textarea
              id="overview"
              name="overview"
              required
              disabled={isSubmitting}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of the event..."
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Event Image *
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">Max 10MB. Formats: JPG, PNG, WebP, GIF</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-2">
                Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm font-medium mb-2">
              Venue *
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Tech Convention Center"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div>
            <label htmlFor="mode" className="block text-sm font-medium mb-2">
              Mode *
            </label>
            <select
              id="mode"
              name="mode"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="audience" className="block text-sm font-medium mb-2">
              Target Audience *
            </label>
            <input
              type="text"
              id="audience"
              name="audience"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Frontend developers, React enthusiasts"
            />
          </div>

          <div>
            <label htmlFor="organizer" className="block text-sm font-medium mb-2">
              Organizer *
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React Community"
            />
          </div>

          <div>
            <label htmlFor="agenda" className="block text-sm font-medium mb-2">
              Agenda * (one item per line)
            </label>
            <textarea
              id="agenda"
              name="agenda"
              required
              disabled={isSubmitting}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="9:00 AM - Registration&#10;10:00 AM - Keynote&#10;11:30 AM - Workshop"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags * (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., react, javascript, frontend, conference"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
