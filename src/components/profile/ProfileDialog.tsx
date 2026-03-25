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

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileDialog({ open, setOpen }: Props) {
  const { user } = useAppSelector(authSelector);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Profile & Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Profile and Settings
        </DialogDescription>
        <ProfileCard user={user} />

        <Tabs>
          <TabsList className="glass-light grid w-full grid-cols-2">
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
