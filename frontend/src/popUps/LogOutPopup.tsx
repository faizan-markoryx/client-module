import { Button, Modal } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setUserLogOut } from '../redux/loginSlice';
import '../styles/popUpStyle/LogOutPopup.css'

const LogOutPopup = ({ isLogoutModal, setIsLogoutModal }: any) => {


    const dispatch: any = useDispatch();

    const handleLogout = (e: any) => {
        e.preventDefault();
        dispatch(setUserLogOut())
        localStorage.clear();
        window.location.reload();
    };

    return (
        <>
            <div className="log-bell-div">
                <div className="log-out-header-but"
                    onClick={() => setIsLogoutModal(true)}>
                    <FiLogOut
                        className="log-out-icon "
                    />
                    Logout
                </div>
            </div>
            <Modal
                width={420}
                className='logout-modal'
                open={isLogoutModal}
                footer={null}
                onOk={() => setIsLogoutModal(false)}
                onCancel={() => setIsLogoutModal(false)}
            >
                <div className='flex items-center gap-2'>
                    <MdErrorOutline className='text-2xl text-red-500' />
                    <p className='font-medium text-base'>Are you sure you want to log out?</p>
                </div>
                <div  className=' flex gap-5'>
                    <Button onClick={() => setIsLogoutModal(false)}>No</Button>
                    <Button
                        className='logoutYesBut !bg-[#0E4D92] text-white hover:!text-white'
                        onClick={handleLogout}
                    >
                        Yes</Button>
                </div>
            </Modal>
        </>
    );
}

export default LogOutPopup