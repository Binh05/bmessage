import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ISearchedUser, IUseFormSearch } from "../chat/AddFriendModel";
import { FormEvent } from "react";
import FriendCard from "../friend/FriendCard";

interface searchFormProps {
  errors: FieldErrors<IUseFormSearch>;
  usernameValue: string;
  isSubmitting: boolean;
  isFound: boolean;
  searchUsername: string;
  register: UseFormRegister<IUseFormSearch>;
  searchHandle: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  user: ISearchedUser | null;
}

function SearchFriendForm({
  register,
  errors,
  usernameValue,
  searchHandle,
  isSubmitting,
  isFound,
  searchUsername,
  onCancel,
  user,
}: searchFormProps) {
  return (
    <form onSubmit={searchHandle}>
      <div className="space-y-4">
        {/* Input */}
        <InputGroup className="glass border-border/50 focus:border-primary/50 transition-smooth">
          <InputGroupInput
            placeholder="Nhập email để tìm kiếm ..."
            {...register("email", {
              required: "Email khong duoc de trong",
            })}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {/* error */}
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
        {/* Not found */}
        {!isFound && <p>Không tìm thất @{searchUsername}</p>}
        {/* List */}
        <div className="beautiful-scrollbar max-h-120 space-y-4 overflow-scroll">
          {isFound && user != null && (
            <FriendCard key={user._id} user={user} isFriend={user.isFriend} />
          )}
        </div>
        {/* Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={onCancel}
              variant={"outline"}
              className="cursor-pointer"
            >
              Hủy
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isSubmitting || !usernameValue?.trim()}
            className="bg-gradient-primary cursor-pointer font-medium hover:opacity-90"
          >
            Tìm
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
}

export default SearchFriendForm;
