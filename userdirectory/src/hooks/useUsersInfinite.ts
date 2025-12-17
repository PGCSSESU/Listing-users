import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users.api";

type Props = {
  gender: string;
  role: string;
};

export function useUsersInfinite({ gender, role }: Props) {
  return useInfiniteQuery({
    queryKey: ["users", gender, role],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchUsers({
        pageParam,
        gender,
        role,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 20 ? pages.length + 1 : undefined,
  });
}
