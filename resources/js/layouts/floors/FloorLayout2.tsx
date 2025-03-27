import AppLayout from "@/layouts/app-layout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { SquareMenu } from "lucide-react";

interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface FloorLayoutProps extends PropsWithChildren {
  title: string;
  data: any[];
}

export function FloorLayout2({ title, children, data }: FloorLayoutProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
        toast.success(flash.success);
        }
        if (flash.error) {
        toast.error(flash.error);
        }
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
        title: "Dashboard",
        href: "/dashboard",
        },
        {
        title: "Pisos",
        href: "/floors",
        },
    ];

    if (title !== "Usuarios") {
        breadcrumbs.push({
        title,
        href: "#",
        });
    }

    const floorsList = data.map(floor=>
        <DashboardCard
            title={floor.name}
            description={'Piso'}
            href="/floors"
            icon={SquareMenu}
        />
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={title} />
        {children}
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {floorsList}
        </div>
        </AppLayout>
    );
    }
