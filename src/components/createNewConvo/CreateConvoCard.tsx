import { Card } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MessageCircle } from "lucide-react";
import CreateConvoModel from "./CreateConvoModel";

const CreateConvoCard = () => {
  return (
    <Card className="transition-smooth glass border-none p-0 active:scale-90">
      <Dialog>
        <DialogTrigger>
          <div className="group flex cursor-pointer items-center gap-4 p-3">
            <div className="bg-gradient-primary transition-bounce rounded-full p-2">
              <MessageCircle className="z-10 size-4 text-white" />
            </div>
            <span className="text-sm font-medium capitalize">
              Bắt đầu cuộc trò chuyện
            </span>
          </div>
        </DialogTrigger>

        <CreateConvoModel />
      </Dialog>
    </Card>
  );
};

export default CreateConvoCard;
