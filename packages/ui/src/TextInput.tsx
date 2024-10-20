"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
  inputType,
  value,
  autoComplete,
  classname,
  labelClass,
}: {
  placeholder: string | undefined | null;
  onChange: (value: string) => void;
  label?: string;
  inputType?: string;
  value?: string;
  autoComplete?: string;
  classname?: string;
  labelClass?: string;
}) => {
  return (
    <div className="pt-2">
      <label className={`block mb-2 text-sm font-medium ${labelClass}`}>
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type={inputType || "text"}
        value={value}
        id="first_name"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${classname}`}
        placeholder={placeholder || ""}
        autoComplete={autoComplete || "true"}
      />
    </div>
  );
};
