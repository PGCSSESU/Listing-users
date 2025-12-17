export function flattenInfiniteData<T>(
  pages?: { data: T[] }[]
): T[] {
  return pages?.flatMap((page) => page.data) ?? [];
}
