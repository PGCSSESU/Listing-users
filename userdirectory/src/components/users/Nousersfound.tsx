import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onClear?: () => void;
};

export function NoUsersFound({ onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 rounded-full border border-dashed p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">
        No users found
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        We couldn’t find any users matching your search or filters.
        Try adjusting or clearing them.
      </p>

      {onClear && (
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={onClear}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
