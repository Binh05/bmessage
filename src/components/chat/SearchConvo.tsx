import { useAppSelector } from "@/lib/hooks";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";

interface SearchConvoProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchConvo = ({ value, setValue }: SearchConvoProps) => {
  return (
    <InputGroup>
      <InputGroupInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Tìm kiếm cuộc trò chuyện"
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchConvo;
