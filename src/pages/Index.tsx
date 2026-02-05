import { useState, useMemo } from "react";
import { Heart } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import FriendCard from "@/components/FriendCard";
import { friends } from "@/data/friends";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;
    
    const query = searchQuery.toLowerCase().trim();
    return friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(query) ||
        friend.nickname.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen gradient-warm">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-16">
        {/* Search Bar */}
        <div className="mb-8 sm:mb-12">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Friends Grid */}
        {filteredFriends.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {filteredFriends.map((friend, index) => (
              <FriendCard key={friend.id} friend={friend} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-2">
              ไม่พบชื่อที่ค้นหา
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              ลองค้นหาด้วยชื่ออื่นดูนะ 💕
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-primary" />
            <span className="font-heading text-xs sm:text-sm">
              สร้างด้วยความรัก • ปัจฉิมนิเทศ 2024
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
