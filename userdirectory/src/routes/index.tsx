import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 border-black/20">
      <div className="relative w-full max-w-xl">
        <div className="pointer-events-none absolute -inset-[1px] rounded-3xl border border-white/40 blur-[2px]" />

        <div className="relative rounded-3xl border border-white/15 bg-white p-10 text-center shadow-xl transition-transform duration-300 hover:scale-[1.01]">
          <h1 className="text-4xl font-semibold tracking-tight text-black">
            User Directory
          </h1>
          <p className="mt-4 text-black leading-relaxed">
            A modern directory to browse, search, and filter users with speed and
            clarity.
          </p>

          <div className="my-8 h-px w-full bg-white/10" />

          <div className="flex flex-wrap justify-center gap-3">
            {["Infinite Scroll", "Search", "Filters", "Virtualized"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/20 px-4 py-1 text-sm text-black"
                >
                  {item}
                </span>
              )
            )}
          </div>
          <div className="mt-10">
            <Link to="/users">
              <Button
                size="lg"
                className="rounded-xl border border-white bg-black text-white font-medium px-8 py-5 transition-all hover:bg-black hover:text-white hover:border-white"
              >
                Go to User Directory →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
