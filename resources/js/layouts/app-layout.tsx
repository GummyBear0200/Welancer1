import React from 'react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, breadcrumbs }) => {
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs}>
      {children}
    </AppLayoutTemplate>
  );
};

export default AppLayout;
