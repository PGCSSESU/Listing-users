export const queryKeys = {
  users: {
    all: ["users"] as const,

    infinite: (params?: {
      q?: string;
      Role?: string;
      gender?: string;
    }) =>
      [
        "users",
        "infinite",
        params?.q ?? "",
        params?.Role ?? "",
        params?.gender ?? "",
      ] as const,
  },
};
