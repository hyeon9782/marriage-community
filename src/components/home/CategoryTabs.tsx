'use client';

import { Category } from '@/types/post';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryTabsProps {
  currentCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ currentCategory, onCategoryChange }: CategoryTabsProps) {
  const categories: Category[] = ['전체', '고민', '질문', '자유'];

  return (
    <div className="flex border-b bg-white sticky top-14 z-40">
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          onClick={() => onCategoryChange(category)}
          className={cn(
            'flex-1 rounded-none h-11',
            currentCategory === category && 'border-b-2 border-primary'
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
} 