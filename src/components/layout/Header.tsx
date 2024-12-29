import Link from 'next/link';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50">
      <div className="max-w-screen-md mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          결혼정보
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="검색">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="내 활동">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 