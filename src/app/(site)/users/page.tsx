"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/app/components/inputs/Button";
import Paginator from "@/app/components/paginator/paginator";
import { UserType } from "@/app/types";
import ModalUserDetail from "./component/modalUserDetail";
const Roles = {
  "1": "Super Admin",
  "-1": "User",
};
const Users = () => {
  const [users, setUsers] = useState([] as UserType[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);

  const [modelViewUser, setModelViewUser] = useState(false);

  useEffect(() => {
    request(`/admin/users?page=${page}&limit=${limit}`, "GET")
      .then((res) => {
        setUsers(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [page, limit]);

  const handleOnClick = (page: number) => {
    // todo next page
  };

  const handleViewUser = (userId: string) => {
    console.log(userId);
  };

  return (
    <>
      {/* <Paginator
        currentPage={page}
        totalPages={totalPages}
        onClick={handleOnClick}
      /> */}
      <table width={"100%"}>
        <thead>
          <tr>
            <th className="text-left">Username</th>
            <th className="text-left">Role</th>
            <th className="text-left">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{Roles[user.role]}</td>
                <td>{user.deleted ? "INACTIVE" : "ACTIVE"}</td>
                <td>
                  <Button label="Edit" type="primary" className="mr-1" />
                  <Button label="Deactive" type="danger" />
                  {/* <Link href={`/users/${user._id}`}>View</Link> */}
                  <button
                    // href="#"
                    // onClick={() => handleViewUser(user._id.toString())}
                    data-modal-target="user-detail-modal"
                    data-modal-toggle="user-detail-modal"
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
