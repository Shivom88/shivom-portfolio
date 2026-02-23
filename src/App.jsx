import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { pagesConfig } from "./pages.config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );

const AuthenticatedApp = () => {
  const { authError, navigateToLogin } = useAuth();

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    }
    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        }
      />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {showLoader ? (
        <LoadingScreen onComplete={() => setShowLoader(false)} />
      ) : (
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      )}
    </div>
  );
}