// NavMain.tsx
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { Link } from '@inertiajs/react';

interface NavItem {
  title: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NavMainProps {
  items: NavItem[];
  currentUrl?: string; // add this
}

export function NavMain({ items, currentUrl }: NavMainProps) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentUrl === item.href;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className={isActive ? 'bg-blue-500 text-white' : ''}>
              <Link href={item.href}>
                <Icon className="h-5 w-5 mr-2 inline-block" />
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
