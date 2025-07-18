import type { User } from "../../../lib/definitions";

export default function UserCard({ user }: { user: User }) {
  return (
    <div
      key={user.id}
      className="border border-gray-300 p-4 rounded-lg shadow-sm flex gap-4 items-start"
    >
      <img
        src={user.image}
        alt={user.firstName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 text-sm">
        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-600 text-xs">{user.email}</p>
        <p className="text-xs mt-2">
          <span className="font-medium">Grupo:</span> {user.bloodGroup}
        </p>
        <p className="text-xs mt-2">
          <span className="font-medium">Ciudad:</span> {user.city}
        </p>
      </div>
    </div>
  );
}
