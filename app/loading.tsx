export default function Loading() {
  return (
    <div className="relative aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
} 