import { useState } from "react";
import { Heart, Lock, Sparkles } from "lucide-react";
import { Friend } from "@/data/friends";
import PasswordModal from "./PasswordModal";
import MessagePage from "./MessagePage";

interface FriendCardProps {
  friend: Friend;
  index: number;
}

const FriendCard = ({ friend, index }: FriendCardProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleCardClick = () => {
    if (!isUnlocked) {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);
  };

  const handleClose = () => {
    setIsUnlocked(false);
  };

  // Generate pastel colors for each card
  const cardColors = [
    "from-pink-100 via-rose-50 to-pink-50",
    "from-amber-100 via-orange-50 to-yellow-50",
    "from-sky-100 via-blue-50 to-cyan-50",
    "from-emerald-100 via-green-50 to-teal-50",
    "from-violet-100 via-purple-50 to-fuchsia-50",
    "from-rose-100 via-pink-50 to-red-50",
    "from-teal-100 via-cyan-50 to-sky-50",
    "from-yellow-100 via-amber-50 to-orange-50",
  ];

  const colorClass = cardColors[index % cardColors.length];

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`
          relative group cursor-pointer overflow-hidden
          bg-gradient-to-br ${colorClass}
          rounded-xl sm:rounded-2xl p-4 sm:p-6 
          shadow-card hover:shadow-hover
          transform transition-all duration-300
          hover:scale-[1.03] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2
          border border-border/50
          animate-fade-in-up
          active:scale-[0.98]
        `}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        
        {/* Decorative elements */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-30 group-hover:opacity-100 transition-all duration-300">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary group-hover:animate-heart-beat" />
        </div>
        
        {/* Lock indicator */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <div className="bg-card/80 backdrop-blur-sm rounded-full p-1 sm:p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Avatar placeholder */}
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 animate-pulse-soft" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow">
            <span className="text-xl sm:text-2xl font-heading font-bold text-primary group-hover:scale-110 transition-transform">
              {friend.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-sm sm:text-lg text-center text-foreground mb-0.5 sm:mb-1 truncate">
          {friend.name}
        </h3>
        
        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-center text-muted-foreground flex items-center justify-center gap-1">
          <span>คลิกเพื่ออ่าน</span>
          <Heart className="w-3 h-3 text-primary fill-primary" />
        </p>

        {/* Decorative sparkles on hover */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent animate-twinkle" />
        </div>
        <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: "0.3s" }}>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-twinkle" />
        </div>
        <div className="absolute top-1/2 -right-1 opacity-0 group-hover:opacity-60 transition-opacity" style={{ animationDelay: "0.6s" }}>
          <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-primary fill-primary animate-float" />
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
        friendName={friend.name}
        correctPassword={friend.password}
      />

      {/* Message Page */}
      <MessagePage
        isOpen={isUnlocked}
        onClose={handleClose}
        friend={friend}
      />
    </>
  );
};

export default FriendCard;
