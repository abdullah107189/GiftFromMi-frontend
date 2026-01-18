import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Contact } from "@/types/dashboard";
import SharedDropdown from "@/components/shared/SharedDropdown";

const dropdownOptions = [
  { label: "Edit", value: "edit" },
  { label: "Send Gift", value: "send_gift" },
  { label: "View History", value: "history" },
  { label: "Delete", value: "cancel_delete" },
];

const RecipientCard: React.FC<{ contact: Contact }> = ({ contact }) => {
  const handleAction = (value: string): void => {
    console.log(`Action: ${value} for ${contact.name}`);
  };
  const isVIP = contact.tags.includes("VIP");
  const isClient = contact.tags.includes("Client");

  const avatarStyles = isVIP
    ? "bg-[#FAF5EF] text-[#CA8A32]"
    : isClient
      ? "bg-[#E0E7FF] text-[#4F39F6]"
      : "bg-gray-100 text-gray-600";
  return (
    <Card className="border-gray-100 bg-white md:p-6 p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.16)] rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between p-0 ">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 text-[#4F39F6] bg-[#E0E7FF]">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className={`text-sm ${avatarStyles}`}>
              {contact.initials}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <h3 className="font-semibold text-gray-900 truncate leading-tight">
              {contact.name}
            </h3>
            <p className="text-[14px] text-gray-500 truncate mt-0.5">
              {contact.company}
            </p>
          </div>
        </div>

        <SharedDropdown
          options={dropdownOptions}
          onValueChange={handleAction}
          triggerIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.00065 8.66732C8.36884 8.66732 8.66732 8.36884 8.66732 8.00065C8.66732 7.63246 8.36884 7.33398 8.00065 7.33398C7.63246 7.33398 7.33398 7.63246 7.33398 8.00065C7.33398 8.36884 7.63246 8.66732 8.00065 8.66732Z"
                stroke="#6A7282"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00065 3.99935C8.36884 3.99935 8.66732 3.70087 8.66732 3.33268C8.66732 2.96449 8.36884 2.66602 8.00065 2.66602C7.63246 2.66602 7.33398 2.96449 7.33398 3.33268C7.33398 3.70087 7.63246 3.99935 8.00065 3.99935Z"
                stroke="#6A7282"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.00065 13.3333C8.36884 13.3333 8.66732 13.0349 8.66732 12.6667C8.66732 12.2985 8.36884 12 8.00065 12C7.63246 12 7.33398 12.2985 7.33398 12.6667C7.33398 13.0349 7.63246 13.3333 8.00065 13.3333Z"
                stroke="#6A7282"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          className="p-0 h-8 w-8 hover:bg-transparent shadow-none border-none"
        />
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex items-center text-[14px] gap-2 mb-2.5 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14.6673 4.66602L8.67332 8.48402C8.46991 8.60216 8.23888 8.66439 8.00365 8.66439C7.76843 8.66439 7.53739 8.60216 7.33398 8.48402L1.33398 4.66602"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.334 2.66602H2.66732C1.93094 2.66602 1.33398 3.26297 1.33398 3.99935V11.9993C1.33398 12.7357 1.93094 13.3327 2.66732 13.3327H13.334C14.0704 13.3327 14.6673 12.7357 14.6673 11.9993V3.99935C14.6673 3.26297 14.0704 2.66602 13.334 2.66602Z"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center text-[14px] gap-2 mb-2.5 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M9.22198 11.046C9.35967 11.1092 9.51478 11.1237 9.66178 11.0869C9.80877 11.0502 9.93887 10.9645 10.0307 10.844L10.2673 10.534C10.3915 10.3684 10.5526 10.234 10.7377 10.1414C10.9228 10.0488 11.127 10.0007 11.334 10.0007H13.334C13.6876 10.0007 14.0267 10.1411 14.2768 10.3912C14.5268 10.6412 14.6673 10.9804 14.6673 11.334V13.334C14.6673 13.6876 14.5268 14.0267 14.2768 14.2768C14.0267 14.5268 13.6876 14.6673 13.334 14.6673C10.1514 14.6673 7.09914 13.403 4.8487 11.1526C2.59827 8.90216 1.33398 5.84992 1.33398 2.66732C1.33398 2.3137 1.47446 1.97456 1.72451 1.72451C1.97456 1.47446 2.3137 1.33398 2.66732 1.33398H4.66732C5.02094 1.33398 5.36008 1.47446 5.61013 1.72451C5.86017 1.97456 6.00065 2.3137 6.00065 2.66732V4.66732C6.00065 4.87431 5.95246 5.07846 5.85989 5.2636C5.76732 5.44874 5.63291 5.60979 5.46732 5.73398L5.15532 5.96798C5.03293 6.06144 4.94666 6.19437 4.91118 6.34422C4.87569 6.49406 4.89317 6.65157 4.96065 6.78998C5.87177 8.64056 7.37027 10.1372 9.22198 11.046Z"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {contact.phone}
        </div>
        <div className="flex items-center text-[14px] gap-2 mb-2.5 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.66602 8H9.33268"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66602 5.33398H9.33268"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.33268 13.9993V11.9993C9.33268 11.6457 9.19221 11.3066 8.94216 11.0565C8.69211 10.8065 8.35297 10.666 7.99935 10.666C7.64573 10.666 7.30659 10.8065 7.05654 11.0565C6.80649 11.3066 6.66602 11.6457 6.66602 11.9993V13.9993"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.00065 6.66602H2.66732C2.3137 6.66602 1.97456 6.80649 1.72451 7.05654C1.47446 7.30659 1.33398 7.64573 1.33398 7.99935V12.666C1.33398 13.0196 1.47446 13.3588 1.72451 13.6088C1.97456 13.8589 2.3137 13.9993 2.66732 13.9993H13.334C13.6876 13.9993 14.0267 13.8589 14.2768 13.6088C14.5268 13.3588 14.6673 13.0196 14.6673 12.666V5.99935C14.6673 5.64573 14.5268 5.30659 14.2768 5.05654C14.0267 4.80649 13.6876 4.66602 13.334 4.66602H12.0007"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 14V3.33333C4 2.97971 4.14048 2.64057 4.39052 2.39052C4.64057 2.14048 4.97971 2 5.33333 2H10.6667C11.0203 2 11.3594 2.14048 11.6095 2.39052C11.8595 2.64057 12 2.97971 12 3.33333V14"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="truncate">{contact.address}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {contact.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`text-[12px] px-2 py-1 rounded-md shadow-none border-none ${
                tag === "VIP"
                  ? "bg-[#FEF6E7] text-[#CA8A32]"
                  : tag === "Active"
                    ? "bg-[#DCFCE7] text-[#008236]"
                    : "bg-[#F3F4F6] text-[#364153]"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <div className="border-t border-gray-200 flex items-center justify-between text-[14px] text-gray-400">
        <div className="font-medium text-gray-500 pt-2 ">
          {contact.giftsSent} gifts sent
        </div>
        <p className="text-gray-400 text-xs">Last: {contact.lastSent}</p>
      </div>
    </Card>
  );
};

export default RecipientCard;
