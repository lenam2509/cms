import { FaUser, FaBell, FaBars } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
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
// import { toast } from "react-toastify";
import { useUserStore } from "../../stores/userStore";
import { Timer } from "./Timer";
import { useGlobalAlertStore } from "../../stores/globalAlert";

export const Topbar = () => {
  const navigate = useNavigate();
  const userfromStore = useUserStore((state) => state.user);
  const setAlert = useGlobalAlertStore((state) => state.setAlert);
  const setUser = useUserStore((state) => state.setUser);
  const logout = async () => {
    const res = await http.post("/api/auth/logout");
    if (res.status === 200 || res.status === 201) {
      setUser(null);
      localStorage.removeItem("token");
      setAlert({
        message: "Đăng xuất thành công",
        type: "success",
      });
      return navigate("/login");
    } else {
      return setAlert({
        message: res.data.message || "Đăng xuất thất bại",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!userfromStore && !localStorage.getItem("token")) {
      navigate("/login");
      setAlert({
        message: "Vui lòng đăng nhập",
        type: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Timer />
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
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={"/user-info"}>Thông tin cá nhân</Link>
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
