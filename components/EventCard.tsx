"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  priority?: boolean;
}

const EventCard = ({title, image, slug, location, date, time, priority = false}: Props) => {
  const handleClick = () => {
    posthog.capture("event_card_clicked", {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  };

  return (
    <Link href={`/events/${slug}`} id="event-card" onClick={handleClick}>
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="poster"
          priority={priority}
          style={{width: '100%', height: 'auto'}}
        />
        <div className="flex flex-row gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/pin.svg" alt="location" width={14} height={14} />
            <p>{location}</p>
        </div>
        <p className="title">{title}</p>
        <div className="datetime">
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/calendar.svg" alt="date" width={14} height={14} />
                <p>{date}</p>
            </div>
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/clock.svg" alt="time" width={14} height={14} />
                <p>{time}</p>
            </div>
        </div>
    </Link>
  )
}

export default EventCard