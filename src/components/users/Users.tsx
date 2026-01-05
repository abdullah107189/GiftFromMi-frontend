import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types/user";

const Users = () => {
  const { data: usersData, isLoading: loading } =
    useGetAllUsersQuery(undefined);

  if (loading) return <div className="p-10 text-center">Loading Users...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-5 text-center">Team Members</h2>

      {/* ৩. Shadcn UI Table এর ব্যবহার */}
      <div className="border rounded-lg">
        <Table>
          <TableCaption>A list of users from JSONPlaceholder.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell className="text-right">{user.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
