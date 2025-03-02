export interface Kingdom {
    name: string,
    ruler: Ruler,
    demographics: Demographic,
    military?: Military,
}

//............................................RULER..........................................//
export interface Ruler {
    name: string,
    title: string,
    magicAffinity: string,
    lineage: Lineage,
    alliances?: Alliance[],
}

export interface Lineage {
    dynasty: string,
    generation: number,
    predecessors: string[],
    heirs: Heir[],
}

export interface Heir {
    name: string,
    age: number,
    magicAffinity: string,
    claimStrength: number,
    artifacts: Artifact[]
}

export interface Artifact {
    name: string,
    power: number,
    abilities?: string[],
    creator?: string,
    effects?: string[],
    limitations?: string[]
}

export interface Alliance {
    kingdom: string,
    type: string,
    strength: number,
    duration: string,
    tradedResources?: string[],
    sharedForces?: Record<string, number>
}

//............................................DEMOGRAPHIC..........................................//
export interface Demographic {
    population: number,
    growth: number,
    races: Race[],
    socialClasses?: SocialClass[]
}

interface Race {
    name: "Human" | "Elf" | "Dwarf" | "Shadowkin" | "Vampire" | "Other";
    percentage: number;
}

interface SocialClass {
    name: string,
    percentage: number,
    influence: number
}

//............................................MILITARY..........................................//
export interface Military {
    totalForces: number,
    units: Unit[]
}

interface Unit {
    name: string,
    count: number,
    equipment: Equipment,
    specialAbilities: string[]
}

interface Equipment {
    weapons: string [],
    armor: string,
    mounts: string | null
}

