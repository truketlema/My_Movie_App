import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [searchTitle, setSearchTitle] = useState("");

  return (
    <div className=" w-full flex justify-center items-start mt-4">
      <input
        type="text"
        value={searchTitle}
        onChange={(e) => {
          setSearchTitle(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Search movie"
        className="py-2 w-[900px] px-4 border border-gray-300 rounded"
      />
    </div>
  );
}
