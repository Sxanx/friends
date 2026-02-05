import { Heart, Sparkles, GraduationCap, Stars } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative text-center py-12 sm:py-16 md:py-24 overflow-hidden min-h-[50vh] flex flex-col items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary/40 fill-primary/40" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent/40" />
            ) : (
              <Stars className="w-3 h-3 sm:w-4 sm:h-4 text-warm-orange/40" />
            )}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 mb-6 sm:mb-8 shadow-soft animate-glow">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center animate-float">
            <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl mb-3 sm:mb-4 animate-slide-up">
          <span className="text-gradient">ปัจฉิมนิเทศ</span>
        </h1>
        <h2 className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-4 sm:mb-6 animate-slide-up stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
          ข้อความจากใจ <Heart className="inline w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary animate-heart-beat" />
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2 animate-slide-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
          คลิกที่ชื่อเพื่อนเพื่ออ่านข้อความพิเศษ
          <br />
          <span className="text-xs sm:text-sm mt-2 inline-block">
            🔐 ต้องใส่รหัสผ่านเพื่อเปิดอ่านนะ
          </span>
        </p>

        {/* Gift badge */}
        <div className="mt-6 sm:mt-8 animate-bounce-in stagger-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 shadow-soft">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground/80">ของขวัญจากใจ</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 animate-slide-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary animate-pulse-soft" />
          <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
