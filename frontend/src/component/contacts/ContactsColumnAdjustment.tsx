import ColumnLogo from "../../assets/ColumnLogo";
import ContactColumnAdjustmentPopup from "./ContactColumnAdjustmentPopup";

const ContactColumnAdjustment = ({
  setIsColumnPopupModel,
  isColumnPopupModel,
  setColumnOrder,
  setColumnVisibility,
}: any) => {
  return (
    <div className="text-black">
      <ColumnLogo
        className="text-white fill-gray-400 w-[33px] h-[33px] cursor-pointer hover:fill-[#121820]"
        onClick={() => setIsColumnPopupModel(true)}
      />
      <ContactColumnAdjustmentPopup
        isColumnPopupModel={isColumnPopupModel}
        setIsColumnPopupModel={setIsColumnPopupModel}
        setColumnOrder={setColumnOrder}
        setColumnVisibility={setColumnVisibility}
      />
    </div>
  );
};

export default ContactColumnAdjustment;
