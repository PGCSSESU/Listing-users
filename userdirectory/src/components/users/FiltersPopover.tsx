import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Filter, User, Briefcase, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  gender: string;
  setGender: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
};

export function FiltersPopover({
  gender,
  setGender,
  role,
  setRole,
}: Props) {
  const hasActiveFilters = gender !== "all" || role !== "all";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 relative",
            hasActiveFilters && "border-primary"
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-2xl border bg-background p-0 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-semibold text-sm">Filters</h4>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                setGender("all");
                setRole("all");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-4">
          {/* Gender */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-muted-foreground" />
              Gender
            </div>

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Agender">Agender</SelectItem>
                <SelectItem value="Polygender">Pollygender</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-px bg-border" />

          {/* Role */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Role
            </div>

            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Electrician">Electrician</SelectItem>
                <SelectItem value="Architect">Architect</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
                <SelectItem value="Surveyor">Surveyor</SelectItem>
                <SelectItem value="Project Manager">
                  Project Manager
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
          <span className="text-xs text-muted-foreground">
            {hasActiveFilters ? "Filters applied" : "No filters applied"}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
