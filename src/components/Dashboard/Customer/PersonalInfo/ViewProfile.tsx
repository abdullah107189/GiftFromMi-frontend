import { Link } from "react-router";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

import profileImg from "@/assets/person/p1.jpg";
import type { IUser } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  profile: IUser;
};

const formatValue = (value?: string | null) =>
  value && value.trim() ? value : "Not added yet";

const formatDateForDisplay = (value?: string | null) => {
  if (!value) return "Not added yet";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const getInitials = (profile: IUser) => {
  const first = profile.first_name?.[0] ?? "";
  const last = profile.last_name?.[0] ?? "";
  return `${first}${last}`.trim().toUpperCase() || "U";
};

const getFullName = (profile: IUser) =>
  `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() ||
  "Unnamed user";

const getProfileCompletion = (profile: IUser) => {
  const fields = [
    profile.first_name,
    profile.last_name,
    profile.email,
    profile.gender,
    profile.dob,
    profile.profile?.phone,
    profile.profile?.address,
    profile.profile?.city,
    profile.profile?.country,
  ];

  const completed = fields.filter(
    (field) => field && String(field).trim(),
  ).length;

  return Math.round((completed / fields.length) * 100);
};

export default function ViewProfile({ profile }: Props) {
  const avatarSrc = profile.avatarUrl || profile.avatar || profileImg;
  const fullName = getFullName(profile);
  const completion = getProfileCompletion(profile);
  const accountStatus = profile.account_status
    ? "Active account"
    : "Pending review";
  const locationSummary = [
    profile.profile?.city,
    profile.profile?.state,
    profile.profile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(208,161,90,0.30),_transparent_42%),linear-gradient(135deg,#fff7eb_0%,#ffffff_48%,#f8fafc_100%)] px-5 py-6 md:px-8 md:py-8 xl:px-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg md:h-28 md:w-28">
                <AvatarImage
                  src={avatarSrc}
                  alt={fullName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-2xl font-semibold text-white">
                  {getInitials(profile)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
                    Personal Info
                  </p>
                  <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">
                    {fullName}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                    Your user details now follow the exact `/user-detail`
                    response shape, so address, birth date, gender, and avatar
                    all render from the real nested profile data.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                    <BadgeCheck className="size-3.5" />
                    {accountStatus}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    <ShieldCheck className="size-3.5" />
                    {profile.role}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    Customer ID #{profile.id}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    Profile {completion}% complete
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-primary" />
                    <span>{formatValue(profile.email)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-primary" />
                    <span>{formatValue(profile.profile?.phone)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    <span>{locationSummary || "Location not added yet"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/customer-dashboard/settings">
                <Button
                  variant="outline"
                  className="border-slate-300 bg-white/80"
                >
                  Security Settings
                </Button>
              </Link>
              <Link to="/customer-dashboard/update-profile">
                <Button>Update Profile</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-200 bg-slate-50/70 p-5 md:grid-cols-2 xl:grid-cols-4 xl:p-8">
          <SnapshotCard
            icon={Mail}
            label="Email Address"
            value={formatValue(profile.email)}
          />
          <SnapshotCard
            icon={Phone}
            label="Phone Number"
            value={formatValue(profile.profile?.phone)}
          />
          <SnapshotCard
            icon={CalendarDays}
            label="Date Of Birth"
            value={formatDateForDisplay(profile.dob)}
          />
          <SnapshotCard
            icon={MapPin}
            label="Current Location"
            value={locationSummary || "Not added yet"}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[28px] border-slate-200 py-0 shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
          <CardContent className="space-y-6 p-5 md:p-7">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-950">
                Identity and account details
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                These fields come directly from the main user object and help
                verify who the customer is.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoBlock
                label="First Name"
                value={formatValue(profile.first_name)}
                icon={User}
              />
              <InfoBlock
                label="Last Name"
                value={formatValue(profile.last_name)}
                icon={User}
              />
              <InfoBlock
                label="Gender"
                value={formatValue(profile.gender)}
                icon={User}
              />
              <InfoBlock
                label="Role"
                value={formatValue(profile.role)}
                icon={ShieldCheck}
              />
              <InfoBlock
                label="Date Of Birth"
                value={formatDateForDisplay(profile.dob)}
                icon={CalendarDays}
              />
              <InfoBlock
                label="Account Status"
                value={accountStatus}
                icon={BadgeCheck}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-slate-200 py-0 shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
          <CardContent className="space-y-6 p-5 md:p-7">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-950">
                Location summary
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Smaller location fields are separated first so the user can scan
                them quickly before reading the full address text.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoBlock
                label="City"
                value={formatValue(profile.profile?.city)}
                icon={MapPin}
              />
              <InfoBlock
                label="State"
                value={formatValue(profile.profile?.state)}
                icon={MapPin}
              />
              <InfoBlock
                label="ZIP Code"
                value={formatValue(profile.profile?.zip_code)}
                icon={MapPin}
              />
              <InfoBlock
                label="Country"
                value={formatValue(profile.profile?.country)}
                icon={MapPin}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AddressPanel
          title="Primary Address"
          description="Saved under `profile.address` from the API response."
          value={formatValue(profile.profile?.address)}
          icon={MapPin}
        />
        <AddressPanel
          title="Shipping Address"
          description="Used for delivery-related communication and checkout."
          value={formatValue(profile.profile?.shipping_address)}
          icon={Truck}
        />
      </div>
    </div>
  );
}

type SnapshotCardProps = {
  label: string;
  value: string;
  icon: typeof User;
};

function SnapshotCard({ label, value, icon: Icon }: SnapshotCardProps) {
  return (
    <Card className="gap-3 rounded-3xl border-none bg-white py-0 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
      <CardContent className="flex items-start gap-3 p-5">
        <div className="rounded-2xl bg-primary/10 p-2">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-medium leading-6 text-slate-900">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
  icon: typeof User;
};

function InfoBlock({ label, value, icon: Icon }: InfoBlockProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-2xl bg-white p-2 shadow-sm">
          <Icon className="size-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-medium leading-6 text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

type AddressPanelProps = {
  title: string;
  description: string;
  value: string;
  icon: typeof User;
};

function AddressPanel({
  title,
  description,
  value,
  icon: Icon,
}: AddressPanelProps) {
  return (
    <Card className="rounded-[28px] border-slate-200 py-0 shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
      <CardContent className="space-y-5 p-5 md:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-3">
            <Icon className="size-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
            <p className="text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
