import UserHeader from '../component/user/UserHeader'
import { UserPagination } from '../component/user/UserPagination'
import UserTable from '../component/user/UserTable'

const Users = () => {

  return (
    <div className='w-[100vw] h-[90vh] flex justify-center items-center'>
      <div className='w-[90vw] shadow-2xl rounded-2xl'>
        <UserHeader />
        <UserTable />
        <UserPagination/>
      </div>
    </div>
  )
}

export default Users