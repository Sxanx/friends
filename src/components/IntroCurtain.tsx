import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IntroCurtainProps {
  onEnter: () => void;
  onPlayMusic: () => void;
}

const IntroCurtain = ({ onEnter, onPlayMusic }: IntroCurtainProps) => {
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    onPlayMusic();   // 🎵 เพลงดังตรงนี้
    setOpen(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* ม่านซ้าย */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 bg-black"
            animate={{ x: open ? "-100%" : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* ม่านขวา */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 bg-black"
            animate={{ x: open ? "100%" : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* เนื้อหา */}
          <motion.div
            className="relative z-10 text-center text-white px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs tracking-widest opacity-60 mb-3">
              FRIENDSHIP • MEMORY • TIME
            </p>

            <h1 className="text-3xl md:text-4xl font-light leading-relaxed mb-4">
              บางความทรงจำ  
              <br />
              ไม่จำเป็นต้องดัง
            </h1>

            <p className="text-xs opacity-50 mb-8">
              แค่เปิดใจ… ก็ได้ยินแล้ว
            </p>

            <button
              onClick={handleEnter}
              className="px-8 py-3 rounded-full border border-white/40 text-sm
              hover:bg-white hover:text-black transition-all"
            >
              เปิดม่าน
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroCurtain;
