import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setClientStateData } from "../../redux/clientSlice";
import { useEffect } from "react";

const PositionSearch = ({ setSearchData, searchData }: any) => {
  const { clientDataformat }: any = useSelector((state: any) => state.client);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clientDataformat?.searchBy !== "") {
      dispatch(
        setClientStateData({
          ...clientDataformat,
          searchBy: "",
          page: 1,
          perPage: 10,
        })
      );
    }
  }, [searchData]);

  return (
    <div className="flex items-center shadow-2xl h-auto w-auto my-3 ml-8 rounded-full border-[1.5px] border-s-[#E3F0FF]">
      <span className="h-[32px] w-[32px] bg-white flex items-center justify-center rounded-l-full">
        <FiSearch size={16} color={"#808080"} />
      </span>
      <input
        className="h-[32px] w-[258px] px-1  text-sm rounded-r-full placeholder:text-[#808080] placeholder:font-[500] focus:outline-none focus:border-none"
        type="text"
        placeholder="Search Any"
        value={searchData || clientDataformat?.searchBy}
        onChange={(e) => {
          setSearchData(e.target.value);
          dispatch(
            setClientStateData({
              ...clientDataformat,
              searchBy: e.target.value,
              page: 1,
              perPage: 10,
            })
          );
        }}
      />
    </div>
  );
};

export default PositionSearch;
