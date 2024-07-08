import http from "../config/http";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export const getOneUser = async (id: string) => {
  const res = await http.get<User>(`/api/users/findOne/?id=${id}`);
  return res.data;
};
