import { urlBase } from "@/utils/api";

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE ?? urlBase;

export const signOut = async () => {
    const res = await fetch(`${URL_BASE}/auth/signout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Loi khi dang xuat");
    }
};
