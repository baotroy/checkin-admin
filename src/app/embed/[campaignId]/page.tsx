"use client";
import { ICampaign } from "@/app/types";
import request from "@/common/api";
import { useEffect, useState } from "react";
import Loader from "@/app/embed/components/loader";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { dateFormat, getTimezoneOffsetFormat } from "@/common/utils";
import FormErrorMessage from "@/app/components/FormErrorMessage";

interface IFormInput {
  name: string;
  phone: string;
  email?: string;
}

interface IParams {
  campaignId: string;
}

const Embed = ({ params }: { params: IParams }) => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    request("/campaigns/register/" + params.campaignId, "POST", data)
      .then(() => {
        toast.success("Đăng kí thành công");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setError("phone", {
            type: "manual",
            message: "Số điện thoại đã đăng kí",
          })
        }

        toast.error("Đăng kí thất bại, đã có lỗi xảy ra");
      })
      .finally(() => setLoading(false));
  };



  useEffect(() => {
    request("/campaigns/" + params.campaignId, "GET")
      .then((campaign) => {
        setCampaign(campaign.data);
      })
      .catch(() => {
        setCampaign(null);
      })
      .finally(() => setLoading(false));
  }, [params.campaignId]);

  const resetForm = () => {
    reset({
      name: "",
      phone: "",
      email: "",
    });
  };
  return (
    <>
      {loading ? (
        <div className="min-h-[100vh]">
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
                    required
                    {...register("name", { required: true })}
                  />
                  <FormErrorMessage errors={errors} fieldName="name" />
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
                    required
                    {...register("phone", {
                      required: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                  <FormErrorMessage errors={errors} fieldName="phone" />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <div>
                  <input
                  id="email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                  <FormErrorMessage errors={errors} fieldName="email" />
                </div>
              </div>
            </div>
            <div className="float-right mt-2">
              <button
                className="custom-button primary mr-2"
                disabled={loading}
                type="submit"
              >
                Đăng kí
              </button>
              <button className="custom-button outline" onClick={resetForm} disabled={loading}>
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
