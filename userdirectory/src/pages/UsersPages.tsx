import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/useDebounce";
import { usersInfiniteQueryOptions } from "@/queries/users.queries";

import { UsersToolbar } from "@/components/users/UsersToolbar";
import { UsersTable } from "@/components/users/usersTabls";
import { UsersHeader } from "@/components/users/UserHeader";
import { NoUsersFound } from "@/components/users/Nousersfound";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [role, setRole] = useState("all");

  const debouncedSearch = useDebounce(search.trim(), 300);

  const params = {
    q: debouncedSearch || undefined,
    gender: gender === "all" ? undefined : gender,
    Role: role === "all" ? undefined : role,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(usersInfiniteQueryOptions(params));

  const users = data?.pages.flatMap((page) => page.data) ?? [];

  if (status === "pending") {
    return <div className="p-6 text-gray-400">Loading users...</div>;
  }

  if (status === "error") {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <UsersHeader />

      <UsersToolbar
        search={search}
        setSearch={setSearch}
        gender={gender}
        setGender={setGender}
        role={role}
        setRole={setRole}
      />

      {users.length === 0 ? (
        <div className="rounded-xl border bg-background">
          <NoUsersFound
            onClear={() => {
              setSearch("");
              setGender("all");
              setRole("all");
            }}
          />
        </div>
      ) : (
        <UsersTable
          users={users}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
}
