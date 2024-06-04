import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const parents: Record<string, { id: number; name: string }> = {
  foo: { id: 1, name: "foo" },
  bar: { id: 2, name: "bar" },
};

const children1: Record<string, { id: number }[]> = {
  foo: [{ id: 1 }, { id: 2 }, { id: 3 }],
  bar: [{ id: 4 }, { id: 5 }, { id: 6 }],
};

const children2: Record<string, { id: number }[]> = {
  foo: [{ id: 99 }, { id: 98 }, { id: 97 }],
  bar: [{ id: 96 }, { id: 95 }, { id: 94 }],
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchParent = async (id: string) => {
  await sleep(500);
  return Promise.resolve(parents[id]);
};

const fetchChildren1ByParentId = async (id: string) => {
  await sleep(500);
  return Promise.resolve(children1[id]);
};

const fetchChildren2ByParentId = async (id: string) => {
  await sleep(500);
  return Promise.resolve(children2[id]);
};

type Response = {
  id: number;
  name: string;
  children1: { id: number }[];
  children2: { id: number }[];
};

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAllTheData: builder.query<Response, string>({
      queryFn: async (id: string) => {
        console.log("FETCH", id || "no id passed");
        const parent = await fetchParent(id);
        const [children1, children2] = await Promise.all([fetchChildren1ByParentId(id), fetchChildren2ByParentId(id)]);

        return { data: { ...parent, children1, children2 }, error: undefined };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetAllTheDataQuery, useGetAllTheDataQuery } = api;
