import { api } from "../lib/api";
import { DEFAULT_PAGE_SIZE, DEFAULT_SELECT } from "../lib/config";
import type { User } from "../lib/definitions";

interface ApiRawUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: {
    country: string;
  };
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
  order = "asc"
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

  if (search) {
    params.append("q", search);
  }

  const response = await api.get<UsersResponse>(
    `/${search ? "search" : ""}?${params.toString()}`
  );

  const users: User[] = response.data.users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    image: u.image,
    country: u.address?.country ?? "N/A",
  }));

  return {
    users,
    total: response.data.total,
  };
};
