import { userService } from "@/services/userService";

export const useUser = () => {
  const searchUser = async (username: string) => {
    try {
      const data = await userService.searchUser(username);

      console.log("search user data", data);
      return data;
    } catch (error) {
      console.error("Loi khi search user", error);
    }
  };

  return {
    searchUser,
  };
};
