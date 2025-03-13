import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  id: string;
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  required?: boolean;
}

export default function MultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
  error,
  required = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const dropdownClasses = `
    absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md overflow-auto max-h-60
    border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500
  `;

  const toggleClasses = `
    flex justify-between w-full px-3 py-2 text-left border rounded-md shadow-sm
    ${error ? "border-red-300" : "border-gray-300"} 
    bg-white focus:outline-none focus:ring-1 focus:ring-blue-500
  `;

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <button
        type="button"
        className={toggleClasses}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selected.length === 0 ? "Select options..." : selected.join(", ")}
        </span>
        <span className="ml-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className={`
      px-3 py-2 cursor-pointer text-sm
      ${
        selected.includes(option)
          ? "bg-blue-100 text-blue-900"
          : "hover:bg-gray-100 text-gray-900"
      }
    `}
                onClick={() => toggleOption(option)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)} // Change this line
                    onClick={(e) => e.stopPropagation()} // Keep this line
                  />
                  <span className="ml-2">{option}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
