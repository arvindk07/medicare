import { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { VscListSelection } from "react-icons/vsc";
import { NeurowelPagination } from "../pagination/NeurowelPagination";
import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import NeurowelDropdownSelect from "@/components/forms/Input/NeurowelDropdownSelect";

const NeurowelFilterHeader = (props: any) => {
  const { click_function, view, open_model_handler, btn_title } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-16">
        <NeurowelDropdownSelect />
        <div className="flex justify-end gap-2">
          <div
            onClick={() => click_function("list")}
            className={`h-9 w-9 rounded flex justify-center items-center cursor-pointer hover:text-blue-600 ${
              view === "list" ? "text-blue-600 bg-white shadow" : ""
            }`}
          >
            <VscListSelection className="h-6 w-6" />
          </div>
          <div
            onClick={() => click_function("grid")}
            className={`h-9 w-9 rounded flex justify-center items-center cursor-pointer hover:text-blue-600 ${
              view === "grid" ? "text-blue-600 bg-white shadow" : ""
            }`}
          >
            <IoGrid className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-x-24">
        <NeurowelButton
          label={btn_title}
          icon="Plus"
          icon_width={24}
          neurowel_click_function={open_model_handler}
          neurowel_class="rounded-full border-2 bg-transparent text-purple-700 border-purple-700 hover:text-white hover:bg-purple-700"
        />
        <NeurowelPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default NeurowelFilterHeader;
