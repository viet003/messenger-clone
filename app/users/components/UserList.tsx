'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";
import Botconfig from "./Botconfig";
import BotBox from "./BotBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({
  items,
}) => {
  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div>
            <div className="flex-col">
              <div
                className="
                text-2xl 
                font-bold 
                text-neutral-800 
                py-4
              "
              >
                Bot chat
              </div>
            </div>
            <BotBox
              key={Botconfig.id}
              data={{ ...Botconfig }}
            />
          </div>
          <div>
            <div className="flex-col">
              <div
                className="
                text-2xl 
                font-bold 
                text-neutral-800 
                py-4
              "
              >
                People
              </div>
            </div>
            {items.map((item) => (
              item?.id && item.id !== Botconfig?.id ? (
                <UserBox key={item.id} data={item} />
              ) : null
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default UserList;
