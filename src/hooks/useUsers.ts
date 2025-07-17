// hooks/useInfiniteUsers.ts
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import type { User } from "../lib/definitions";

export const useUsers = (
  search: string,
  sortBy: string = "firstName",
  order: string = "asc"
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset cuando cambia la búsqueda o el orden
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [search, sortBy, order]);

  // Cargar usuarios al cambiar página, búsqueda o orden
  useEffect(() => {
    let cancel = false;
    if (!hasMore) return;

    setLoading(true);
    fetchUsers(page, search, sortBy, order)
      .then(({ users: newUsers, total }) => {
        if (cancel) return;

        setUsers((prev) => [...prev, ...newUsers]);
        const loaded = (page - 1) * 100 + newUsers.length; // asumiendo pageSize = 100
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
  }, [page, search, sortBy, order, hasMore]);

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
