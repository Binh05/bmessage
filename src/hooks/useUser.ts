import { userService } from "@/services/userService";

export const useUser = () => {
  const searchUser = async (email: string) => {
    try {
      const data = await userService.searchUser(email);

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
