import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, FileSpreadsheet, Download } from "lucide-react";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const bulkSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a CSV file" })
    .refine(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
      "Only CSV files are allowed",
    ),
});

export const BulkCustomerInfo = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bulkSchema),
  });

  const uploadedFile = watch("file");

  const onSubmit = (data: any) => {
    console.log("Bulk Order File:", data.file);
  };

  const removeFile = () => {
    setValue("file", undefined as any);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 border border-gray-400 p-6 rounded-2xl">
          <h1 className="text-2xl text-gray-900 font-medium md:pb-6 pb-4">
            Upload CSV File
          </h1>

          <Controller
            name="file"
            control={control}
            render={() => (
              <Dropzone
                onDrop={(acceptedFiles) => {
                  const file = acceptedFiles[0];
                  if (file) setValue("file", file, { shouldValidate: true });
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
                      errors.file && "border-red-500 bg-red-50",
                    )}
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-900  text-2xl font-medium">
                      Drop your CSV file here
                    </p>
                    <p className="text-gray-400 text-sm my-4">or</p>
                    <Button className="flex gap-2.5 md:px-8 md:py-4 px-4 py-2 rounded-2xl md:mb-6 mb-4">
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
                      Files must be pdf or doc with max size of 15 MB
                    </p>
                  </div>
                )}
              </Dropzone>
            )}
          />
          {errors.file && (
            <p className="text-sm text-red-500 font-medium">
              {errors.file.message as string}
            </p>
          )}

          {/* Uploaded File List Section */}
          {uploadedFile && (
            <div className="">
              <div className="flex items-center justify-between md:px-6 px-4 md:py-4 py-2 bg-white border border-gray-300 rounded-2xl mt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <p className="font-medium  text-gray-900">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6  rounded-full flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_845_28918)">
                        <path
                          d="M12 0C5.38294 0 0 5.38294 0 12C0 18.6171 5.38294 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38294 18.6171 0 12 0Z"
                          fill="#CA8A32"
                        />
                        <path
                          d="M18.0823 9.45679L11.5822 15.9567C11.3872 16.1517 11.1312 16.2498 10.8753 16.2498C10.6193 16.2498 10.3633 16.1517 10.1683 15.9567L6.91834 12.7067C6.52722 12.3158 6.52722 11.6837 6.91834 11.2928C7.30928 10.9017 7.94116 10.9017 8.33228 11.2928L10.8753 13.8358L16.6683 8.04286C17.0593 7.65173 17.6912 7.65173 18.0823 8.04286C18.4732 8.43379 18.4732 9.06567 18.0823 9.45679Z"
                          fill="#FAFAFA"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_845_28918">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2  hover:bg-red-50 rounded-lg transition-colors"
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                        stroke="#DF1C41"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M9.5 16.5V10.5"
                        stroke="#DF1C41"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M14.5 16.5V10.5"
                        stroke="#DF1C41"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
