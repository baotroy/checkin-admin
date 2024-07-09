import React from "react";

// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
interface ModalCampaignProps {
  // name?: string;
  // address?: string;
  // quantity?: number;
  // startTime?: number;
  // endTime?: number;
  // description?: string;
  handleCloseClick: () => void;
  // handleSaveClick: () => void;
  modalOpen: boolean;
  children: React.ReactNode;
}
const ModalCampaign: React.FC<ModalCampaignProps> = ({
  // name,
  // address,
  // quantity,
  // startTime,
  // endTime,
  // description,
  handleCloseClick,
  // handleSaveClick,
  modalOpen = false,
  children,
}) => {
  return (
    <>
      adfadfadf
      <div className="modal-overlay">
        {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </div>
            Campaign
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalCampaign;
