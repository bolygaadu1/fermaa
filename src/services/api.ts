const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use relative URLs in production
  : ''; // Use relative URLs in development (Vite proxy will handle routing)

// Order API functions
export const orderAPI = {
  // Get all orders
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },

  // Create new order
  create: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  },

  // Get order by ID
  getById: async (orderId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  },

  // Update order status
  updateStatus: async (orderId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
    return response.json();
  },

  // Delete all orders
  deleteAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete orders');
    }
    return response.json();
  },
};

// File API functions
export const fileAPI = {
  // Upload files
  upload: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload files');
    }
    return response.json();
  },

  // Get all files
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/files`);
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    return response.json();
  },

  // Delete all files
  deleteAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/files`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete files');
    }
    return response.json();
  },
};

// Admin API functions
export const adminAPI = {
  // Login
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    return response.json();
  },
};