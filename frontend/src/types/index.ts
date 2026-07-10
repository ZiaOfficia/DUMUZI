// ── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: 'customer' | 'admin_customer';
  isVerified: boolean;
  createdAt: string;
}

// ── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  brandName: string;
  productName: string;
  image: string;
  description: string;
  mrp: number;
  category: 'HEART' | 'DISPLAY' | 'BONBON' | 'OVAL';
  inStock: boolean;
}

// ── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItemWithProduct {
  id: number;         // CartItem row id
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  product: Product;
}

export interface CartState {
  items: CartItemWithProduct[];
  totalItems: number;
  totalPrice: number;
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// ── API Responses ─────────────────────────────────────────────────────────────
export interface ApiError {
  message: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

// ── Order (future-ready) ──────────────────────────────────────────────────────
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

export interface CheckoutPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface MyOrder {
  id: number;
  orderId: string;      // razorpay_order_id
  amount: number;       // in paise
  currency: string;
  status: 'pending' | 'paid' | 'failed';
  items: OrderItem[];
  createdAt: string;
}
