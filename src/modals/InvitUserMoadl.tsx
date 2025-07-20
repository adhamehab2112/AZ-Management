import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import userLogo from "../assets/user.svg";
interface ModalProps {
  close: () => void
}

function InviteUserModal({ close }: ModalProps) {
  let { unitId } = useParams();
  let [allUsers, setAllUsers] = useState([]);
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [invitedUsers, setInvitedUsers] = useState<any>([]);
  let [userSearchValue, setUserSearchValue] = useState("");
  const userObjectString = localStorage.getItem("userDetails");
  const userObject = userObjectString ? JSON.parse(userObjectString) : null;
  async function getAllUsers() {
    try {
      let response = await axios.get(`http://147.93.127.229:3008/users`);
      console.log(response.data);
      setAllUsers(response.data);
    }
    catch (e: any) {
      console.log(e);
    }
  }

  async function getInvitedUsers() {
    let token = userObject?.token;

    try {
      let response = await axios.get(`http://147.93.127.229:3008/units/users/${unitId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        });

      setInvitedUsers(response.data.users)

    }
    catch (e: any) {
      console.log(e);
    }

  }

  async function inviteUser(user: any) {
    setInvitedUsers((prev: any) => [...prev, user]);
    let token = userObject?.token;
    try
    {
      let response = await axios.post(`http://147.93.127.229:3008/units/invite/${user._id}/${unitId}`,{},{
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    catch(e:any)
    {
      console.log(e);
    }

  }

  useEffect(() => {
    getAllUsers();
    getInvitedUsers();
  }, [])

  useEffect(() => {
    if (userSearchValue.trim() === "") {
      setFilteredUsers([]);
      return;
    }
    const filtered = allUsers.filter((user: any) => user.name.toLowerCase().includes(userSearchValue.toLowerCase()));
    setFilteredUsers(filtered);
  }, [userSearchValue])
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">

        <div className="bg-white p-6 rounded-lg  relative shadow-lg w-1/2 max-h-100">
          <button className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer" onClick={close}>
            ×
          </button>
          <h2>Invite Users</h2>
          <div className="bg-gray-50 rounded-sm  mt-3 pb-5  ">
            <input
              type="search"
              id="default-search"
              value={userSearchValue}
              onChange={(e) => { setUserSearchValue(e.target.value) }}
              autoComplete="off"
              className="block w-full h-3.5 p-4  text-sm text-gray-900 border-b  rounded-sm bg-gray-50 "
              placeholder="Search Users ..."
            />
            {filteredUsers.length === 0 ? (userSearchValue ? (<p className="font-display text-gray-400 m-5 text-xl">
              No matching users..
            </p>) : (<p className="font-display text-gray-400 m-5 text-xl " >
              Write username to start inviting users..
            </p>)) : (
              <div className="max-h-[250px] overflow-y-auto">
                {filteredUsers.map((user: any) => {
                  const isInvited = invitedUsers.some((invitedUser: any) => invitedUser._id === user._id)
                  return (<div key={user._id} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" >
                    <img
                      src={user.imgUrl ? user.imgUrl : userLogo}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center justify-between w-90/100">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                      <button disabled={isInvited} className={isInvited ? ("cursor-pointer rounded-xl bg-[#b38be9] text-white p-1 px-2 font-display font-medium  transition-all duration-300 transform hover:scale-105") : ("cursor-pointer rounded-xl bg-[#29015f] text-white p-1 px-2 font-display font-medium  transition-all duration-300 transform hover:scale-105")} onClick={() => { inviteUser(user) }}>
                        {isInvited ? ("Already Invited") : ("Invite")}
                      </button>
                    </div>
                  </div>)
                })}
              </div>
            )}
          </div>
        </div>

      </div>


    </>
  )
}

export default InviteUserModal