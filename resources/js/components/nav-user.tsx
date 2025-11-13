// resources/js/components/nav-user.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, LogOut, Settings, User } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function NavUser() {
  const { auth } = usePage<SharedData>().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
              data-test="sidebar-menu-button"
            >
              <UserInfo user={auth.user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
          >
            {/* User Info */}
            <div className="flex items-center gap-2 p-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
                <User className="size-5 text-gray-600" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{auth.user.name}</span>
                <span className="truncate text-xs text-gray-500">{auth.user.email}</span>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Menu Items */}
            <div className="p-1">
              <Link
                href="/profile"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100"
              >
                <User className="size-4" />
                Profile
              </Link>

              <Link
                href="/settings"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100"
              >
                <Settings className="size-4" />
                Settings
              </Link>

              <div className="border-t border-gray-200 my-1" />

              <Link
                href="/logout"
                method="post"
                as="button"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-4" />
                Logout
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}