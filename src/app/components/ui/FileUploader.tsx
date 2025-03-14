import React, { useState, useRef } from "react";

interface FileUploadProps {
  id: string;
  label: string;
  onChange: (file: File | undefined) => void;
  accept?: string;
  error?: string;
  required?: boolean;
}

export default function FileUpload({
  id,
  label,
  onChange,
  accept = ".pdf,.doc,.docx",
  error,
  required = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    setSelectedFile(file);
    onChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(undefined);
    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const containerClasses = `
    mt-1 border-2 border-dashed rounded-md p-4
    ${
      dragActive
        ? "border-gray-400 bg-gray-50"
        : error
        ? "border-red-300"
        : "border-gray-300"
    }
    ${selectedFile ? "bg-gray-50" : ""}
  `;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={containerClasses}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {!selectedFile ? (
            <>
              <svg
                className="mx-auto h-10 w-10 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="flex justify-center mt-2">
                <label
                  htmlFor={id}
                  className="relative cursor-pointer rounded-md font-medium text-gray-600 hover:text-gray-700 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id={id}
                    name={id}
                    type="file"
                    className="sr-only"
                    ref={inputRef}
                    onChange={handleChange}
                    accept={accept}
                  />
                </label>
                <p className="pl-1 text-gray-500">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">PDF or Word document</p>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate mt-2">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500 mb-2 mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
