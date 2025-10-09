'use client';

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces/user.interface";


interface Props{
    users: User[],
}

export const UserTable = ({ users }: Props) => {
  return (
         <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                FirtsName
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Role
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>

            { users!.map((user) => (
              
              <tr  key={user.id} className="bg-white transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { user.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  { user.name }
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  { user.role }
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <select className="text-sm text-gray-900" value={user.role} onChange={_e => changeUserRole(user.id, user.role)} id="">
                        <option value="admin">Admin</option>    
                        <option value="user">User</option>    
                    </select> 
                </td>
                

              </tr>
            ))
            }

          </tbody>
        </table>
  )
}
