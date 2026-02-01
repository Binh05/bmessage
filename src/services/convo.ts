import { urlBase } from "@/utils/api";

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE ?? urlBase;

export const fetchConversation = async (token: string) => {
    const res = await fetch(`${URL_BASE}/conversations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Loi khi lay danh sach cuoc hoi thoai");
    }

    return data;
};
