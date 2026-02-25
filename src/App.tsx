import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BackgroundMusic from "./components/BackgroundMusic";
import IntroCurtain from "./components/IntroCurtain";
import { useState } from "react";
const queryClient = new QueryClient();

const App = () => {
  const [entered, setEntered] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BackgroundMusic />

        {!entered ? (
          // 👇 ถ้ายังไม่เข้าเว็บ แสดงแค่ Intro อย่างเดียว
          <IntroCurtain
            onEnter={() => setEntered(true)}
            onPlayMusic={() => {}}
          />
        ) : (
          // 👇 เข้าแล้วค่อย render Router
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        )}

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
