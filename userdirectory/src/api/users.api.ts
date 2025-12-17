import type { User } from "@/types/user";

type FetchUsersResponse = {
  data: User[];
  nextPage: number | null;
};

export async function fetchUsers({
  pageParam = 1,
  limit = 20,
  gender,
  Role,
  q,
}: any): Promise<FetchUsersResponse> {
  const params = new URLSearchParams({
    page: String(pageParam),
    limit: String(limit),
  });

  if (gender) params.append("gender", gender);
  if (Role) params.append("Role", Role);
  if (q) params.append("q", q);

  const res = await fetch(
    `http://localhost:5002/users?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json(); // { data, nextPage }
}
