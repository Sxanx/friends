import { useState } from "react";
import { X, Lock, Heart, Sparkles, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  friendName: string;
  correctPassword: string;
}

const PasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  friendName,
  correctPassword,
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setPassword("");
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-lg"
        onClick={handleClose}
      />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10) % 60}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {i % 2 === 0 ? (
              <Heart className="w-6 h-6 text-primary fill-primary" />
            ) : (
              <Sparkles className="w-5 h-5 text-accent" />
            )}
          </div>
        ))}
      </div>
      
      {/* Modal */}
      <div 
        className={`
          relative bg-card/98 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md
          shadow-hover border border-primary/20
          transform transition-all duration-300
          ${shake ? 'animate-shake' : 'animate-fade-in-up'}
        `}
        style={{
          animation: shake ? 'shake 0.5s ease-in-out' : undefined,
        }}
      >
        {/* Decorative gradient border */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors bg-card/50 rounded-full p-1.5 hover:bg-card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-glow" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm">
            <KeyRound className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-center text-gradient mb-1 sm:mb-2">
          ข้อความถึง {friendName}
        </h2>
        <p className="text-center text-muted-foreground mb-5 sm:mb-6 text-sm sm:text-base">
          กรุณาใส่รหัสผ่านเพื่ออ่านข้อความ
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <Input
              type="password"
              placeholder="รหัสผ่าน..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`
                text-center text-base sm:text-lg py-5 sm:py-6 bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20
                ${error ? 'border-destructive ring-destructive/20 ring-2' : ''}
              `}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-xs sm:text-sm text-center mt-2 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" />
                รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะ 💔
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-5 sm:py-6 text-base sm:text-lg font-heading font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-soft hover:shadow-hover rounded-xl"
          >
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            เปิดอ่านข้อความ
          </Button>
        </form>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground mt-5 sm:mt-6 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-accent" />
          💡 ขอรหัสผ่านจากคนที่สร้างเว็บนี้นะ
          <Sparkles className="w-3 h-3 text-accent" />
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordModal;
