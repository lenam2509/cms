import { Link, useLocation } from "react-router-dom";
import { Links } from "../../contans";

export const Sidebar = () => {
  const location = useLocation();
 

  return (
    <div className="w-[200px] bg-slate-200 min-h-screen border-r border-black md:block hidden px-4">
      <div className="text-center mt-2 font-bold text-lg">CMS ADMIN</div>
      <div className="w-full h-[1px] bg-black"></div>
      <div>
        <ul className="mt-4 flex flex-col">
          {Links.map((link, index) => (
            <li key={index} className="py-2">
              <Link
                to={link.href}
                className={`rounded-md block hover:bg-blue-200 p-2 font-bold ${
                  location.pathname === link.href ? "bg-blue-200" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
