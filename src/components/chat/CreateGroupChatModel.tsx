import { Plus, UserPlus } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import IniviteSuggestionList from "../newGroupChat/InviteSuggestionList";
import SelectedUsersList from "../newGroupChat/SelectedUsersList";
import { useState } from "react";
import { Friend } from "@/types/user";
import { useAppSelector } from "@/lib/hooks";
import { chatSelector, friendSelector } from "@/lib/selector";
import { toast } from "sonner";
import { useChat } from "@/hooks/useChat";

const CreateGroupChatModel = () => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<Friend[]>([]);
  const { friends } = useAppSelector(friendSelector);
  const { loading } = useAppSelector(chatSelector);
  const { createConvo } = useChat();

  const filteredFriends = friends.filter(
    (f) =>
      f.username.includes(search) && !invitedUsers.some((u) => u._id === f._id),
  );

  const handleSelectFriend = (friend: Friend) => {
    setInvitedUsers([...invitedUsers, friend]);
    setSearch("");
  };

  const handleRemoveInvited = (friend: Friend) => {
    setInvitedUsers(invitedUsers.filter((u) => u._id !== friend._id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (invitedUsers.length < 2) {
        toast.warning("Nhóm chat cần có ít nhất 3 người");
        return;
      }

      await createConvo(
        "group",
        groupName,
        invitedUsers.map((i) => i._id),
      );

      setSearch("");
      setInvitedUsers([]);
    } catch (error) {
      console.error("Lỗi khi submit tạo nhóm trong createGroupChatModel");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Tạo nhóm chat"
          variant="ghost"
          className="hover:bg-sidebar-accent z-10 flex size-5 cursor-pointer items-center justify-center rounded-full transition"
        >
          <Plus className="size-4" />
          <span className="sr-only">Tạo nhóm mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="capitalize">Tạo nhóm mới</DialogTitle>
          <DialogDescription className="sr-only">
            Danh sách user để tạo nhóm
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="groupName" className="text-sm font-semibold">
              Tên nhóm
            </Label>
            <Input
              id="groupName"
              placeholder="Nhập tên nhóm..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="glass border-border/50 focus:border-primary/50 transition-smooth"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite" className="text-sm font-semibold">
              Mời thành viên
            </Label>
            <Input
              id="invite"
              placeholder="Nhập tên thành viên muốn mời vào nhóm"
              value={search}
              onChange={(e) => {
                console.log("search: ", e.target.value);
                setSearch(e.target.value);
              }}
              className="glass border-border/50 focus:border-primary/50 transition-smooth"
            />
          </div>

          {search && filteredFriends.length > 0 && (
            <IniviteSuggestionList
              filteredFriends={filteredFriends}
              onSelect={handleSelectFriend}
            />
          )}

          <SelectedUsersList
            invitedUsers={invitedUsers}
            onRemove={handleRemoveInvited}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-chat transition-smooth flex-1 text-white hover:opacity-90"
            >
              {loading ? (
                <span>Đang tạo...</span>
              ) : (
                <>
                  <UserPlus className="mr-2 size-4" />
                  Tạo nhóm
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupChatModel;
