'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen gradient-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
        <button
          className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
} 