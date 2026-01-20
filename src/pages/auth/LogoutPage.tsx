import { Button } from "@/components/ui/button";

function Logout() {
  return (
    <div className="">
      <div className="p-6 bg-white rounded-2xl">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Logout</h1>
        <p className="text-gray-600 md:mb-8 mb-4">
          Are you sure you want to logout
        </p>
        <Button className="rounded-2xl">Yes, Logout</Button>
      </div>
    </div>
  );
}

export default Logout;
