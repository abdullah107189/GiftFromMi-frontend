import { Checkbox } from "@/components/ui/checkbox";

type ContactRecaptchaFieldProps = {
  checked: boolean;
  disabled?: boolean;
  error?: string;
  onCheckedChange: (checked: boolean) => void;
};

export default function ContactRecaptchaField({
  checked,
  disabled = false,
  error,
  onCheckedChange,
}: ContactRecaptchaFieldProps) {
  return (
    <div>
      <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-300 p-3">
        <Checkbox
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => onCheckedChange(Boolean(value))}
          className="size-5"
        />
        <span className="text-sm font-medium text-gray-500">
          I&apos;m not a robot
        </span>
        <img
          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
          alt="recaptcha"
          className="ml-4 h-6 w-6"
        />
      </div>

      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
