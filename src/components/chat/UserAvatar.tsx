import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";

function UserAvatar() {
    return (
        <Avatar>
            <AvatarImage />
            <AvatarFallback>FB</AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;
