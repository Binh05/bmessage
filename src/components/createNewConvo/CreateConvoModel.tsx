import { MessageCircleMore } from "lucide-react";
import FriendList from "../friend/FriendList";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const CreateConvoModel = () => {
  return (
    <DialogContent className="glass max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl capitalize">
          <MessageCircleMore className="size-5" />
          Bắt đầu cuộc trò chuyện mới
        </DialogTitle>
        <DialogDescription className="sr-only">
          Tạo cuộc trò chuyện mới
        </DialogDescription>
      </DialogHeader>

      <FriendList />
    </DialogContent>
  );
};

export default CreateConvoModel;
