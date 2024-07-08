"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
  username: string;
  role: "1" | "-1";
  deleted: string;
};
const Roles = {
  "1": "Super Admin",
  "-1": "user",
};
const Users = () => {
  const [users, setUsers] = useState([] as User[]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  useEffect(() => {
    request(`/admin/users?page=${page}&limit=${limit}`, "GET")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, [page, limit]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{Roles[user.role]}</td>
                <td>{user.deleted ? "INACTIVE" : "ACTIVE"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
