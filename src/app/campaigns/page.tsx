"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/inputs/Button";
import Paginator from "../components/paginator/paginator";
import { UserRoleType, UserType } from "@/app/types";
import Modal from "./component/modal-campaign";
import { set } from "react-hook-form";
import getAuth from "../components/localStorage";
import SelectBox from "../components/inputs/SelectBox";
import TextBox from "../components/inputs/TextBox";

interface ICampaign {
  _id?: string;
  name: string;
  deleted: boolean;
  userId: {
    _id: string;
    name: string;
  };
  address: string;
  quantity: number;
  time: number;
  description?: string;
}

interface IUser {
  _id: string;
  name: string;

}
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([] as ICampaign[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [users, setUsers] = useState([] as IUser[]);
  const [auth, setAuth] = useState(getAuth());
  const [sltdUser, setSltdUser] = useState("");
  const [filterUser, setFilterUser] = useState("");
  
// campaign
const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [time, setTime] = useState(0);
const [quantity, setQuantity] = useState(5);

console.log(auth)
  useEffect(() => {
      if (auth?.role === UserRoleType.ADMIN) {
        // get users
        request(`/admin/all-users`, "GET")
          .then((res) => {
            console.log("users",res.data.items);
            setUsers(res.data.items);
          })
          .catch((err) => {
            toast.error("Something went wrong!");
          });
    }
  }, [auth]);
 


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

  

  const handleSaveClick = () => {
    //todo save
    request(`/campaigns`, "POST", {
      name,
      address,
      time,
      quantity,
      userId: sltdUser
    }).then((res) => {
      toast.success("Campaign created successfully!");
      setModalOpen(false);
      setCampaigns([...campaigns, res.data]);
    }).catch((err) => {
      toast.error("Something went wrong!");
    })
  };
  // const handleViewUser = (userId: string) => {
  //   console.log(userId);
  // };

  return (
    <>
      {/* <button onClick={toggleModal}>Create Campaign</button>
       */}
      {/* <button
        type="button"
        // class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => setModalOpen(true)}
      >
        Create Campaign
      </button> */}
      <Button
        label="Create Campaign"
        type="primary"
        onClick={() => setModalOpen(true)}
        />
        <div>
          Filter <SelectBox value={filterUser} onChange={e => {
                setFilterUser(e.target.value)
              }} items={[{key: '', value: 'All'},...users.map(user => {
                return {key: user._id, value: user.name}
              })]} />
        </div>
      <table width={"100%"}>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Address</th>
            <th className="text-left">Time</th>
            <th className="text-left">Num. of People</th>
            <th className="text-left">Status</th>
            <th className="text-left">Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{new Date(item.time*1000).toDateString()}</td>
                <td>{item.quantity || 0}</td>
                <td>{item.deleted ? "DELETED" : "ACTIVE"}</td>
                <td>{item.userId.name}</td>
                <td>
                  <Button label="Edit" type="primary" className="mr-1" />
                  <Button label="Deactive" type="danger" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} title={"Create Campaign"}>
          <div>
            {/* @JoiSchema(Joi.objectId().required())
	userId: string

  name: string

	@JoiSchema(Joi.string().optional())
	description: string

	@JoiSchema(Joi.string().optional())
	address: string

	@JoiSchema(Joi.number().optional())
	time: number

	@JoiSchema(Joi.number().optional())
	quantity: number */}
            
            <div>
              <label>Client</label>
              <SelectBox value={sltdUser} onChange={e => {
                setSltdUser(e.target.value)
              }} items={[{key: '', value: ''},...users.map(user => {
                return {key: user._id, value: user.name}
              })]} />
            </div>
            <div>
              <label>Name</label>
              <TextBox value={name} onChange={e=>setName(e.target.value)} maxLength={100} />
            </div>
            <div>
              <label>Address</label>
              <TextBox value={address} onChange={e=>setAddress(e.target.value)} maxLength={256} />
            </div>
            <div>
              <label>Time</label>
              <TextBox value={time} onChange={e=>setTime(parseInt(e.target.value))} maxLength={256} />
            </div>
            <div>
              <label>Quantity of people</label>
              <TextBox value={quantity} onChange={e=>setQuantity(parseInt(e.target.value))} maxLength={10} />
            </div>
          </div>
          <div>
            <Button label="Save" type="success" onClick={handleSaveClick} className="mr-1"/>
            <Button label="Cancel" type="outline" onClick={() => setModalOpen(false)} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Campaigns;
