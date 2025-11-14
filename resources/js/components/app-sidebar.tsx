import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  BookOpen,
  Folder,
  LayoutGrid,
  UserPen,
  NotebookPen,
  KeyRound,
  ScrollText,
  FolderOpenDot,
  Trophy
} from 'lucide-react';
import { route } from 'ziggy-js';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
  { title: 'Users', href: route('users.index'), icon: UserPen },
  { title: 'Roles', href: route('roles.index'), icon: NotebookPen },
  { title: 'Permissions', href: route('permissions.index'), icon: KeyRound },
  { title: 'Tasks', href: route('tasks.index'), icon: ScrollText },
  { title: 'Projects', href: route('projects.index'), icon: FolderOpenDot },
  { title: 'Leaderboard', href: route('leaderboard'), icon: Trophy },
];

export function AppSidebar() {
  const { url } = usePage();

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="bg-white dark:bg-gray-900 border-r border-sidebar-border/70"
    >
      {/* Logo Header */}
      <SidebarHeader className="px-6 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href={route('dashboard')}
                className="flex items-center gap-3 transition-transform hover:scale-105"
              >
                {/* Use public folder logo */}
                <img
                  src="/images/we-lancer-logo.jpg"
                  alt="WeLancer Logo"
                  className="h-8 w-8"
                />
                <span className="font-bold text-xl text-gray-800 dark:text-white">
                  WeLancer
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="mt-6">
        {mainNavItems.map((item) => {
          const Icon = item.icon as React.FC<React.SVGProps<SVGSVGElement>>;
          const isActive = url === item.href;

          return (
            <SidebarMenuItem key={item.title} className="mb-2">
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Link href={item.href} preserveScroll>
                  <Icon
                    className={`h-5 w-5 inline-block mr-2 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto border-t border-sidebar-border/70 px-4 py-4">
        <NavUser />
        <NavFooter
          items={[
            {
              title: 'Repository',
              href: 'https://github.com/laravel/react-starter-kit',
              icon: Folder,
            },
            {
              title: 'Documentation',
              href: 'https://laravel.com/docs/starter-kits#react',
              icon: BookOpen,
            },
          ]}
          className="mt-4"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
