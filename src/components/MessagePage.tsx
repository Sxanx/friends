import { X, Heart, Sparkles, Star, Gift, PartyPopper } from "lucide-react";
import { Friend } from "@/data/friends";
import { Button } from "@/components/ui/button";
import ImageCarousel from "./ImageCarousel";

interface MessagePageProps {
  isOpen: boolean;
  onClose: () => void;
  friend: Friend;
}

const MessagePage = ({ isOpen, onClose, friend }: MessagePageProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Floating celebration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${5 + (i * 7) % 90}%`,
              top: `${10 + (i * 11) % 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            {i % 4 === 0 ? (
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-primary fill-primary" />
            ) : i % 4 === 1 ? (
              <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-accent" />
            ) : i % 4 === 2 ? (
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-warm-orange fill-warm-orange" />
            ) : (
              <PartyPopper className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            )}
          </div>
        ))}
      </div>
      
      {/* Content - Scrollable container */}
      <div className="relative h-full overflow-y-auto overscroll-contain">
        <div className="min-h-full flex flex-col items-center justify-start p-3 sm:p-4 py-6 sm:py-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-3 right-3 sm:top-4 sm:right-4 z-10 bg-card/90 backdrop-blur-sm rounded-full p-2.5 sm:p-3 shadow-soft hover:shadow-hover transition-all text-foreground hover:bg-card hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main card */}
          <div className="w-full max-w-2xl bg-card/98 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-hover border border-primary/20 p-5 sm:p-8 md:p-12 animate-slide-up mt-8 sm:mt-4 relative overflow-hidden">
            {/* Card shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" style={{ animationDelay: '1s' }} />
            
            {/* Gift ribbon decoration */}
            <div className="absolute -top-2 -right-2 w-20 h-20 overflow-hidden">
              <div className="absolute top-4 -right-6 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold py-1 px-8 rotate-45 shadow-md">
                <Gift className="w-3 h-3 inline mr-1" />
                Gift
              </div>
            </div>
            
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              {/* Avatar */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 animate-glow" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-soft animate-float border-2 border-white/50">
                  <span className="text-3xl sm:text-5xl font-heading font-bold text-gradient">
                    {friend.name.charAt(0)}
                  </span>
                </div>
                {/* Sparkle decorations around avatar */}
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-accent animate-twinkle" />
                <Heart className="absolute -bottom-1 -left-1 w-4 h-4 text-primary fill-primary animate-twinkle" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Name */}
              <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gradient mb-2 animate-bounce-in">
                ถึง {friend.name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm sm:text-base">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary animate-heart-beat" />
                <span>ข้อความจากใจ</span>
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary animate-heart-beat" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-6 sm:my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-twinkle" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            {/* Image Carousel */}
            {friend.images && friend.images.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <ImageCarousel images={friend.images} friendName={friend.name} />
              </div>
            )}

            {/* Message */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-soft-pink/40 to-soft-pink/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-primary/20 shadow-soft relative overflow-hidden">
                {/* Quote decoration */}
                <div className="absolute top-2 left-3 text-primary/20 text-5xl sm:text-6xl font-serif">"</div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground font-medium break-words whitespace-pre-wrap relative z-10 pt-6 sm:pt-4">
                  "{friend.message}"
                </p>
                <div className="absolute bottom-2 right-3 text-primary/20 text-5xl sm:text-6xl font-serif rotate-180">"</div>
              </div>

              {/* Memory */}
              <div className="bg-gradient-to-br from-secondary/60 to-secondary/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-accent/20 shadow-soft">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-accent fill-accent animate-twinkle" />
                  ความทรงจำที่ดี
                  <Sparkles className="w-4 h-4 text-accent/60" />
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">
                  {friend.memory}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>ด้วยรักและระลึกถึง</span>
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary animate-pulse-soft" />
                <Sparkles className="w-3 h-3 text-accent" />
              </div>

              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-heading font-semibold px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-soft hover:shadow-hover transition-all w-full sm:w-auto hover:scale-105"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                กลับหน้าหลัก
              </Button>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 text-muted-foreground/50 pb-4">
            <Sparkles className="w-3 h-3 text-accent animate-twinkle" />
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-heart-beat" />
            <span className="text-xs sm:text-sm font-heading">ของขวัญจากใจ • ปัจฉิมนิเทศ 2024</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-heart-beat" style={{ animationDelay: '0.3s' }} />
            <Sparkles className="w-3 h-3 text-accent animate-twinkle" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
