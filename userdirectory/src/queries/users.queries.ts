import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users.api";

type UsersParams = {
  q?: string;
  gender?: string;
  Role?: string;
};

export const usersInfiniteQueryOptions = (params?: UsersParams) =>
  infiniteQueryOptions({
    queryKey: [
      "users",
      "infinite",
      params?.q ?? "",
      params?.gender ?? "",
      params?.Role ?? "",
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchUsers({
        pageParam,
        limit: 20,
        ...params,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
