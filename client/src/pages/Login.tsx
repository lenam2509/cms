import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import http from "../config/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../stores/userStore";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

type LoginType = z.infer<typeof LoginSchema>;

export const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    http
      .post("/api/auth/login", data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          reset();
          localStorage.setItem("token", res.data.token);
          setUser({
            email: res.data.email,
            id: res.data.id,
            isAdmin: res.data.isAdmin,
            name: res.data.name,
          });
          toast.success("Login success");
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Login failed");
        console.log(err);
      });
  });

  return (
    <div className="container flex justify-center items-center min-h-svh flex-col gap-4 ">
      <h1 className="text-4xl font-bold">CMS LOGIN</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 max-w-[500px] w-full"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className="border-blue-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="border-blue-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit">{isSubmitting ? "Loading..." : "Login"}</Button>
      </form>
    </div>
  );
};
