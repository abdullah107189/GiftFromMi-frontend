import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AddRecipientModalProps {
  trigger: React.ReactNode;
}

interface RecipientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
}

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({ trigger }) => {
  const availableTags = ["VIP", "Client", "Partner", "Lead", "Active"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipientFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      tags: [],
    },
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const onSubmit = (data: RecipientFormData) => {
    const formData = {
      ...data,
      tags: selectedTags,
    };
    console.log("Form Data:", formData);
    // Handle form submission here
    reset();
    setSelectedTags([]);
    setIsOpen(false);
  };

  const handleCancel = () => {
    reset();
    setSelectedTags([]);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="xl:min-w-2xl w-full bg-white rounded-2xl p-10 border-none overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 xl:mb-6 mb-4">
              Add Recipient
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">First Name</label>
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="Enter first name"
                  className="bg-[#F9FAFB] border-none h-14 rounded-xl px-4 focus-visible:ring-0 shadow-none placeholder:text-gray-400"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Last Name</label>
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Enter last name"
                  className="bg-[#F9FAFB] border-none h-14 rounded-xl px-4 focus-visible:ring-0 shadow-none placeholder:text-gray-400"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Email Address</label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="email@company.com"
                className="bg-[#F9FAFB] border-none h-14 rounded-xl px-4 focus-visible:ring-0 shadow-none placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Phone Number</label>
              <Input
                {...register("phone")}
                placeholder="+1 555 0123"
                className="bg-[#F9FAFB] border-none h-14 rounded-xl px-4 focus-visible:ring-0 shadow-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Company</label>
              <Input
                {...register("company")}
                placeholder="Company name"
                className="bg-[#F9FAFB] border-none h-14 rounded-xl px-4 focus-visible:ring-0 shadow-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-700">Tags</label>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-lg border-none text-sm cursor-pointer transition-colors shadow-none mt-1 ${
                      selectedTags.includes(tag)
                        ? "bg-[#E0E7FF] text-[#4F39F6]"
                        : "bg-[#F9FAFB] text-gray-700 hover:bg-[#E0E7FF] hover:text-[#4F39F6]"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-2xl px-6 py-3 bg-primary-50 text-primary shadow-none border-none border border-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-2xl px-6 py-3 bg-primary text-white shadow-none border-none"
              >
                Export
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRecipientModal;
