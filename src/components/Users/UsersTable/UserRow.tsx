import type { User } from "../../../lib/definitions";

export default function UserRow({
  user,
  index,
}: {
  user: User;
  index: number;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="">{index + 1}</td>
      <td className="px-4 py-5">
        <div className="flex items-center space-x-3">
          <img
            src={user.image}
            alt={user.firstName}
            className="w-8 h-fit rounded-full object-cover mr-3"
          />
          <div className="flex flex-col font-medium w-fit">
            <span className="text">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-gray-600">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-medium ">{user.bloodGroup}</td>
      <td className="px-4 py-3">{user.city}</td>
    </tr>
  );
}
