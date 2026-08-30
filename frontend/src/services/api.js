const API_BASE_URL = "http://127.0.0.1:8001";

function getToken() {
  return localStorage.getItem("access_token");
}

function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
  };
}

/* =========================
   HEALTH CHECK
========================= */

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/`);

  if (!response.ok) {
    throw new Error("Backend is not responding");
  }

  return await response.json();
}

/*
 * Used by TopBar.jsx
 * Returns health status + response latency.
 */
export async function checkHealthWithLatency() {
  const start = performance.now();

  try {
    const response = await fetch(`${API_BASE_URL}/`);

    const end = performance.now();
    const latency = Math.round(end - start);

    if (!response.ok) {
      return {
        online: false,
        latency,
      };
    }

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    return {
      online: true,
      latency,
      data,
    };

  } catch (error) {
    const end = performance.now();

    return {
      online: false,
      latency: Math.round(end - start),
      error: error.message,
    };
  }
}

/* =========================
   ANALYZE MESSAGE
========================= */

export async function analyzeMessage(message) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    if (response.status === 403) {
      throw new Error("Access denied");
    }

    let errorData = {};

    try {
      errorData = await response.json();
    } catch {
      errorData = {};
    }

    throw new Error(
      errorData.detail || "Analysis failed"
    );
  }

  return await response.json();
}

/* =========================
   HISTORY
========================= */

export async function getHistory(limit = 20) {
  const response = await fetch(
    `${API_BASE_URL}/history?limit=${limit}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    throw new Error("Unable to load detection history");
  }

  return await response.json();
}

/* =========================
   STATISTICS
========================= */

export async function getStatistics() {
  const response = await fetch(
    `${API_BASE_URL}/statistics`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    throw new Error("Unable to load statistics");
  }

  return await response.json();
}

/* =========================
   LOGOUT
========================= */

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("current_user");
  localStorage.removeItem("current_username");
  localStorage.removeItem("user_role");
}