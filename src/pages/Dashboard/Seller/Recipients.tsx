import RecipientCard from "@/components/Dashboard/Seller/Recipients/RecipientCard";
import RecipientsHeader from "@/components/Dashboard/Seller/Recipients/RecipientsHeader";
import SearchRecipientsBar from "@/components/Dashboard/Seller/Recipients/SearchRecipientsBar";
import { Card } from "@/components/ui/card";
import { recipientsData } from "@/data/mockData";

function Recipients() {
  return (
    <div>
      <RecipientsHeader></RecipientsHeader>
      <SearchRecipientsBar></SearchRecipientsBar>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipientsData?.map((contact) => (
          <RecipientCard key={contact.id} contact={contact} />
        ))}
        <Card className="flex flex-col items-center justify-center border-gray-100 bg-white md:p-6 p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.16)] rounded-2xl  transition-all  h-full min-h-70 ">
          <div className="bg-primary-100 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
                stroke="#CA8A32"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="#CA8A32"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 8V14"
                stroke="#CA8A32"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 11H16"
                stroke="#CA8A32"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900">Add New Recipient</h3>
          <p className="text-[14px] text-gray-500text-center px-4">
            Click to add a contact
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Recipients;
