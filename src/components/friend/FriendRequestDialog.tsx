import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useFriend } from "@/hooks/useFriend";
import SentRequest from "./SentRequest";
import ReceivedRequest from "./ReceivedRequest";

interface FriendRequestProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FriendRequestDialog = ({ open, setOpen }: FriendRequestProps) => {
  const [tabs, setTabs] = useState<string>("received");
  const { getFriendRequest } = useFriend();

  const getRequests = async () => {
    await getFriendRequest();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-border/30 beautiful-scrollbar max-h-[95vh] overflow-x-hidden overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Lời mời kết bạn</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={tabs} onValueChange={setTabs}>
          <TabsList className="glass-light mb-2 w-full grid-cols-2">
            <TabsTrigger
              value="received"
              className="data-[state=active]:glass-strong"
            >
              Nhận được
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              className="data-[state=active]:glass-strong"
            >
              Đã gửi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="received">
            <ReceivedRequest />
          </TabsContent>
          <TabsContent value="sent">
            <SentRequest />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestDialog;
