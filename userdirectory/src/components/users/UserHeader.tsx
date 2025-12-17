import { Users } from "lucide-react";

export function UsersHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Users className="h-5 w-5 text-primary" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold leading-tight">
          Users Directory
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and explore all registered users
        </p>
      </div>
    </div>
  );
}
