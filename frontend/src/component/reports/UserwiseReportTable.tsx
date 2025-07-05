import { DatePicker, Space } from 'antd';

const UserwiseReportTable = () => {

    const { RangePicker } = DatePicker

    return (
        <div className='border rounded-xl h-[60vh] w-[45vw] bg-[#f0f0f0] shadow-3xl'>
            <div className='flex pt-2 h-[6vh]'>
                <div className='flex justify-end w-[25vw] font-semibold'>Userwise Notes</div>
                <div className='flex justify-end w-[20vw]'>icone</div>
            </div>
            <div className='h-[54vh] w-[45vw] flex justify-center'>
                <div className='h-[50vh] w-[40vw] shadow-3xl rounded-xl'>
                    <div className='rounded-tl-xl rounded-tr-xl border p-2 flex justify-between items-center bg-[#E3F0FF]'>
                        {/* <AiOutlineSearch className="relative w-5 h-5 text-[#0E4D92]"/> */}
                        <input type="text" placeholder='Search...' className='shadow-sm rounded border border-[lightgray] pl-10 w-[15rem] py-[2px] outline-none px-[14px] bg-[#ffffff]' />
                        <Space direction="vertical" >
                            <RangePicker />
                        </Space>
                    </div>
                    <div className='h-[38vh] '>
                        table
                    </div>
                    <div className='rounded-bl-xl rounded-br-xl border p-2 flex justify-center items-center bg-[#E3F0FF]'>
                        pagination
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserwiseReportTable