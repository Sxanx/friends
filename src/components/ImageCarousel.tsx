import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  friendName: string;
}

const ImageCarousel = ({ images, friendName }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-video rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center border border-border">
        <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-xs sm:text-sm">ยังไม่มีรูปภาพ</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main carousel */}
      <div className="overflow-hidden rounded-xl sm:rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full min-w-0"
            >
              <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={image}
                  alt={`${friendName} - รูปที่ ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons - Larger touch targets on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-soft flex items-center justify-center text-foreground hover:bg-card active:scale-95 transition-all"
            aria-label="รูปก่อนหน้า"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-soft flex items-center justify-center text-foreground hover:bg-card active:scale-95 transition-all"
            aria-label="รูปถัดไป"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-primary w-5 sm:w-6"
                  : "bg-primary/30 w-1.5 sm:w-2 hover:bg-primary/50"
              }`}
              aria-label={`ไปรูปที่ ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint */}
      <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
        👆 เลื่อนซ้าย-ขวา เพื่อดูรูปเพิ่มเติม
      </p>
    </div>
  );
};

export default ImageCarousel;
