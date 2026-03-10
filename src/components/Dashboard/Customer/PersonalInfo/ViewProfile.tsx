import { Mail, MapPin, Phone, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import profileImg from "@/assets/person/p1.jpg";
import type { IUser } from "@/types/profile";
import { Link } from "react-router";

type Props = {
  profile: IUser;
};

export default function ViewProfile({ profile }: Props) {
  console.log(profile);
  const avatarSrc = profile.avatarUrl || profile.avatar || profileImg;

  return (
    <div className="border border-(--Text-gray-200,#E5E7EB) shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] xl:rounded-4xl rounded-2xl  xl:p-10 md:p-6 p-3 border-solid">
      <div className="flex items-start justify-between gap-4">
        <div className="relative xl:w-37.5 xl:h-37.5 md:w-30 md:h-30 w-25 h-25 xl:mb-12 lg:mb-10 md:mb-8 mb-6 shrink-0">
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="pt-2">
          <Link
            className="text-white xl:text-base text-sm font-medium rounded-2xl"
            to={`/customer-dashboard/edit-profile/${profile.id}`}
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-700 font-medium mb-2">First Name</div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
              <Input
                readOnly
                value={profile?.first_name ?? "N/A"}
                className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
              />
            </div>
          </div>

          <div>
            <div className="text-gray-700 font-medium mb-2">Last Name</div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
              <Input
                readOnly
                value={profile?.last_name ?? "N/A"}
                className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-gray-700 font-medium mb-2">Email Address</div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
            <Input
              readOnly
              value={profile?.email ?? "N/A"}
              className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
            />
          </div>
        </div>

        <div>
          <div className="text-gray-700 font-medium mb-2">Phone Number</div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
            <Input
              readOnly
              value={profile?.profile?.phone ?? "N/A"}
              className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-700 font-medium mb-2">Gender</div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
              <Input
                readOnly
                value={profile?.gender ?? "N/A"}
                className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
              />
            </div>
          </div>

          <div>
            <div className="text-gray-700 font-medium mb-2">City</div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
              <Input
                readOnly
                value={profile?.profile?.city ?? "N/A"}
                className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-gray-700 font-medium mb-2">Address</div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
            <Input
              readOnly
              value={profile?.profile?.address ?? "N/A"}
              className="pl-12 md:h-12 h-10 bg-gray-100 placeholder:text-gray-500 text-gray-900 border-none rounded-2xl focus-visible:ring-primary focus-visible:ring-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
