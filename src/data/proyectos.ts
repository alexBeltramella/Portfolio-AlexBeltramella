export type Proyecto = {
    id: string,
    title: string,
    role: string,
    stack: string[],
    description: string,

    highlights: string[],
    links?: { label: string, href: string}[];
}

export const PROYECTOS: Proyecto[] = [
    {
        id: "viaggio",
        title: "Viaggio",
        role: "Full Stack",
        stack: ["React", "Vite", "NestJs", "SQL","Boostrap"],
        description: "App de estadias locales con itinerario personalizado",
        highlights: ["Drag an Drop", "UI cuidada"],
        links: [
            {label: "Repo", href: "#"}
        ],
    },
];