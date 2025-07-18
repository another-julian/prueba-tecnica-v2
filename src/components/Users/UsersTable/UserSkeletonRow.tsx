export default function UserSkeletonRow() {
  return (
    <tr className="border-b border-gray-100  animate-pulse">
      <td className="w-4">
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-20" />
      </td>
    </tr>
  );
}
