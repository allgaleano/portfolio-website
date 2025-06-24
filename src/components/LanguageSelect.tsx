import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface LanguageOption {
  value: string;
  label: string;
  url: string;
}

interface LanguageSelectProps {
  currentLang: string;
  options: LanguageOption[];
}

export default function LanguageSelect({ currentLang, options }: LanguageSelectProps) {
  const handleLanguageChange = (selectedLang: string) => {
    const selectedOption = options.find(option => option.value === selectedLang);
    if (selectedOption) {
      window.location.href = selectedOption.url;
    }
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <SelectValue>
          <Languages className="text-foreground" /> <span className="hidden sm:block">{options.find(option => option.value === currentLang)?.label}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}