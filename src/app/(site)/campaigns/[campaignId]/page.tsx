"use client";
// import request from "@/common/api";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Button from "../components/inputs/Button";
// import Paginator from "../components/paginator/paginator";
// import Link from "next/link";

interface IParams {
  id: string;
}
const UserDetail = ({ params }: { params: IParams }) => {
  console.log("🚀 ~ UserDetail ~ params:", params);
  //   const [users, setUsers] = useState([] as User[]);
  //   const [page, setPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(0);
  //   console.log("🚀 ~ Users ~ totalPages:", totalPages);
  //   const [limit, setLimit] = useState(20);
  //   useEffect(() => {
  //     request(`/admin/users?page=${page}&limit=${limit}`, "GET")
  //       .then((res) => {
  //         setUsers(res.data.users);
  //         setTotalPages(res.data.totalPages);
  //       })
  //       .catch((err) => {
  //         toast.error("Something went wrong!");
  //       });
  //   }, [page, limit]);

  //   const handleOnClick = (page: number) => {
  //     // todo next page
  //   };

  return <>Campaign details page {params.id}</>;
};

export default UserDetail;
