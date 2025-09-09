import { IoGrid } from "react-icons/io5";
import { BsList } from "react-icons/bs";

const MasterListGridHeader = (props: any) => {
  const { click_function, view } = props;
  return (
    <div className="flex justify-end gap-2">
      <BsList
        className={`h-6 w-6 mr-2 cursor-pointer hover:text-blue-600  ${
          view === "list" ? "text-blue-600" : ""
        }`}
        onClick={() => click_function("list")}
      />
      <IoGrid
        className={`h-6 w-6 mr-2 cursor-pointer hover:text-blue-600 ${
          view === "grid" ? "text-blue-600" : ""
        }`}
        onClick={() => click_function("grid")}
      />
    </div>
  );
};

export default MasterListGridHeader;
