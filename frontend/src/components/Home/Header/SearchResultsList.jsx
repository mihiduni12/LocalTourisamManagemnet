import { SearchResult } from "./SearchResults";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="w-[202px] bg-white rounded-[10px] h-auto overflow-auto mt-[90px] ml-[63.2%]">
      {results.map((result, id) => {
        return <SearchResult result={result.name} productId = {result} key={id} />;
      })}
    </div>
  );
};