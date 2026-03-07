import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import Dropzone from "react-dropzone";
import { useFormContext } from "react-hook-form";
import type { CheckoutCustomerFormData } from "@/zodValidation/checkout.schema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type CsvPreview = {
  headers: string[];
  rows: Record<string, string>[];
};

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsvContent(content: string): CsvPreview {
  const lines = content
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const rawHeaders = parseCsvLine(lines[0]);
  const headers = rawHeaders.map(
    (header, index) => header || `Column_${index + 1}`,
  );

  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index] ?? "";
      return acc;
    }, {});
  });

  return { headers, rows };
}

export const BulkCustomerInfo = () => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<CheckoutCustomerFormData>();

  const uploadedFile = watch("bulkFile");
  const bulkHeaders = watch("bulkHeaders") ?? [];
  const bulkRows = watch("bulkRows") ?? [];

  const removeFile = () => {
    setValue("bulkFile", undefined, { shouldDirty: true });
    setValue("bulkHeaders", [], { shouldDirty: true });
    setValue("bulkRows", [], { shouldDirty: true });
    clearErrors("bulkFile");
  };

  const handleFileUpload = async (file: File) => {
    if (
      !(file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv"))
    ) {
      setError("bulkFile", {
        type: "manual",
        message: "Only CSV files are allowed.",
      });
      return;
    }

    try {
      const content = await file.text();
      const parsed = parseCsvContent(content);

      setValue("bulkFile", file, { shouldDirty: true, shouldValidate: true });
      setValue("bulkHeaders", parsed.headers, { shouldDirty: true });
      setValue("bulkRows", parsed.rows, { shouldDirty: true });
      clearErrors("bulkFile");
      setPreviewOpen(true);
    } catch {
      setError("bulkFile", {
        type: "manual",
        message: "Invalid CSV format. Please check the file content.",
      });
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 border border-gray-400 p-6 rounded-2xl">
        <h1 className="text-2xl text-gray-900 font-medium md:pb-6 pb-4">
          Upload CSV File
        </h1>

        <Dropzone
          onDrop={(acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) void handleFileUpload(file);
          }}
          accept={{ "text/csv": [".csv"] }}
          maxSize={1024 * 1024 * 15}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[250px]",
                "border-gray-100 bg-white hover:bg-gray-50",
                isDragActive && "border-primary bg-primary/5",
                errors.bulkFile && "border-red-500 bg-red-50",
              )}
            >
              <input {...getInputProps()} />
              <p className="text-gray-900 text-2xl font-medium">
                Drop your CSV file here
              </p>
              <p className="text-gray-400 text-sm my-4">or</p>
              <Button
                type="button"
                className="flex gap-2.5 md:px-8 md:py-4 px-4 py-2 rounded-2xl md:mb-6 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 13C21.7348 13 21.4804 13.1054 21.2929 13.2929C21.1054 13.4804 21 13.7348 21 14V18.213C20.9992 18.9519 20.7053 19.6603 20.1828 20.1828C19.6603 20.7053 18.9519 20.9992 18.213 21H5.787C5.04809 20.9992 4.33966 20.7053 3.81717 20.1828C3.29468 19.6603 3.00079 18.9519 3 18.213V14C3 13.7348 2.89464 13.4804 2.70711 13.2929C2.51957 13.1054 2.26522 13 2 13C1.73478 13 1.48043 13.1054 1.29289 13.2929C1.10536 13.4804 1 13.7348 1 14V18.213C1.00132 19.4822 1.50609 20.699 2.40354 21.5965C3.30099 22.4939 4.51782 22.9987 5.787 23H18.213C19.4822 22.9987 20.699 22.4939 21.5965 21.5965C22.4939 20.699 22.9987 19.4822 23 18.213V14C23 13.7348 22.8946 13.4804 22.7071 13.2929C22.5196 13.1054 22.2652 13 22 13Z"
                    fill="white"
                  />
                  <path
                    d="M6.70643 8.70679L10.9994 4.41379V16.9998C10.9994 17.265 11.1048 17.5194 11.2923 17.7069C11.4799 17.8944 11.7342 17.9998 11.9994 17.9998C12.2646 17.9998 12.519 17.8944 12.7065 17.7069C12.8941 17.5194 12.9994 17.265 12.9994 16.9998V4.41379L17.2924 8.70679C17.481 8.88894 17.7336 8.98974 17.9958 8.98746C18.258 8.98518 18.5088 8.88001 18.6942 8.6946C18.8797 8.5092 18.9848 8.25838 18.9871 7.99619C18.9894 7.73399 18.8886 7.48139 18.7064 7.29279L12.7064 1.29279C12.5189 1.10532 12.2646 1 11.9994 1C11.7343 1 11.48 1.10532 11.2924 1.29279L5.29243 7.29279C5.11027 7.48139 5.00948 7.73399 5.01176 7.99619C5.01403 8.25838 5.1192 8.5092 5.30461 8.6946C5.49002 8.88001 5.74083 8.98518 6.00303 8.98746C6.26523 8.98974 6.51783 8.88894 6.70643 8.70679Z"
                    fill="white"
                  />
                </svg>
                Browse
              </Button>
              <p className="text-gray-700 text-sm mt-1">
                File must be CSV with max size of 15 MB
              </p>
            </div>
          )}
        </Dropzone>

        {errors.bulkFile && (
          <p className="text-sm text-red-500 font-medium mt-2">
            {errors.bulkFile.message as string}
          </p>
        )}

        {uploadedFile && (
          <div>
            <div className="flex items-center justify-between md:px-6 px-4 md:py-4 py-2 bg-white border border-gray-300 rounded-2xl mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setPreviewOpen(true)}
                >
                  Preview Table
                </Button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="#DF1C41"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="#DF1C41"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 16.5V10.5"
                      stroke="#DF1C41"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 16.5V10.5"
                      stroke="#DF1C41"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-white w-full max-w-7xl! max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Uploaded CSV Preview</DialogTitle>
            <DialogDescription>
              Review recipient rows before proceeding to checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="text-sm text-gray-600">
            Total rows: <span className="font-medium">{bulkRows.length}</span>
          </div>

          <div className=" border rounded-xl w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {bulkHeaders.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="relative">
                {bulkRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={Math.max(1, bulkHeaders.length)}
                      className="text-center text-gray-500"
                    >
                      No rows found in this CSV.
                    </TableCell>
                  </TableRow>
                ) : (
                  bulkRows.slice(0, 100).map((row, rowIndex) => (
                    <TableRow
                      className="overflow-scroll"
                      key={`${rowIndex}-${Object.values(row).join("-")}`}
                    >
                      {bulkHeaders.map((header) => (
                        <TableCell key={`${rowIndex}-${header}`}>
                          {row[header] || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {bulkRows.length > 100 && (
            <p className="text-xs text-gray-500">
              Showing first 100 rows only for preview.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
