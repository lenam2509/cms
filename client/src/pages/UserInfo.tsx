import { useState } from "react";
import { Switch } from "../components/ui/switch";
import { useUserStore } from "../stores/userStore";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { useGlobalAlertStore } from "../stores/globalAlert";
import http from "../config/http";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(6, "Tên không được để trống và phải dài hơn 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
});

type UserType = z.infer<typeof UserSchema>;

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [editMode, setEditMode] = useState(false);
  const { setAlert } = useGlobalAlertStore();

  const {
    register,
    handleSubmit,
    // reset,
    control,

    formState: { errors, isSubmitting },
  } = useForm<UserType>({
    defaultValues: {
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
    },
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = handleSubmit((data) => {
    return http
      .put("/api/users/updateInfo", data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setAlert({
            message: "Cập nhật thông tin thành công",
            type: "success",
          });
          setEditMode(false);
          setUser({
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            isAdmin: res.data.isAdmin || false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="edit-mode">Edit mode</label>
          <Switch
            onClick={() => {
              setEditMode(!editMode);
            }}
            checked={editMode}
            id="edit-mode"
            className={editMode ? "!bg-green-500" : "!bg-gray-500"}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-4">
        <div className="flex items-center gap-4">
          <div className="w-1/3">
            <label className="font-bold">ID</label>
          </div>
          <div className="w-2/3">
            <input
              {...register("id")}
              readOnly
              value={user?.id || ""}
              type="text"
              className={
                "w-full rounded-md p-2 border border-gray-500  bg-slate-300"
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="w-1/3">
            <label className="font-bold">Họ và tên</label>
          </div>
          <div className="w-2/3">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  readOnly={!editMode}
                  className={
                    "w-full rounded-md p-2 border border-gray-500 " +
                    (editMode ? "bg-white" : "bg-slate-300")
                  }
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="w-1/3">
            <label className="font-bold">Email</label>
          </div>
          <div className="w-2/3">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  readOnly={!editMode}
                  className={
                    "w-full rounded-md p-2 border border-gray-500 " +
                    (editMode ? "bg-white" : "bg-slate-300")
                  }
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-1/3"></div>
          <div className="w-2/3">
            <Button
              disabled={!editMode}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? (
                <div className="animate-spin p-1">
                  <FaSpinner />
                </div>
              ) : (
                "Lưu"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
