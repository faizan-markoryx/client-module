import { useState } from "react"
import CreateUser from "../../popUps/CreateUser"


const UserHeader = () => {
  const [createUserModal, setCreateUserModal] = useState(false)
  return (
    <>
      <div className='rounded-tl-2xl rounded-tr-2xl h-16 bg-[#E6E6E6]'>
        <div className='flex justify-end items-center h-16 pr-12'>
          <button
            className='text-white p-2 text-[15px] bg-[#265F9D]  rounded-md outline-none'
            onClick={() => setCreateUserModal(true)}>Create User</button>
        </div>
      </div>
      <CreateUser
        setCreateUserModal={setCreateUserModal}
        createUserModal={createUserModal}
      />
    </>
  )
}

export default UserHeader