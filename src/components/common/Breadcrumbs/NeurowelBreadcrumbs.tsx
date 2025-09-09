import { ChevronRight } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";

export const NeurowelBreadcrumbs = (props: any) => {
  const { data } = props;
  return (
    <div className=" flex items-center">
      {data.map((url: any, index: any) => {
        return (
          <div
            key={index}
            className={`flex items-center capitalize ${
              index !== data.length - 1
                ? "hover:cursor-pointer text-gray-700"
                : " text-gray-600"
            }`}
          >
            {index === 0 ? (
              <IoHome className="mt-1 mr-1 text-[24px]" />
            ) : (
              url.title
            )}{" "}
            {index !== data.length - 1 ? (
              <FaAngleRight className="mt-1 text-[20px]" />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};
