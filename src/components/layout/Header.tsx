import Link from 'next/link';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 w-full md:w-[375px] h-14 bg-background z-50">
      <div className="px-5 h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          커뮤니티
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="검색">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/my">
            <Button variant="ghost" size="icon" aria-label="내 활동">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 