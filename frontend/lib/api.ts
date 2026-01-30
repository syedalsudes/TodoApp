const BASE_URL = "http://localhost:8000";

async function apiRequest(path: string, method: string, token?: string, body?: any) {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "API Error");
    }
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return await res.json();
    }

    return null;

}

export const api = {
    getTasks: (token?: string) =>
        apiRequest("/api/tasks", "GET", token),

    addTask: (token?: string, data?: any) =>
        apiRequest("/api/tasks", "POST", token, data),

    deleteTask: (token?: string, id?: number) =>
        apiRequest(`/api/tasks/${id}`, "DELETE", token),

    toggleTask: (token?: string, id?: number) =>
        apiRequest(`/api/tasks/${id}/complete`, "PATCH", token),
    updateTask: (token?: string, id?: number, data?: any) =>
        apiRequest(`/api/tasks/${id}`, "PUT", token, data),
};
