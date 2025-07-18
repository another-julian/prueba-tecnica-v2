import UserCard from "./UserCard";
import UserSkeletonCard from "./UserSkeletonCard";
import type { User } from "../../../lib/definitions";

export default function UsersList({
  users,
  loading,
  handleSort,
  sortBy,
  order,
}: {
  users: User[];
  loading: boolean;
  handleSort: (field: string) => void;
  sortBy: string;
  order: string;
}) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      <div className="flex gap items-center gap-4">
        <span className="font-semibold">Ordenar por:</span>
        <button
          type="button"
          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
          onClick={() => handleSort("firstName")}
        >
          Nombre {sortBy === "firstName" && (order === "asc" ? "↑" : "↓")}
        </button>
        <button
          type="button"
          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
          onClick={() => handleSort("bloodGroup")}
        >
          Grupo sanguíneo{" "}
          {sortBy === "bloodGroup" && (order === "asc" ? "↑" : "↓")}
        </button>
      </div>
      {loading &&
        [...Array(2)].map((_, i) => <UserSkeletonCard key={`skeleton-${i}`} />)}

      {users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </div>
  );
}
