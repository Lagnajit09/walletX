"use client";
export const Select = ({
  options,
  onSelect,
  classname,
}: {
  classname?: string;
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className={`text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${classname}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
