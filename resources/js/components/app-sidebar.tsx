import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Archive, Barcode, Book, BookOpen, ChartColumnDecreasing, Circle, Folder, History, LayoutGrid, LibraryBig, SquareMenu, Users } from 'lucide-react';
import AppLogo from './app-logo';
interface PageProps {
    auth: {
        user: any;
        permissions: string[];
    };
}





const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.history'),
        url: '/users/history',
        icon: History,
    },
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslations();
    const page = usePage<{ props: PageProps }>();
    const auth = page.props.auth;

    let items:NavItem[]=[
        {
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    },
    ];
    {auth.permissions.includes('users.view')&&
        items.push(
            {
                title: t('ui.navigation.items.users'),
                url: '/users',
                icon: Users,
            },
        )
    }
    {auth.permissions.includes('products.view')&&
        items.push(
            {
                title: t('ui.navigation.items.floors'),
                url: '/floors',
                icon: SquareMenu,
            },
            {
                title: t('ui.navigation.items.zones'),
                url: '/zones',
                icon: Circle,
            },
            {
                title: t('ui.navigation.items.bookshelves'),
                url: '/bookshelves',
                icon: LibraryBig,
            },
        )
    }
    items.push(
        {
            title: t('ui.navigation.items.books'),
            url: '/books',
            icon: Book,
        },
    )
    {auth.permissions.includes('products.view')&&
        items.push(
            {
                title: t('ui.navigation.items.loans'),
                url: '/loans',
                icon: Barcode,
            },
            {
                title: t('ui.navigation.items.reservations'),
                url: '/reservations',
                icon: Archive,
            },
        )
    }
    {auth.permissions.includes('reports.view')&&
        items.push(
            {
                title: t('ui.navigation.items.graphs'),
                url: '/graphs',
                icon: ChartColumnDecreasing,
            },
        )
    }
    const mainNavItems = (t: (key: string) => string): NavItem[] => items;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
