import type { QueryClient } from "@tanstack/react-query";

import { metadata } from "@monorepo/utils/functions/metadata";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent, Scripts, createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import tailwindcss from "@/styles/tailwind.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, maximum-scale=1",
            },
            ...metadata({ title: "Monorepo" }),
        ],
        links: [
            {
                rel: "stylesheet",
                href: tailwindcss,
            },
        ],
    }),
    notFoundComponent: NotFound,
    component: Component,
});

function NotFound() {
    return <div />;
}

function Component() {
    return (
        <html lang="en" dir="ltr" className="h-full overscroll-none bg-elevation text-foreground-1" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>

            <body className="font-sans antialiased">
                <Outlet />

                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "TanStack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        {
                            name: "TanStack Query",
                            render: <ReactQueryDevtoolsPanel />,
                        },
                    ]}
                />

                <Scripts />
            </body>
        </html>
    );
}
