export interface Guild {
    name: string,
    leader: string,
    founded: string,
    reputation: number,
    members: Member[],
}

interface Member {
    name: string,
    rank: string,
    specialization: string,
    achievements: string[],
    skills: Skill[],
}

interface Skill {
    name: string,
    level: number,
    damage?: number,
    manaCost: number,
    duration?: number,
    variants?: Variant[],
    healing?: number
}

interface Variant {
    name: string,
    damageMultiplier: number,
    manaCostMultiplier: number
}