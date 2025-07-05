
import { useEffect, useRef, useState } from "react";
import AddClientImportPopUp from "../../popUps/clientPopUps/AddClientImportPopUp";
import AddClientExportPopUp from "../../popUps/clientPopUps/AddClientExportPopUp";
import { TfiExchangeVertical } from "react-icons/tfi";


const ClientExport = () => {

  const [exportOpenClose, setExportOpenClose] = useState(false);
  const wrapperRef = useRef(null);

  useImportExportClose(wrapperRef)

  function useImportExportClose(ref: any) {

    useEffect(() => {
      function handClickOutSide(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref.current.class.includes("client-head-export")) {
            return;
          }
          setExportOpenClose(false);
        }
      }
      document.addEventListener('mousedown', handClickOutSide);
      return () => { document.removeEventListener('mousedown', handClickOutSide) };
    }, [ref]);
  }

  return (
    <>
      <div className="h-full w-[30px] mt-4 flex-col cursor-pointer" ref={wrapperRef}>
        <div onClick={() => setExportOpenClose(!exportOpenClose)}>
          <div className="w-full flex justify-center items-center">
            <TfiExchangeVertical size={27} className={`text-[#A4A5A5] hover:text-primary`} />
          </div>
        </div>
        {
          exportOpenClose &&
          <div
            id="mainsss"
            className="h-[70px] w-[90px] border-none shadow-[0px_0px_6px_rgba(0,0,0,0.35)] flex justify-center gap-1 font-semibold flex-col items-center rounded-[10px] border-[1px] z-[100] top-[150px] right-[14rem] absolute bg-white border-black">
            <AddClientImportPopUp />
            <AddClientExportPopUp />
          </div>
        }
      </div>
    </>
  );
};

export default ClientExport;
