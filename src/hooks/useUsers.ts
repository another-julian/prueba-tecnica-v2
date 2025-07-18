// hooks/useInfiniteUsers.ts
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import type { User } from "../lib/definitions";
import { DEFAULT_PAGE_SIZE } from "../lib/config";

export const useUsers = (
  search: string = "",
  sortBy: string = "firstName",
  order: string = "asc",
  filterKey?: string,
  filterValue?: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset si cambia búsqueda, orden o filtro
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [search, sortBy, order, filterKey, filterValue]);

  useEffect(() => {
    let cancel = false;
    if (!hasMore) return;

    setLoading(true);
    fetchUsers(page, search, sortBy, order, filterKey, filterValue)
      .then(({ users: newUsers, total }) => {
        if (cancel) return;
        setUsers((prev) => [...prev, ...newUsers]);
        const loaded = (page - 1) * DEFAULT_PAGE_SIZE + newUsers.length;
        setHasMore(loaded < total);
      })
      .catch(() => {
        if (!cancel) setError("Error al cargar usuarios.");
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [page, search, sortBy, order, hasMore, filterKey, filterValue]);

  const loadMore = () => {
    if (error) return;
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
