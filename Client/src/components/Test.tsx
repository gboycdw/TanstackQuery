import { useSearchParams } from "react-router-dom";

export default function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handler = (number: string) => {
    searchParams.delete("name");
    searchParams.append("name", number);
    setSearchParams(searchParams);
  };
  return (
    <div className="flex flex-col">
      <button onClick={() => handler("1")}>queryString to 1</button>
      <button onClick={() => handler("2")}>queryString to 2</button>
    </div>
  );
}
