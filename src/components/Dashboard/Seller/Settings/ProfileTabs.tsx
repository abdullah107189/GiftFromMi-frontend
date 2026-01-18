import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="bg-white rounded-2xl py-2 px-6 w-full h-auto  flex gap-2 border border-gray-200">
        <div className="flex items-start justify-start mr-auto md:gap-6 gap-4">
          {/* Profile Tab */}
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all
          
            data-[state=active]:bg-[#F2E8D9] 
            data-[state=active]:text-[#CA8A32] 
            data-[state=active]:border-[#CA8A32] 
            border border-transparent
            text-gray-400 hover:text-gray-600 data-[state=active]:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12.6673 14V12.6667C12.6673 11.9594 12.3864 11.2811 11.8863 10.781C11.3862 10.281 10.7079 10 10.0007 10H6.00065C5.29341 10 4.61513 10.281 4.11503 10.781C3.61494 11.2811 3.33398 11.9594 3.33398 12.6667V14"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00065 7.33333C9.47341 7.33333 10.6673 6.13943 10.6673 4.66667C10.6673 3.19391 9.47341 2 8.00065 2C6.52789 2 5.33398 3.19391 5.33398 4.66667C5.33398 6.13943 6.52789 7.33333 8.00065 7.33333Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Profile
          </TabsTrigger>

          {/* Security Tab */}
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-gray-200
           
            data-[state=active]:bg-[#F2E8D9] 
            data-[state=active]:text-[#CA8A32] 
            data-[state=active]:border-[#CA8A32] 
            
            text-gray-400 hover:text-gray-600 data-[state=active]:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.3327 8.66762C13.3327 12.001 10.9993 13.6676 8.22602 14.6343C8.08079 14.6835 7.92304 14.6811 7.77935 14.6276C4.99935 13.6676 2.66602 12.001 2.66602 8.66762V4.00095C2.66602 3.82414 2.73625 3.65457 2.86128 3.52955C2.9863 3.40452 3.15587 3.33428 3.33268 3.33428C4.66602 3.33428 6.33268 2.53428 7.49268 1.52095C7.63392 1.40028 7.81358 1.33398 7.99935 1.33398C8.18511 1.33398 8.36478 1.40028 8.50602 1.52095C9.67268 2.54095 11.3327 3.33428 12.666 3.33428C12.8428 3.33428 13.0124 3.40452 13.1374 3.52955C13.2624 3.65457 13.3327 3.82414 13.3327 4.00095V8.66762Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Security
          </TabsTrigger>
        </div>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <div className="p-4 bg-white border border-gray-100 rounded-xl">
          Profile Content
        </div>
      </TabsContent>

      <TabsContent value="security" className="mt-6">
        <div className="p-4 bg-white border border-gray-100 rounded-xl">
          Security Content
        </div>
      </TabsContent>
    </Tabs>
  );
};
