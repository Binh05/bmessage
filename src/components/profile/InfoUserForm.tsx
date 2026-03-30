import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";

type IUserInfo = {
  key: keyof Pick<User, "username" | "email" | "phone">;
  label: string;
  type?: string;
};

const USER_INFO: IUserInfo[] = [
  { key: "username", label: "Tên tài khoản" },
  { key: "email", label: "Email", type: "email" },
];

interface UserInfoFormProps {
  user: User | null;
}

const userInfoSchema = z.object({
  phone: z
    .string()
    .trim()
    .length(10, "Số điện thoại không hợp lệ")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số")
    .optional(),
  bio: z.string().trim().max(200, "Tối đa 200 chữ").optional(),
});

type IUserInfoForm = z.infer<typeof userInfoSchema>;

export default function InfoUserForm({ user }: UserInfoFormProps) {
  if (!user) return;
  const { updateProfile } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserInfoForm>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      phone: user.phone || "",
      bio: user.bio || "",
    },
  });

  const updateInfoSubmit = async (data: IUserInfoForm) => {
    await updateProfile(data.phone, data.bio);
  };

  return (
    <Card className="glass-strong border-border/30">
      <CardHeader>
        <CardTitle>Thông tin tài khoản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={handleSubmit(updateInfoSubmit)}
        >
          {USER_INFO.map(({ key, label, type }) => (
            <div key={key} className="space-y-4">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type={type ?? "text"}
                value={user[key] ?? ""}
                disabled
              />
            </div>
          ))}
          <div className="space-y-4">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" type={"text"} {...register("phone")} />
            {errors.phone && (
              <div className="text-destructive mt-2 text-sm">
                <p>{errors.phone.message}</p>
              </div>
            )}
          </div>
          <div className="col-span-2 space-y-4">
            <Label htmlFor="bio">Mô tả bản thân</Label>
            <Textarea
              id="bio"
              className="glass-strong border-border/30 resize-none"
              {...register("bio")}
            />
            {errors.bio && (
              <div className="text-destructive mt-2 text-sm">
                <p>{errors.bio.message}</p>
              </div>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-primary col-start-2 w-full justify-self-end transition-opacity hover:opacity-90 md:w-auto"
          >
            Lưu thông tin
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
