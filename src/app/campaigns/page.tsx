"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/inputs/Button";
import Paginator from "../components/paginator/paginator";
import { UserType } from "@/app/types";
import ModalCampaign from "./component/modal-campaign";

interface ICampaign {
  _id?: string;
  name: string;
  deleted: boolean;
  userId: string;
  address?: string;
  quantity?: number;
  startTime?: number;
  endTime?: number;
  description?: string;
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([] as ICampaign[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);

  const [modalOpen, setModalOpen] = useState(false);
  // const [modelViewUser, setModelViewUser] = useState(false);

  useEffect(() => {
    request(`/campaigns?page=${page}&limit=${limit}`, "GET")
      .then((res) => {
        setCampaigns(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [page, limit]);

  const handleOnClick = (page: number) => {
    // todo next page
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSaveClick = () => {
    //todo save
  };
  // const handleViewUser = (userId: string) => {
  //   console.log(userId);
  // };

  return (
    <>
      {/* <button onClick={toggleModal}>Create Campaign</button>
       */}
      <button
        type="button"
        // class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <table width={"100%"}>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Address</th>
            <th className="text-left">Quantity</th>
            <th className="text-left">Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.quantity || 0}</td>
                <td>{item.deleted ? "DELETED" : "ACTIVE"}</td>
                <td>
                  <Button label="Edit" type="primary" className="mr-1" />
                  <Button label="Deactive" type="danger" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalCampaign
        modalOpen={modalOpen}
        handleCloseClick={toggleModal}
        // handleSaveClick={handleSaveClick}
      >
        <div>MODAL</div>
      </ModalCampaign>
    </>
  );
};

export default Campaigns;
