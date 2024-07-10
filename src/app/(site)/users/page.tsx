"use client";
import request from "@/common/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/app/components/inputs/Button";
import Paginator from "@/app/components/paginator/paginator";
import { UserRoleType, UserType, Variant } from "@/app/types";
import ModalUserDetail from "./component/modalUserDetail";
import Link from "next/link";
import Modal from "../campaigns/component/modal-campaign";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "@/app/components/FormErrorMessage";
const Roles = {
  "1": "Super Admin",
  "-1": "User",
};

interface IFormInput {
  username: string;
  phone: string;
  email: string;
  role: UserRoleType;
  password: string;
  rePassword: string;
}

const Users = () => {
  const [users, setUsers] = useState([] as UserType[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editMode, setEditMode] = useState(Variant.REGISTER);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState(-1);

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
    // console.log(userId);
    alert("coming soon");
  };


  const { register, handleSubmit, getValues,  formState: { errors }, } = useForm<IFormInput>();
  console.log(errors);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    request("/admin/user", "POST", data)
      .then(() => {
        // reset();
        toast.success("Đăng kí thành công");
      })
      .catch(() => {
        toast.error("Đăng kí thất bại, đã có lỗi xảy ra");
      })
      .finally(() => setLoading(false));
  };


  return (
    <>
    <Button
        label="Create User"
        type="primary"
        onClick={() => {
          setEditMode(Variant.REGISTER);
          setModalEditOpen(true);
        }}
      />

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
                  <Link
                    href="#"
                    // onClick={() => handleViewUser(user._id.toString())}
                    // data-modal-target="user-detail-modal"
                    // data-modal-toggle="user-detail-modal"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* MODAL EDITING */}
      {modalEditOpen && (
        <Modal onClose={() => setModalEditOpen(false)} title={"Create User"} additionalClass="min-h-[500px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            
          <div className="form">
            <div>
              <div><label>Username</label></div>
              <input className="custom-input" minLength={6} maxLength={50}
                {...register("username", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Tên đăng nhập chỉ chứa ký tự và số",
                  },
                  minLength: {
                    value: 6,
                    message: "Tên đăng nhập phải có ít nhất 6 ký tự",
                  },
                  maxLength: {
                    value: 50,
                    message: "Tên đăng nhập không được quá 50 ký tự",
                  }
                })}
              />
               <FormErrorMessage>{errors?.username && errors.username.message}</FormErrorMessage>
            </div>
            <div>
              <div><label>Email</label></div>
              <input className="custom-input" 
                {...register("email", {
                  required: true,
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ"
                  },
                })}
               />
               <FormErrorMessage>{errors?.email && errors.email.message}</FormErrorMessage>
            </div>
            <div>
            <div><label>Password</label></div>
              <input type="password" className="custom-input"
               {...register("password", {
                required: true,
                minLength:  {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự"
                }               
              })}
              />
              <FormErrorMessage>{errors?.password && errors.password.message}</FormErrorMessage>
            </div>
            <div>
            <div><label>Re-Password</label></div>
              <input  type="password" className="custom-input" 
                 {...register("rePassword", {
                  required: true,
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Mật khẩu không khớp";
                  }           
                })}
              />
              <FormErrorMessage>{errors?.rePassword && errors.rePassword.message}</FormErrorMessage>
            </div>
            <div>
            <div><label>Role</label></div>
              {/* <SelectBox 
                additionalClass="custom-input" 
                value={role.toString()}
                items={[
                  { key: UserRoleType.ADMIN.toString(), value: "Super Admin" },
                  { key: UserRoleType.USER.toString(), value: "User" }
                ]}
                /> */}
              <select className="custom-input" value={role} onChange={e=> {
                setRole(parseInt(e.target.value))
              }}>
                <option value={UserRoleType.ADMIN}>Super Admin</option>
                <option value={UserRoleType.USER}>User</option>
              </select>
            </div>
          </div>
          <div className="my-4">
            <Button
              label="Save"
              type="success"
              // onClick={}
              className="mr-1"
            />
            <Button
              label="Cancel"
              type="outline"
              onClick={() => setModalEditOpen(false)}
            />
          </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Users;
