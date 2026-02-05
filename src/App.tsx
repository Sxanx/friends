import { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroCurtain from "./components/IntroCurtain";
import BackgroundMusic, {
  BackgroundMusicHandle,
} from "./components/BackgroundMusic";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  const [entered, setEntered] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  return (
    <>
      <BackgroundMusic ref={musicRef} />

      {!entered && (
        <IntroCurtain
          onPlayMusic={() => musicRef.current?.play()}
          onEnter={() => setEntered(true)}
        />
      )}

      {entered && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
