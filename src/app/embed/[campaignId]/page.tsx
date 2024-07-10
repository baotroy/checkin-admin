"use client";
import { ICampaign } from "@/app/types";
import request from "@/common/api";
import { FormEvent, useEffect, useState } from "react";
import Loader from "@/app/embed/components/loader";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { dateFormat, getTimezoneOffsetFormat } from "@/common/utils";
import Error from 'next/error'

interface IFormInput {
  name: string;
  phone: string;
  email?: string;
}

interface IParams {
  campaignId: string;
}

const Embed = ({ params }: { params: IParams }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    request("/campaigns/register/" + params.campaignId, "POST", data)
      .then(() => {
        // reset();
        toast.success("Đăng kí thành công");
      })
      .catch(() => {
        toast.error("Đăng kí thất bại, đã có lỗi xảy ra");
      })
      .finally(() => setLoading(false));
  };

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // fetch campaign by id
    request("/campaigns/" + params.campaignId, "GET")
      .then((campaign) => {
        setCampaign(campaign.data);
      })
      .catch(() => {
        setCampaign(null);
      })
      .finally(() => setLoading(false));
  }, [params.campaignId]);

  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setLoading(true);
  //   request("/campaigns/register/" + params.campaignId, "POST", {
  //     name,
  //     phone,
  //     email,
  //   })
  //     .then(() => {
  //       reset();
  //       toast.success("Đăng kí thành công");
  //     })
  //     .finally(() => setLoading(false));
  // }

  // const submit = () => {
  //   setLoading(true);
  //   request("/campaigns/register/" + params.campaignId, "POST", {
  //     name,
  //     phone,
  //     email,
  //   })
  //     .then(() => {
  //       reset();
  //       toast.success("Đăng kí thành công");
  //     })
  //     .finally(() => setLoading(false));
  // };

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
  };
  return (
    <>
      {loading ? (
        <div className="flex min-h-screen flex-row items-center justify-center">
          <Loader />
        </div>
      ) : campaign === null ? <>Sự kiện không tồn tại!</> : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <h1>Đăng kí</h1>
            <div className="mb-2">
              Tên sự kiện:  {campaign?.name} <br />
              Địa chỉ: {campaign?.address} {campaign?.provinceId?.name} <br />
              Thời gian: {dateFormat(campaign?.time)} {getTimezoneOffsetFormat()}<br />
            </div>
            <div className="form-register">
              <div>
                <div>
                  <label htmlFor="name">
                    Họ tên <span className="required">(*)</span>
                  </label>
                </div>
                <div>
                  <input
                  id="name"
                    // value={name}
                    required
                    // onChange={(e) => setName(e.target.value)}
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="phone">
                    Phone <span className="required">(*)</span>
                  </label>
                </div>
                <div>
                  <input
                  id="phone"
                    // value={phone}
                    required
                    // onChange={(e) => setPhone(e.target.value)}
                    {...register("phone", {
                      required: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <div>
                  <input
                  id="email"
                    // value={email}
                    type="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <button
                className="custom-button primary mr-2"
                disabled={loading}
                // onClick={submit}
                type="submit"
              >
                Đăng kí
              </button>
              <button className="custom-button outline" onClick={reset}>
                Xóa
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
export default Embed;
