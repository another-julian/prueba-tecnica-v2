import { api } from "../lib/api";
import { DEFAULT_PAGE_SIZE, DEFAULT_SELECT } from "../lib/config";
import type { User } from "../lib/definitions";

interface ApiRawUser {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  image: string;
  address: {
    country: string;
    city: string;
  };
  bloodGroup: string;
}

interface UsersResponse {
  users: ApiRawUser[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchUsers = async (
  page = 1,
  search = "",
  sortBy = "firstName",
  order = "asc",
  filterKey?: string,
  filterValue?: string
): Promise<{ users: User[]; total: number }> => {
  const limit = DEFAULT_PAGE_SIZE.toString();
  const skip = (page - 1) * DEFAULT_PAGE_SIZE;

  const params = new URLSearchParams({
    limit,
    skip: skip.toString(),
    select: DEFAULT_SELECT,
    sortBy,
    order,
  });

  // Si hay búsqueda, usar /search
  if (search) {
    const fullUrl = `/search?q=${search}&${params.toString()}`;
    console.log("➡️ Endpoint final:", fullUrl);
    const response = await api.get<UsersResponse>(
      `/search?q=${search}&${params.toString()}`
    );
    return formatResponse(response.data);
  }

  // Si hay filtros
  if (filterKey && filterValue) {
    params.append("key", filterKey);
    params.append("value", filterValue);
    const response = await api.get<UsersResponse>(
      `/filter?${params.toString()}`
    );
    return formatResponse(response.data);
  }

  // Por defecto
  const response = await api.get<UsersResponse>(`/?${params.toString()}`);
  return formatResponse(response.data);
};

// Helper para convertir la respuesta
const formatResponse = (
  data: UsersResponse
): { users: User[]; total: number } => {
  const users: User[] = data.users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    age: u.age,
    email: u.email,
    image: u.image,
    city: u.address?.city ?? "N/A",
    bloodGroup: u.bloodGroup,
  }));

  return {
    users,
    total: data.total,
  };
};
