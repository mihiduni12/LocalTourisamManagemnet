
export const SearchResult = ({ result, productId }) => {
  return (
    <div
      className="py-[10px] px-[20px] hover:bg-[#efefef]"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};