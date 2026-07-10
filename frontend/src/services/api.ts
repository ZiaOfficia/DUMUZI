import { API_BASE_URL } from '../config';
import type {
  User, CartState, Product, ProductsResponse, OrderItem, MyOrder,
} from '../types';

// ── Base fetch wrapper ────────────────────────────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',          // send HttpOnly cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => ({ message: 'Invalid server response' }));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data as T;
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (payload: { name: string; email: string; phone?: string; password: string; confirmPassword: string }) =>
    apiFetch<{ user: User; message: string }>('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    apiFetch<{ user: User; message: string }>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: () =>
    apiFetch<{ message: string }>('/api/users/logout', { method: 'POST' }),

  me: () =>
    apiFetch<{ user: User }>('/api/users/me'),

  getProfile: () =>
    apiFetch<{ user: User }>('/api/users/profile'),

  updateProfile: (payload: { name: string; phone?: string }) =>
    apiFetch<{ user: User; message: string }>('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  changePassword: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    apiFetch<{ message: string }>('/api/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productApi = {
  getAll: (params?: { category?: string; search?: string; page?: number }) => {
    const qs = new URLSearchParams(
      Object.entries(params ?? {}).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      }, {})
    ).toString();
    return apiFetch<ProductsResponse>(`/api/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number) =>
    apiFetch<Product>(`/api/products/${id}`),
};

// ── Cart ─────────────────────────────────────────────────────────────────────
export const cartApi = {
  get: () =>
    apiFetch<CartState>('/api/cart'),

  add: (productId: number, quantity = 1) =>
    apiFetch<CartState & { message: string }>('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),

  update: (cartItemId: number, quantity: number) =>
    apiFetch<CartState & { message: string }>(`/api/cart/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),

  remove: (cartItemId: number) =>
    apiFetch<CartState & { message: string }>(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
    }),

  clear: () =>
    apiFetch<CartState & { message: string }>('/api/cart', { method: 'DELETE' }),
};

// ── Checkout & Orders (requires login — routes are auth-protected) ───────────
export const checkoutApi = {
  createOrder: (payload: {
    items: OrderItem[];
    customer: { name: string; email: string; phone: string };
  }) =>
    apiFetch<{ orderId: string; amount: number; currency: string; key: string }>('/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMyOrders: () =>
    apiFetch<MyOrder[]>('/api/payments/my-orders'),
};
