import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NeurowelDropdownSelect = (props: any) => {
  const {
    name,
    label,
    control,
    rules,
    error,
    children,
    defaultValue,
    disabled,
    onDropDownChange,
  } = props;
  console.log(defaultValue);

  const handleChange = (e: any, onChange: any) => {
    onChange(e);
    onDropDownChange(e);
  };
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Active</SelectLabel>
          <SelectItem value="apple">Pending</SelectItem>
          <SelectItem value="banana">Inprogress</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

NeurowelDropdownSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.any,
  error: PropTypes.any,
  children: PropTypes.array,
  defaultValue: PropTypes.string,
  disabled: PropTypes.any,
  onDropDownChange: PropTypes.func,
};

export default NeurowelDropdownSelect;
