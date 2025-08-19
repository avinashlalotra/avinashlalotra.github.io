import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HelloWorldC from "./pages/HelloWorldC";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Topics from "./pages/Topics";
import Posts from "./pages/Posts";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:slug" element={<BlogPost />} />
              <Route path="/posts/hello-world-c" element={<HelloWorldC />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
