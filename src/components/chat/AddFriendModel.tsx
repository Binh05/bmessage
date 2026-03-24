import { useForm } from "react-hook-form";
import SearchFriendForm from "../addFriendModel/SearchFriendForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserPlus } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { User } from "@/types/user";

export interface IUseFormSearch {
  email: string;
}

export interface ISearchedUser extends User {
  isFriend: boolean;
}

export default function AddFriendModel() {
  const [isFound, setIsFound] = useState<boolean>(true);
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchedUser, setSearchedUser] = useState<ISearchedUser | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IUseFormSearch>({
    defaultValues: {
      email: "",
    },
  });
  const { searchUser } = useUser();

  const usernameValue = watch("email");

  const searchSubmit = handleSubmit(async (data) => {
    const { user } = await searchUser(data.email.trim());
    setSearchUsername(data.email);

    console.log(user);

    setIsFound(user != null);
    setSearchedUser(user);
  });

  const handleCancel = () => {
    reset();
    setSearchUsername("");
    setSearchedUser(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-sidebar-accent z-10 flex size-5 cursor-pointer items-center justify-center rounded-full">
          <UserPlus />
          <span className="sr-only">Kết bạn</span>
        </div>
      </DialogTrigger>
      <DialogContent className="border-border/30 glass max-h-[95vh] sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Tìm người dùng</DialogTitle>
          <DialogDescription>
            Khám phá và kết nối những người bạn mới
          </DialogDescription>
        </DialogHeader>

        <SearchFriendForm
          register={register}
          errors={errors}
          searchHandle={searchSubmit}
          usernameValue={usernameValue}
          isSubmitting={isSubmitting}
          isFound={isFound}
          searchUsername={searchUsername}
          onCancel={handleCancel}
          user={searchedUser}
        />
      </DialogContent>
    </Dialog>
  );
}
