import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type IUserInfo = {
  key: keyof Pick<User, "username" | "email" | "phone">;
  label: string;
  type?: string;
};

const USER_INFO: IUserInfo[] = [
  { key: "username", label: "Tên tài khoản" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Số điện thoại" },
];

interface UserInfoFormProps {
  user: User | null;
}

export default function InfoUserForm({ user }: UserInfoFormProps) {
  if (!user) return;

  return (
    <Card className="glass-strong border-border/30">
      <CardHeader>
        <CardTitle>Thông tin tài khoản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {USER_INFO.map(({ key, label, type }) => (
            <div key={key} className="space-y-4">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type={type ?? "text"}
                value={user[key] ?? ""}
                onChange={() => {}}
              />
            </div>
          ))}
          <div className="col-span-2 space-y-4">
            <Label htmlFor="bio">Mô tả bản thân</Label>
            <Textarea
              id="bio"
              value={user.bio ?? ""}
              onChange={() => {}}
              className="glass-strong border-border/30 resize-none"
            />
          </div>
          <Button className="bg-gradient-primary col-start-2 w-full justify-self-end transition-opacity hover:opacity-90 md:w-auto">
            Lưu thông tin
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
