export default function UserSkeletonCard() {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm flex gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200" />

      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}
