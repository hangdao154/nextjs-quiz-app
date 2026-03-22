'use client';

import { Button } from '@/components/ui';
import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, ReactNode } from 'react';

interface INavLinkProps extends React.ComponentProps<'nav'> {
  items: {
    label: string;
    icon: ReactNode;
    href: string;
  }[];
}

const NavLinks: FC<INavLinkProps> = ({ items, ...props }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2" {...props}>
      {items.map((item) => (
        <Link href={item.href} key={item.label}>
          <Button
            variant="ghost"
            className={cn(
              'hover:bg-primary-800! w-full justify-start font-semibold text-white',
              pathname === item.href &&
                'bg-primary hover:bg-primary-40! text-black hover:text-black!'
            )}
          >
            {item.icon}
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
