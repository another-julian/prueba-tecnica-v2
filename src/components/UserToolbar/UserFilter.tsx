import { useState } from "react";
import FilterFieldSelector from "./FilterFieldSelector";
import FilterValueSelector from "./FilterValueSelector";

interface Props {
  onFilterChange: (key?: string, value?: string) => void;
}

export default function UserFilter({ onFilterChange }: Props) {
  const [field, setField] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleFieldChange = (selectedField: string) => {
    setField(selectedField);
    setValue("");
    onFilterChange(undefined, undefined);
  };

  const handleValueChange = (selectedValue: string) => {
    setValue(selectedValue);
    if (!selectedValue) {
      onFilterChange(undefined, undefined);
      return;
    }

    let key: string | undefined;
    if (field === "city") key = "address.city";
    else if (field === "country") key = "address.country";
    else if (field === "blood") key = "bloodGroup";

    onFilterChange(key, selectedValue);
  };

  return (
    <div className="flex gap-4 items-center w-full md:w-fit flex-wrap">
      <label className="text-sm hidden md:block font-medium text-gray-700">
        Filtrar por:
      </label>
      <div className="flex gap-2 items-center w-full md:w-fit flex-wrap">
        <FilterFieldSelector field={field} onChange={handleFieldChange} />
        <FilterValueSelector
          field={field}
          value={value}
          onChange={handleValueChange}
        />
      </div>
    </div>
  );
}
