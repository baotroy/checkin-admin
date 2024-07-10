"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/inputs/Button";
import Paginator from "../components/paginator/paginator";
import { IProvince, UserRoleType, UserType } from "@/app/types";
import Modal from "./component/modal-campaign";
import getAuth from "../components/localStorage";
import SelectBox from "../components/inputs/SelectBox";
import TextBox from "../components/inputs/TextBox";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import getProvinces from "@/common/locations";
import Link from "next/link";
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
  provinceId: string;
}

interface IUser {
  _id: string;
  name: string;
}

const Campaigns = () => {
  type Variant = "REGISTER" | "EDIT";
  const [campaigns, setCampaigns] = useState([] as ICampaign[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [users, setUsers] = useState([] as IUser[]);
  const [auth, setAuth] = useState(getAuth());
  const [sltdUser, setSltdUser] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [provinces, setProvinces] = useState([] as IProvince[]);
  const [editingCampaignId, setEditingCampaignId] = useState<string>();
  const [mode, setMode] = useState<Variant>("REGISTER");

  const minDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // campaign
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState(new Date().getTime() / 1000);
  const [quantity, setQuantity] = useState(5);
  const [provinceId, setProvinceId] = useState("");
  const [description, setDescription] = useState("");

  // get provinces
  useEffect(() => {
    getProvinces().then((res: IProvince[]) => {
      setProvinces(res);
    });
    // request(`/provinces`, "GET")
    //   .then((res) => {
    //     setProvinces(res.data.items);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // console.log(auth);
  useEffect(() => {
    if (auth?.role === UserRoleType.ADMIN) {
      // get users
      request(`/admin/all-users`, "GET")
        .then((res) => {
          console.log("users", res.data.items);
          setUsers(res.data.items);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } else if (auth?.role === UserRoleType.USER) {
      setSltdUser(auth._id!);
      setFilterUser(auth._id!);
    }
  }, [auth]);

  const [modalOpen, setModalOpen] = useState(false);
  // const [modelViewUser, setModelViewUser] = useState(false);

  useEffect(() => {
    const url = `/campaigns?page=${page}&limit=${limit}${
      filterUser ? `&userId=${filterUser}` : ""
    }`;
    console.log("🚀 ~ useEffect ~ url:", url);
    request(url, "GET")
      .then((res) => {
        setCampaigns(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [page, limit, filterUser]);

  useEffect(() => {
    setPage(1);
    console.log("🚀 ~ useEffect ~ filterUser:", filterUser);
  }, [filterUser]);

  const handleOnClick = (page: number) => {
    // todo next page
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setTime(new Date().getTime() / 1000);
    setQuantity(5);
    setProvinceId("");
    setDescription("");
    if (auth?.role === UserRoleType.ADMIN) {
      setSltdUser("");
    }
  };

  const editingCampaing = (campaign: ICampaign) => {
    console.log("🚀 ~ editingCampaing ~ campaign:", campaign);
    // todo edit
    setEditingCampaignId(campaign._id);

    setName(campaign.name);
    setAddress(campaign.address);
    setTime(campaign.time);
    setQuantity(campaign.quantity);
    setProvinceId(campaign.provinceId || "");
    setDescription(campaign.description || "");
    setSltdUser(campaign.userId._id);

    setMode("EDIT");
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen === false) {
      resetForm();
    }
  }, [modalOpen]);

  const handleSaveClick = () => {
    //todo save
    request(`/campaigns`, "POST", {
      name,
      address,
      time,
      quantity,
      userId: sltdUser,
      provinceId,
      description,
    })
      .then((res) => {
        toast.success("Campaign created successfully!");
        setCampaigns([...campaigns, res.data]);
        setModalOpen(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  const handleUpdateClick = () => {
    //todo update
    request(`/campaigns/${editingCampaignId}`, "PUT", {
      name,
      address,
      time,
      quantity,
      userId: sltdUser,
      provinceId,
      description,
    })
      .then((res) => {
        toast.success("Campaign updated successfully!");
        setCampaigns(
          campaigns.map((item) => {
            if (item._id === editingCampaignId) {
              return res.data;
            }
            return item;
          }),
        );
        setModalOpen(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
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
        onClick={() => {
          setMode("REGISTER");
          setModalOpen(true);
        }}
      />
      {auth?.role === UserRoleType.ADMIN && (
        <div>
          Filter{" "}
          <SelectBox
            value={filterUser}
            onChange={(e) => {
              setFilterUser(e.target.value);
            }}
            items={[
              { key: "", value: "All" },
              ...users.map((user) => {
                return { key: user._id, value: user.name };
              }),
            ]}
          />
        </div>
      )}
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
                <td>{new Date(item.time * 1000).toDateString()}</td>
                <td>{item.quantity || 0}</td>
                <td>{item.deleted ? "DELETED" : "ACTIVE"}</td>
                <td>{item.userId.name}</td>
                <td>
                  <Button
                    label="Edit"
                    type="primary"
                    className="mr-1"
                    onClick={() => editingCampaing(item)}
                  />
                  <Button label="Deactive" type="danger" />
                  <Link href={`/campaigns/${item._id}`}>View</Link>
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
              <SelectBox
                value={sltdUser}
                onChange={(e) => {
                  setSltdUser(e.target.value);
                }}
                items={[
                  { key: "", value: "" },
                  ...users.map((user) => {
                    return { key: user._id, value: user.name };
                  }),
                ]}
              />
            </div>
            <div>
              <label>Name</label>
              <TextBox
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            <div>
              <label>Province</label>
              <SelectBox
                items={[
                  { key: "", value: "" },
                  ...provinces.map((province) => {
                    return { key: province._id, value: province.name };
                  }),
                ]}
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
              />
            </div>
            <div>
              <label>Address</label>
              <TextBox
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={256}
              />
            </div>
            <div>
              <label>Time</label>
              {/* <TextBox value={time} onChange={e=>setTime(parseInt(e.target.value))} maxLength={256} /> */}
              <DateTimePicker
                onChange={(e) => {
                  setTime((e ? e : new Date()).getTime() / 1000);
                }}
                value={new Date(time * 1000)}
                disableClock={true}
                format="yyyy-MM-dd HH:mm"
                minDate={minDate()}
              />
            </div>
            <div>
              <label>Quantity of people</label>
              <TextBox
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                maxLength={10}
                min={1}
                type="number"
              />
            </div>
            <div>
              <label>Description</label>
              <TextBox
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                maxLength={256}
                type="textarea"
              />
            </div>
          </div>
          <div>
            <Button
              label="Save"
              type="success"
              onClick={handleSaveClick}
              className="mr-1"
            />
            <Button
              label="Cancel"
              type="outline"
              onClick={() => setModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Campaigns;
