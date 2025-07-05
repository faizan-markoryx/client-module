import { Modal } from 'antd'
import { Player } from "@lottiefiles/react-lottie-player";

interface ClientExportLoaderProps  {
    isExportingOpen:boolean
}

const ClientExportLoader : React.FC<ClientExportLoaderProps> = ({isExportingOpen}) => {
  return (
    <>
     <Modal
        width={330}
        open={isExportingOpen}
        onOk={() => {}}
        onCancel={() => {}}
        closable={false}
        footer={null}
      >
        <div className="rocket-box">
          <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/packages/lf20_mmvrvrif.json"
            style={{ height: "310px", width: "310px" }}
          >
            <div className="w-full flex items-center justify-center">
              <span className='text-lg font-bold'>Please wait</span>
            </div>
          </Player>
        </div>
      </Modal>
    </>
  )
}

export default ClientExportLoader