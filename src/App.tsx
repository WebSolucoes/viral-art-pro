
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateBanner from "./pages/CreateBanner";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NewDashboard from "./pages/NewDashboard";
import SportsEvents from "./pages/SportsEvents";
import MoviesAndSeries from "./pages/MoviesAndSeries";
import MyBanners from "./pages/MyBanners";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <NewDashboard />
            </ProtectedRoute>
          } />
          <Route path="/sports" element={
            <ProtectedRoute>
              <SportsEvents />
            </ProtectedRoute>
          } />
          <Route path="/movies" element={
            <ProtectedRoute>
              <MoviesAndSeries />
            </ProtectedRoute>
          } />
          <Route path="/banners" element={
            <ProtectedRoute>
              <MyBanners />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateBanner />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
