import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import logo from "@/assets/icons/logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

// Form Validation Schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  preferredDate: z.date().min(1, { message: "Please select a date" }),
  preferredTime: z.string().min(1, { message: "Please select a time" }),
});

const BookSetupCall = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      company: "",
      phone: "",
      preferredDate: undefined,
      preferredTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex items-center flex-col relative max-w-main xl:mt-36 md:mt-30 mt-20 xl:py-15 md:py-10 py-5 overflow-hidden px-3">
      <h1 className="xl:text-[32px] md:text-2xl text-xl font-bold text-gray-900 mb-8">
        Book A Setup Call
      </h1>

      <div className="w-full max-w-243.5 bg-backgroundz border border-primary rounded-2xl xl:p-8 md:p-6 p-4 flex flex-col md:flex-row items-center justify-center">
        {/* Left Side: Info */}
        <div className="xl:px-8 md:px-6 px-4 h-full md:w-1/3">
          <div className="flex flex-col items-center justify-center text-center md:text-left">
            <img src={logo} alt="GiftFromMi" className="h-auto w-21" />
            <h2 className="font-semibold text-gray-700 ">
              Set Up Client Gifts Once. We Ship All Year.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed xl:mt-8 md:mt-6 my-4">
              Lets Discuss how GiftFromMi can transform your client gifting
              strategy. Our team will walk your through the platform and answer
              all your questions.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 md:border-l border-primary xl:pl-8 md:pl-6 pl-4 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4 w-full">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-900 mb-4">
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="h-12 rounded-lg border-gray-200 xl:px-8 md:px-6 px-4 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-900 mb-4">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John@domain.com"
                          {...field}
                          className="h-12 rounded-lg border-gray-200 xl:px-8 md:px-6 px-4 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-900 mb-4">
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company"
                          {...field}
                          className="h-12 rounded-lg border-gray-200 xl:px-8 md:px-6 px-4 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-900 mb-4">
                        Phone <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+880 123456789"
                          {...field}
                          className="h-12 rounded-lg border-gray-200 xl:px-8 md:px-6 px-4 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Date */}
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="space-y-2 flex flex-col">
                      <FormLabel className="font-semibold text-gray-900">
                        Preferred Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              // Matching the exact style from your images
                              className="w-full h-12!  rounded-lg border border-gray-200 hover:bg-background relative"
                            >
                              {/* Checking type to avoid TS error */}
                              {field.value instanceof Date ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span className="text-gray-400! mr-auto text-base">
                                  dd/mm/yyyy
                                </span>
                              )}

                              {/* Calendar with Clock icon from image_1f464b.png */}
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                    stroke="#6A7282"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.29 16.5C18.29 18.32 16.81 19.8 14.99 19.8C13.17 19.8 11.69 18.32 11.69 16.5C11.69 14.68 13.17 13.2 14.99 13.2C16.81 13.2 18.29 14.68 18.29 16.5Z"
                                    stroke="#6A7282"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14.99 15.2V16.5H16.29"
                                    stroke="#6A7282"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            // Ensure field.value is a Date object
                            selected={
                              field.value instanceof Date
                                ? field.value
                                : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Preferred Time */}
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="font-semibold text-gray-900">
                        Preferred Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12! w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-900 focus:ring-0 focus:border-[#D4A373]">
                            <SelectValue placeholder="Select Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="mt-12 rounded-xl">
                          <SelectItem
                            value="morning"
                            className="rounded-lg bg-transparent!"
                          >
                            Morning (10:00 AM - 12:00 PM)
                          </SelectItem>
                          <SelectItem
                            value="afternoon"
                            className="rounded-lg bg-transparent!"
                          >
                            Afternoon (02:00 PM - 05:00 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-2xl font-semibold transition-all mt-4"
              >
                Book A Setup Call
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default BookSetupCall;
