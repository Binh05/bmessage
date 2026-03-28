import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ProfileCard from "./ProfileCard";
import { useAppSelector } from "@/lib/hooks";
import { authSelector } from "@/lib/selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import InfoUserForm from "./InfoUserForm";
import ProfileFriendList from "./ProfileFriendList";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileDialog({ open, setOpen }: Props) {
  const { user } = useAppSelector(authSelector);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass-strong beautiful-scrollbar max-h-[95vh] overflow-y-auto border-0 bg-transparent p-0 shadow-2xl">
        <div className="bg-gradient-glass">
          <div className="mx-auto max-w-4xl p-4">
            {/* heading */}
            <DialogHeader className="mb-6">
              <DialogTitle className="text-foreground text-2xl font-bold">
                Profile & Settings
              </DialogTitle>
              <DialogDescription className="sr-only">
                Profile & Settings
              </DialogDescription>
            </DialogHeader>

            <ProfileCard user={user} />

            <Tabs>
              <TabsList className="glass-light mt-2 grid w-full grid-cols-2">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:glass-strong"
                >
                  Tài khoản
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className="data-[state=active]:glass-strong"
                >
                  Bạn bè
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <InfoUserForm user={user} />
              </TabsContent>

              <TabsContent value="friends">
                <ProfileFriendList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
