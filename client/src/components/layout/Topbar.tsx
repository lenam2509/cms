import { FaUser, FaBell, FaBars } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Links } from "../../contans";
import http from "../../config/http";
import { toast } from "react-toastify";
import { useUserStore } from "../../stores/userStore";

export const Topbar = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userfromStore = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const logout = async () => {
    const res = await http.post("/api/auth/logout");
    if (res.status === 200 || res.status === 201) {
      setUser(null);
      localStorage.removeItem("token");
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } else {
      toast.error("Đăng xuất thất bại lỗi server");
      console.log(res);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-200 min-h-[50px] border-b border-black flex items-center justify-between px-4 ">
      <div className="flex gap-2 font-bold items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div>
              <FaBars className="cursor-pointer block md:hidden" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <span className="font-bold">CMS ADMIN</span>
              </SheetTitle>
              <SheetDescription>
                <span>Chào mừng bạn đến với hệ thống quản trị</span>
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {Links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`rounded-md block hover:bg-blue-200 p-2 font-bold ${
                    location.pathname === link.href ? "bg-blue-200" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <span>{time.toLocaleTimeString()}</span>
        <span>{time.toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-4 text-lg">
        <div className="relative">
          <FaBell cursor={"pointer"} />
          <Badge
            variant={"destructive"}
            className="absolute -top-3 left-2 text-white px-1"
          >
            0
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaUser />
              <span className="text-sm font-bold">
                {userfromStore?.name || "User"}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" text-red-500 font-bold">
            <DropdownMenuItem className="cursor-pointer">
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <hr />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
