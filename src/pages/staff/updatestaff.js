/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9iFJaC14Qq6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../../components/ui/table";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "../../components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import {useGetAllUsersQuery, useDeleteUserByIdMutation} from "../../API/API"
import { Player } from '@lottiefiles/react-lottie-player';
import LoadingAnimation from "../../assets/animations/HospitalAnimation.json"
import ErrorAnimation from "../../assets/animations/ErrorCatAnimation.json"

export default function UpdateStaff() {
  
const { data, error, isLoading, refetch } = useGetAllUsersQuery()
const [deleteUserById]= useDeleteUserByIdMutation()
useEffect(() => {
  if (data) {
    const staffsData = data.filter((item) => item.userType !== "admin");
    setStaffs(staffsData);
    console.log(staffsData);
  }
}, [data]);

const [staffs, setStaffs] = useState([]);

  const handeldelete= async(id)=>{
    await deleteUserById(id).unwrap();
      refetch();     
    }
  
    if (isLoading) {
      return <div className="center flex-col  gap-24 h-3/4 w-[90%]">
       <div> Loading patients...</div>
       <div>
       <Player
            autoplay
            loop
            src={LoadingAnimation}
            style={{ height: '200px', width: '200px' }}
          />
          </div>
      </div>;
    }
  
    if (error) {
      return <div className="center flex-col  gap-24 h-3/4 w-[90%]">
      <div className='text-red '> Error</div>
      <div className='flex flex-col gap-8 justify-center items-center ml-6'>
        <div>
        <Player
           autoplay
           loop
           src={ErrorAnimation}
           style={{ height: '200px', width: '200px' }}
         />
        </div>
        <div className="retry">
          <button onClick={()=> refetch()} className='text-xl bg-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded'>Retry</button>
         </div>
         </div>
         
     </div>;
    }
  
    return (
    <div className="border rounded-lg shadow-sm mx-20 mt-10">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">All Users</h2>
        <Button size="sm" variant="outline">
          Export
        </Button>
      </div>
      <div className="overflow-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs?.map((item) => {
              return (
             
                  <TableRow key={item?._id}  >
                    <TableCell>{item?.firstName}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.contact}</TableCell>
                    <TableCell>{item?.gender}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="outline">
                            <CiMenuKebab className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem  onClick={()=>handeldelete(item._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
               
              );
            })}

            {/* <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>+1 (555) 555-5556</TableCell>
              <TableCell>Female</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <CiMenuKebab className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
             </TableRow> */}

            {/* <TableRow>
              <TableCell>Michael Johnson</TableCell>
              <TableCell>michael@example.com</TableCell>
              <TableCell>+1 (555) 555-5557</TableCell>
              <TableCell>Male</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <CiMenuKebab className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow> */}

            {/* <TableRow>
              <TableCell>Sarah Lee</TableCell>
              <TableCell>sarah@example.com</TableCell>
              <TableCell>+1 (555) 555-5558</TableCell>
              <TableCell>Female</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <CiMenuKebab className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
