export default function Loading() {
  return (
    <section id="event">
      <div className="header">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2" />
      </div>
      <div className="details">
        <div className="content">
          <div className="banner bg-gray-200 dark:bg-gray-800 rounded animate-pulse aspect-video" />
          <div className="flex-col-gap-2 mt-8">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-2" />
          </div>
        </div>
        <aside className="booking">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </aside>
      </div>
    </section>
  );
}
