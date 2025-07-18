import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import UsersTable from "./UsersTable";
import UsersList from "./UsersList";
import Button from "../Button";

interface Props {
  search: string;
  filterKey?: string;
  filterValue?: string;
}

export default function Users({ search, filterKey, filterValue }: Props) {
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState("asc");

  const { users, loading, error, hasMore, loadMore, setRetry } = useUsers(
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
        {error && (
          <div className="text-red-500 flex flex-col items-center gap-2">
            <span>{error}</span>
            <Button
              variant="ghost"
              onClick={() => {
                setRetry((prev) => prev + 1);
              }}
            >
              Reintentar
            </Button>
          </div>
        )}
        {!hasMore && !loading && "No hay más resultados."}
      </div>
      <div ref={lastRowRef} className="h-1" />
    </div>
  );
}
