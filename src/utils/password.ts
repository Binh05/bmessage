import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Mã hóa mật khẩu trước khi lưu DB
 */
export async function hashPassword(password: string): Promise<string> {
    if (!password) {
        throw new Error("Password is required");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
}

/**
 * So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
        return false;
    }

    return bcrypt.compare(password, hashedPassword);
}
