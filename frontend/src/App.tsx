import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { AuthProvider }           from './context/AuthContext';
import { CartProvider }           from './context/CartContext';
import { ToastProvider }          from './components/common/Toast';
import { Layout }                 from './components/layout/Layout';
import ProtectedCustomerRoute     from './components/common/ProtectedCustomerRoute';

// Public pages
import { HomePage }               from './pages/HomePage';
import { AboutPage }              from './pages/AboutPage';
import { FAQPage }                from './pages/FAQPage';
import { ContactPage }            from './pages/ContactPage';
import { ServicesPage }           from './pages/ServicesPage';
import { ServiceDetailPage }      from './pages/ServiceDetailPage';
import BestConfectionsPage        from './pages/BestConfectionsPage';
import CollectionsPage            from './pages/CollectionsPage';
import { GalleryPage }            from './pages/GalleryPage';
import { BlogListingPage }        from './pages/BlogListingPage';
import { BlogPostPage }           from './pages/BlogPostPage';
import { PortfolioListingPage }   from './pages/PortfolioListingPage';
import { PortfolioDetailPage }    from './pages/PortfolioDetailPage';
import { PrivacyPolicyPage }      from './pages/PrivacyPolicyPage';
import { TermsOfServicePage }     from './pages/TermsOfServicePage';
import ThankYouPage               from './pages/ThankYouPage';
import ShopPage                   from './pages/ShopPage';
import BestSellersPage            from './pages/BestSellersPage';
import TrackOrderPage             from './pages/TrackOrderPage';import ShippingDeliveryPage       from './pages/ShippingDeliveryPage';
import ReturnsRefundsPage         from './pages/ReturnsRefundsPage';
import TermsAndConditionsPage     from './pages/TermsAndConditionsPage';import NotFound                   from './pages/NotFound';

// Customer auth pages
import LoginPage                  from './pages/LoginPage';
import RegisterPage               from './pages/RegisterPage';

// Customer protected pages
import ProfilePage                from './pages/ProfilePage';
import CartPage                   from './pages/CartPage';
import CheckoutPage               from './pages/CheckoutPage';
import MyOrdersPage               from './pages/MyOrdersPage';

// Admin pages (unchanged)
import AdminLoginPage             from './pages/admin/AdminLoginPage';
import AdminDashboardPage         from './pages/admin/AdminDashboardPage';
import AdminOrdersPage            from './pages/admin/AdminOrdersPage';
import BlogEditorPage             from './pages/admin/BlogEditorPage';
import ProtectedRoute             from './components/admin/ProtectedRoute';
import ScrollToTop                from './components/common/ScrollToTop';

function App() {
  return (
    // AuthProvider must wrap CartProvider so CartContext can read auth state
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* ── Public routes wrapped in site Layout ──────────────────── */}
              <Route element={<Layout><Outlet /></Layout>}>
                <Route path="/"                        element={<HomePage />} />
                <Route path="/about"                   element={<AboutPage />} />
                <Route path="/faq"                     element={<FAQPage />} />
                <Route path="/contact"                 element={<ContactPage />} />
                <Route path="/services"                element={<ServicesPage />} />
                <Route path="/collections"             element={<CollectionsPage />} />
                <Route path="/shop"                    element={<ShopPage />} />
                <Route path="/best-sellers"           element={<BestSellersPage />} />
                <Route path="/track-order"            element={<TrackOrderPage />} />
                <Route path="/shipping-delivery"     element={<ShippingDeliveryPage />} />
                <Route path="/returns-refunds"       element={<ReturnsRefundsPage />} />
                <Route path="/terms-and-conditions"  element={<TermsAndConditionsPage />} />
                <Route path="/services/:id"            element={<ServiceDetailPage />} />
                <Route path="/best-confections"        element={<BestConfectionsPage />} />
                <Route path="/gallery"                 element={<GalleryPage />} />
                <Route path="/blog"                    element={<BlogListingPage />} />
                <Route path="/:year/:month/:day/:slug" element={<BlogPostPage />} />
                <Route path="/blog/:slug"              element={<BlogPostPage />} />
                <Route path="/portfolio"               element={<PortfolioListingPage />} />
                <Route path="/portfolio/:id"           element={<PortfolioDetailPage />} />
                <Route path="/privacy-policy"          element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service"        element={<TermsOfServicePage />} />
                <Route path="/thank-you"               element={<ThankYouPage />} />
              </Route>

              {/* ── Customer auth pages (no layout chrome) ────────────────── */}
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* ── Customer protected pages (with Layout) ────────────────── */}
              <Route element={<Layout><Outlet /></Layout>}>
                <Route path="/cart"     element={<ProtectedCustomerRoute><CartPage /></ProtectedCustomerRoute>} />
                <Route path="/checkout" element={<ProtectedCustomerRoute><CheckoutPage /></ProtectedCustomerRoute>} />
                <Route path="/profile"  element={<ProtectedCustomerRoute><ProfilePage /></ProtectedCustomerRoute>} />
                <Route path="/my-orders" element={<ProtectedCustomerRoute><MyOrdersPage /></ProtectedCustomerRoute>} />
              </Route>

              {/* ── Admin routes (unchanged) ───────────────────────────────── */}
              <Route path="/admin/login"     element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/orders"   element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
              <Route path="/admin/create"    element={<ProtectedRoute><BlogEditorPage /></ProtectedRoute>} />
              <Route path="/admin/edit/:id"  element={<ProtectedRoute><BlogEditorPage /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
