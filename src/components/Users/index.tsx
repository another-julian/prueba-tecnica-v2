import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import UsersTable from "./UsersTable";
import UsersList from "./UsersList";

interface Props {
  search: string;
  filterKey?: string;
  filterValue?: string;
}

export default function Users({ search, filterKey, filterValue }: Props) {
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState("asc");

  const { users, loading, error, hasMore, loadMore } = useUsers(
    search,
    sortBy,
    order,
    filterKey,
    filterValue
  );

  const lastRowRef = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore,
  });

  const handleSort = (field: string) => {
    if (sortBy !== field) {
      setSortBy(field);
      setOrder("asc");
    } else {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <div className="w-full my-5">
      {/* Desktop view */}
      <UsersTable
        users={users}
        loading={loading}
        sortBy={sortBy}
        order={order}
        handleSort={handleSort}
      />

      {/* Mobile view para mejor UX */}
      <UsersList
        users={users}
        loading={loading}
        handleSort={handleSort}
        sortBy={sortBy}
        order={order}
      />

      <div className="mt-4 text-center text-sm text-gray-600">
        {error && <span className="text-red-500">{error}</span>}
        {!hasMore && !loading && "No hay más resultados."}
      </div>
      <div ref={lastRowRef} className="h-1" />
    </div>
  );
}
