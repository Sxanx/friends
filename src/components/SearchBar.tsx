import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto px-2 sm:px-0">
      <div className="absolute inset-y-0 left-2 sm:left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="ค้นหาชื่อเพื่อน..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 sm:pl-12 pr-4 py-5 sm:py-6 text-base sm:text-lg rounded-full bg-card border-border shadow-soft focus:shadow-hover transition-shadow font-heading"
      />
    </div>
  );
};

export default SearchBar;
