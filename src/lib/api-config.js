const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
    endpoint,
    method = "GET",
    body = null,
    token = "",
    fetchOptions = {}
) {
    const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
        ...fetchOptions,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);
    return await response.json();
}

export async function apiAuthRequest(endpoint, method = "GET", body = null) {
    try {
        const headers = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(`${baseUrl}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error("Error accessing localStorage:", error);
    }
}
