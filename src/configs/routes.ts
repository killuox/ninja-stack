import { Home } from "lucide-svelte";

type Route = {
    path: string;
    label: string;
    icon: typeof Home;
};

export const appRoutes: Route[] = [
    {
        path: "/app",
        label: "Home",
        icon: Home,
    },
];