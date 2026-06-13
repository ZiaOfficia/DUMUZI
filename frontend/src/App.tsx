import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { CartProvider }       from './context/CartContext';
import { Layout }             from './components/layout/Layout';
import { HomePage }           from './pages/HomePage';
import { AboutPage }          from './pages/AboutPage';
import { FAQPage }            from './pages/FAQPage';
import { ContactPage }        from './pages/ContactPage';
import { ServicesPage }       from './pages/ServicesPage';
import { ServiceDetailPage }  from './pages/ServiceDetailPage';
import BestChocolatePage      from './pages/BestChocolatePage';
import CollectionsPage        from './pages/CollectionsPage';
import { GalleryPage }        from './pages/GalleryPage';
import { BlogListingPage }    from './pages/BlogListingPage';
import { BlogPostPage }       from './pages/BlogPostPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { PrivacyPolicyPage }  from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import AdminLoginPage         from './pages/admin/AdminLoginPage';
import AdminDashboardPage     from './pages/admin/AdminDashboardPage';
import BlogEditorPage         from './pages/admin/BlogEditorPage';
import ProtectedRoute         from './components/admin/ProtectedRoute';
import ScrollToTop            from './components/common/ScrollToTop';
import ThankYouPage           from './pages/ThankYouPage';
import NotFound               from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/"                        element={<HomePage />} />
            <Route path="/about"                   element={<AboutPage />} />
            <Route path="/faq"                     element={<FAQPage />} />
            <Route path="/contact"                 element={<ContactPage />} />
            <Route path="/services"                element={<ServicesPage />} />
            <Route path="/collections"             element={<CollectionsPage />} />
            <Route path="/services/:id"            element={<ServiceDetailPage />} />
            <Route path="/best-chocolate"          element={<BestChocolatePage />} />
            <Route path="/gallery"                 element={<GalleryPage />} />
            <Route path="/blog"                    element={<BlogListingPage />} />
            <Route path="/:year/:month/:day/:slug" element={<BlogPostPage />} />
            <Route path="/blog/:slug"              element={<BlogPostPage />} />
            <Route path="/success-stories"         element={<SuccessStoriesPage />} />
            <Route path="/portfolio"               element={<SuccessStoriesPage />} />
            <Route path="/portfolio/:id"           element={<SuccessStoriesPage />} />
            <Route path="/privacy-policy"          element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service"        element={<TermsOfServicePage />} />
            <Route path="/thank-you"               element={<ThankYouPage />} />
          </Route>

          <Route path="/admin/login"     element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/create"    element={<ProtectedRoute><BlogEditorPage /></ProtectedRoute>} />
          <Route path="/admin/edit/:id"  element={<ProtectedRoute><BlogEditorPage /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
