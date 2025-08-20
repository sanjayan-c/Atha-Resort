"use client";

import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(
      category.toLowerCase().replace(/\s+/g, "-")
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onCategoryChange(category);
  };

  return (
    <nav className="sticky top-[88px] z-40 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        {/* Scrolling layer */}
        <div className="overflow-x-auto no-scrollbar">
          {/* Content layer */}
          <div className="flex items-center gap-3 whitespace-nowrap py-1 min-h-[40px]">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`category-tab ${
                  activeCategory === category ? "active" : ""
                }`}
                variant="ghost"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
