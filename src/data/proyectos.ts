
import imgViaggio from "../assets/viaggio-project.png";



export type Proyecto = {
    id: string,
    title: string,
    role: string,
    stack: string[],
    description: string,
    repo?: string,
    highlights: string[],
    image?: string
}

export const PROYECTOS: Proyecto[] = [
    {
        id: "viaggio",
        title: "Viaggio",
        role: "Full Stack",
        stack: ["React", "Vite", "NestJs", "SQL","Boostrap"],
        description: "App de estadias locales con itinerario personalizado",
        highlights: ["Drag an Drop", "UI cuidada"],
        repo: "https://github.com/alexBeltramella",
        image: imgViaggio,
    },
    {
        id: "viaggio",
        title: "Viaggio",
        role: "Full Stack",
        stack: ["React", "Vite", "NestJs", "SQL","Boostrap"],
        description: "App de estadias locales con itinerario personalizado",
        highlights: ["Drag an Drop", "UI cuidada"],
        repo: "https://github.com/alexBeltramella",
        image: imgViaggio,
    },
    {
        id: "viaggio",
        title: "Viaggio",
        role: "Full Stack",
        stack: ["React", "Vite", "NestJs", "SQL","Boostrap"],
        description: "App de estadias locales con itinerario personalizado",
        highlights: ["Drag an Drop", "UI cuidada"],
        repo: "https://github.com/alexBeltramella",
        image: imgViaggio,
    },
];