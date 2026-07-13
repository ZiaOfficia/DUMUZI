import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { API_BASE_URL } from "../../config";

// ── Types matching backend admin order endpoints ──────────────────────────────
interface AdminOrderItem {
  productId?: number;
  name: string;
  price: number;
  quantity: number;
}

interface AdminOrder {
  id: string;
  orderId: string;
  paymentId: string | null;
  amount: number; // paise
  currency: string;
  status: string;
  paymentMethod: "razorpay" | "cod";
  customer: { name: string; email: string; phone: string };
  shippingAddress: { address: string | null; city: string | null; state: string | null; pincode: string | null };
  notes: string | null;
  items: AdminOrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  total: number;
  byStatus: Record<string, number>;
  revenuePaise: number;
}

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled", "failed"] as const;

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  paid:      "bg-green-500/15 text-green-400 border-green-500/30",
  shipped:   "bg-blue-500/15 text-blue-400 border-blue-500/30",
  delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cancelled: "bg-stone-500/15 text-stone-400 border-stone-500/30",
  failed:    "bg-red-500/15 text-red-400 border-red-500/30",
};

const formatINR = (paise: number) =>
  `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders]     = useState<AdminOrder[]>([]);
  const [stats, setStats]       = useState<OrderStats | null>(null);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<string>("all");
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const authHeaders = useCallback((): Record<string, string> => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  }), []);

  // Redirect to admin login when the token is missing/expired
  const handleAuthFailure = useCallback((res: Response) => {
    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
      return true;
    }
    return false;
  }, [navigate]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "20" });
      if (filter !== "all") qs.set("status", filter);

      const res = await fetch(`${API_BASE_URL}/api/payments/admin/orders?${qs}`, {
        headers: authHeaders(),
      });
      if (handleAuthFailure(res)) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setOrders(data.orders);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filter, authHeaders, handleAuthFailure]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/admin/orders/stats`, {
        headers: authHeaders(),
      });
      if (handleAuthFailure(res)) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStats(await res.json());
    } catch (err) {
      console.error("Error fetching order stats:", err);
    }
  }, [authHeaders, handleAuthFailure]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const changeStatus = async (order: AdminOrder, status: string) => {
    if (status === order.status) return;
    setUpdating(order.id);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/payments/admin/orders/${order.id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ status }),
        }
      );
      if (handleAuthFailure(res)) return;
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to update order status");
        return;
      }
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
      fetchStats(); // keep the cards in sync
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const changeFilter = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-stone-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-stone-100">Orders</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/admin/dashboard" className="flex-1 md:flex-none">
              <Button variant="primary" className="w-full md:w-auto">
                Blog Panel
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-stone-300 border-stone-600 hover:bg-stone-800 flex-1 md:flex-none text-center justify-center"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4">
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-stone-100">{stats.total}</p>
            </div>
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4">
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Revenue (collected)</p>
              <p className="text-2xl font-bold text-green-400">{formatINR(stats.revenuePaise)}</p>
            </div>
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4">
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.byStatus.pending ?? 0}</p>
            </div>
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4">
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-400">{stats.byStatus.paid ?? 0}</p>
            </div>
          </div>
        )}

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => changeFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors border ${
                filter === s
                  ? "bg-stone-100 text-stone-900 border-stone-100 font-semibold"
                  : "bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-200"
              }`}
            >
              {s}
              {s !== "all" && stats?.byStatus[s] ? ` (${stats.byStatus[s]})` : ""}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-stone-700 bg-stone-900/50 text-stone-400 font-medium text-sm">
            <div className="col-span-2">Date</div>
            <div className="col-span-3">Customer</div>
            <div className="col-span-2">Items</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-3 text-right">Status</div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-stone-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-stone-400">
              {filter === "all" ? "No orders yet." : `No ${filter} orders.`}
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border-b border-stone-700/50">
                <div
                  className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 p-4 items-start md:items-center hover:bg-stone-700/30 transition-colors text-stone-300 cursor-pointer"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <div className="md:col-span-2 text-sm text-stone-400">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                    <span className="block text-xs text-stone-500">
                      {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="md:col-span-3 min-w-0">
                    <p className="font-medium text-stone-200 truncate">{order.customer.name}</p>
                    <p className="text-xs text-stone-500 truncate">{order.customer.email}</p>
                    <p className="text-xs text-stone-500">{order.customer.phone}</p>
                  </div>

                  <div className="md:col-span-2 text-sm">
                    {order.items.reduce((n, i) => n + i.quantity, 0)} item
                    {order.items.reduce((n, i) => n + i.quantity, 0) !== 1 ? "s" : ""}
                    <span className="block text-xs text-stone-500">
                      {expanded === order.id ? "click to collapse" : "click for details"}
                    </span>
                  </div>

                  <div className="md:col-span-2 md:text-right font-semibold text-stone-100">
                    {formatINR(order.amount)}
                  </div>

                  <div
                    className="md:col-span-3 flex md:justify-end items-center gap-2 w-full md:w-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {order.paymentMethod === "cod" && (
                      <span className="px-2.5 py-1 rounded-full text-xs border bg-amber-500/15 text-amber-400 border-amber-500/30">
                        COD
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs capitalize border ${
                        STATUS_STYLES[order.status] ?? STATUS_STYLES.pending
                      }`}
                    >
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => changeStatus(order, e.target.value)}
                      className="bg-stone-900 border border-stone-600 text-stone-300 text-xs rounded px-2 py-1.5 outline-none focus:border-stone-400 disabled:opacity-50"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expanded item details */}
                {expanded === order.id && (
                  <div className="px-4 pb-4 md:px-8">
                    <div className="bg-stone-900/60 rounded-lg p-4 text-sm">
                      <p className="text-xs text-stone-500 mb-2">
                        Order ref: <span className="text-stone-400">{order.orderId}</span>
                        {" · "}
                        <span className="text-stone-400">
                          {order.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
                        </span>
                        {order.paymentId && (
                          <> · Payment: <span className="text-stone-400">{order.paymentId}</span></>
                        )}
                      </p>
                      {(order.shippingAddress?.address || order.notes) && (
                        <div className="mb-3 p-3 rounded-lg bg-stone-800/60 border border-stone-700/50 text-xs text-stone-400">
                          {order.shippingAddress?.address && (
                            <p>
                              <span className="text-stone-500">Deliver to: </span>
                              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state} – {order.shippingAddress.pincode}
                            </p>
                          )}
                          {order.notes && (
                            <p className="mt-1">
                              <span className="text-stone-500">Notes: </span>
                              {order.notes}
                            </p>
                          )}
                        </div>
                      )}
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-stone-500 text-xs uppercase">
                            <th className="py-1 pr-4 font-medium">Product</th>
                            <th className="py-1 pr-4 font-medium">Price</th>
                            <th className="py-1 pr-4 font-medium">Qty</th>
                            <th className="py-1 font-medium text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, i) => (
                            <tr key={i} className="text-stone-300 border-t border-stone-700/40">
                              <td className="py-2 pr-4">{item.name}</td>
                              <td className="py-2 pr-4">₹{item.price}</td>
                              <td className="py-2 pr-4">{item.quantity}</td>
                              <td className="py-2 text-right">₹{item.price * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6 text-stone-400">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 bg-stone-800 border border-stone-700 rounded disabled:opacity-40 hover:text-stone-200"
            >
              Previous
            </button>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-stone-800 border border-stone-700 rounded disabled:opacity-40 hover:text-stone-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
