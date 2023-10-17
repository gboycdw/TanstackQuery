import type { QueryClient } from "@tanstack/query-core";
import axios from "axios";

const QueryTesterApi = (oid: string, queryString?: string) => ({
  queryKey: ["test", oid],
  queryFn: async () => {
    let url = `http://localhost:8080/api/${oid}`;
    if (queryString) url += `?${queryString}`;

    console.log(url);
    return await axios.get(url);
  },
});

export const MyLoader =
  (queryClient: QueryClient) =>
  async ({ request: { url } }: any) => {
    console.log("this is Loader");
    const oid = "1";
    if (url.split("?")[1]) {
      console.log("in Loader... changed URL", url.split("?")[1]);
      const data = await queryClient.ensureQueryData(
        QueryTesterApi(oid, url.split("?")[1]),
      );
      console.log("my data", data);
      console.log("request URL", data.request.responseURL);
      return data;
    }
    console.log("no query string now...");
    return await queryClient.ensureQueryData(QueryTesterApi(oid));
  };
