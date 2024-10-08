const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerr = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchInvoices = async () => {
  const response = await fetch(`${API_BASE_URL}/api/invoices`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  response.json();
};

export const deleteInvoice = async (invoiceId) => {
  console.log(invoiceId);
  try {
    const response = await fetch(`${API_BASE_URL}/api/invoices/${invoiceId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the invoice");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};
