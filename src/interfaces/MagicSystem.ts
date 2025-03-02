import { Artifact } from "./Kingdom";

export interface MagicSystem {
    elements: Element[],
    schools: School[],
    artifacts: Artifact[]
}

type Element = "Fire" | "Water" | "Earth" | "Air" | "Light" | "Shadow" | "Time" | "Space";

interface School {
    name: "Evocation" | "Illusion" | "Necromancy" | "Healing";
    difficulty: number;
    dangerLevel: number;
}
