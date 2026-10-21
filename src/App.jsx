import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import RouteAnalytics from './components/RouteAnalytics';
import ProtectedRoute from '@/components/ProtectedRoute';
// Add page imports here
import MarketingLayout from '@/components/marketing/MarketingLayout';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import ExtensionScaffold from '@/pages/ExtensionScaffold';
import Support from '@/pages/Support';
import Privacy from '@/pages/Privacy';
import ThankYou from '@/pages/ThankYou';
import Install from '@/pages/Install';
import Connect from '@/pages/Connect';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import OAuthConsent from '@/pages/OAuthConsent';
import Submission from '@/pages/Submission';
import Screenshots from '@/pages/Screenshots';
import BuildStatus from '@/pages/BuildStatus';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/setup" element={<ExtensionScaffold />} />
        <Route path="/install" element={<Install />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/oauth/consent" element={<OAuthConsent />} />
      <Route
        element={
          <ProtectedRoute
            unauthenticatedElement={<Navigate to="/login?returnTo=/submission" replace />}
          />
        }
      >
        <Route path="/submission" element={<Submission />} />
        <Route path="/screenshots" element={<Screenshots />} />
        <Route path="/build-status" element={<BuildStatus />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <RouteAnalytics />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App