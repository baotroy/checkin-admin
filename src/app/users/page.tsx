"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/inputs/Button";
import Paginator from "../components/paginator/paginator";

type User = {
  username: string;
  role: "1" | "-1";
  deleted: string;
};
const Roles = {
  "1": "Super Admin",
  "-1": "User",
};
const Users = () => {
  const [users, setUsers] = useState([] as User[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  useEffect(() => {
    request(`/admin/users?page=${page}&limit=${limit}`, "GET")
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [page, limit]);

  const handleOnClick = (page: number) => {
    // todo next page
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
                  <Button label="Edit" type="primary" />
                  <Button label="Deactive" type="danger" />
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
