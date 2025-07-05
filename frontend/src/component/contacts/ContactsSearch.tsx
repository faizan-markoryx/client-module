import { FiSearch } from "react-icons/fi";

const ClientSearch = ({ searchValue, setSearchValue }: any) => {
  return (
    <>
      <div className="flex items-center shadow-2xl h-auto w-auto my-3 ml-8 rounded-full border-[1.5px] border-s-[#E3F0FF]">
        <span className="h-[32px] w-[32px] bg-white flex items-center justify-center rounded-l-full">
          <FiSearch size={16} color={"#808080"} />
        </span>
        <input
          className="h-[32px] w-[258px] px-1 text-sm rounded-r-full placeholder:text-[#808080] placeholder:font-[500] focus:outline-none focus:border-none"
          type="text"
          placeholder="Search Any"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default ClientSearch;
