import { Input } from "@/components/ui/input";
import { PerformanceTooltip } from "@/components/users/PerformanceTooltip";
import { FiltersPopover } from "@/components/users/FiltersPopover";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
};

export function UsersToolbar({
  search,
  setSearch,
  gender,
  setGender,
  role,
  setRole,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 p-4 border rounded-xl bg-card">
      <Input
        className="w-64"
        placeholder="Search by name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <FiltersPopover
          gender={gender}
          setGender={setGender}
          role={role}
          setRole={setRole}
        />

        <PerformanceTooltip />
      </div>
    </div>
  );
}
