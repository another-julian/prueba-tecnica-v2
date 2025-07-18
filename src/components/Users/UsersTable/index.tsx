import type { User } from "../../../lib/definitions";
import UserRow from "./UserRow";
import UserSkeletonRow from "./UserSkeletonRow";

export default function UsersTable({
  users,
  loading,
  sortBy,
  order,
  handleSort,
}: {
  users: User[];
  loading: boolean;
  sortBy: string;
  order: string;
  handleSort: (field: string) => void;
}) {
  return (
    <table className="w-full text-sm text-left table-fixed hidden md:table">
      <thead className="text-gray-500 text-sm border-b border-gray-200">
        <tr>
          <th className="w-4 px-3">#</th>
          <th className="px-4 py-3 w-[50%]">
            <button
              onClick={() => handleSort("firstName")}
              className="hover:cursor-pointer hover:text-gray-600"
            >
              Usuario {sortBy === "firstName" && (order === "asc" ? "↑" : "↓")}
            </button>
          </th>
          <th className="px-4 py-3 text-nowrap">
            <button
              onClick={() => handleSort("bloodGroup")}
              className="hover:cursor-pointer hover:text-gray-600"
            >
              Grupo sanguíneo{" "}
              {sortBy === "bloodGroup" && (order === "asc" ? "↑" : "↓")}
            </button>
          </th>
          <th className="px-4 py-3">Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return <UserRow key={user.id} user={user} index={index} />;
        })}
        {loading &&
          [...Array(10)].map((_, i) => (
            <UserSkeletonRow key={`skeleton-${i}`} />
          ))}
      </tbody>
    </table>
  );
}
