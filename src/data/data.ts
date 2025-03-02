import { GrandWorld } from "../interfaces/GrandWorld";

const grandWorld: GrandWorld = {
    // version: "2.0.0",
    // lastUpdated: "2025-02-24",
    kingdoms: [
        {
            name: "Eldoria",
            ruler: {
                name: "King Alaric",
                title: "High King of Eldoria",
                magicAffinity: "Lightning",
                lineage: {
                    dynasty: "Stormborn",
                    generation: 15,
                    predecessors: ["Queen Elara", "King Magnus", "Queen Celeste"],
                    heirs: [
                        {
                            name: "Princess Aurora",
                            age: 22,
                            magicAffinity: "Light",
                            claimStrength: 0.95,
                            artifacts: [
                                {
                                    name: "Crown of Dawn",
                                    power: 85,
                                    abilities: ["light manipulation", "divine protection"]
                                }
                            ]
                        }
                    ]
                },
                alliances: [
                    {
                        kingdom: "Drakmor",
                        type: "trade",
                        strength: 0.8,
                        duration: "50 years",
                        tradedResources: ["magical artifacts", "rare minerals"]
                    },
                    {
                        kingdom: "Celestial Isles",
                        type: "military",
                        strength: 0.9,
                        duration: "25 years",
                        sharedForces: {
                            army: 5000,
                            mages: 200,
                            ships: 15
                        }
                    }
                ]
            },
            demographics: {
                population: 150000,
                growth: 0.03,
                races: [
                    { name: "Human", percentage: 0.45 },
                    { name: "Elf", percentage: 0.25 },
                    { name: "Dwarf", percentage: 0.15 },
                    { name: "Other", percentage: 0.15 }
                ],
                socialClasses: [
                    { name: "nobility", percentage: 0.05, influence: 0.4 },
                    { name: "merchants", percentage: 0.15, influence: 0.3 },
                    { name: "craftsmen", percentage: 0.35, influence: 0.2 },
                    { name: "peasants", percentage: 0.45, influence: 0.1 }
                ]
            },
            military: {
                totalForces: 10000,
                units: [
                    {
                        name: "Royal Knights",
                        count: 1000,
                        equipment: {
                            weapons: ["enchanted swords", "magical lances"],
                            armor: "mithril plate",
                            mounts: "warhorses"
                        },
                        specialAbilities: ["lightning charge", "storm shield"]
                    },
                    {
                        name: "Storm Mages",
                        count: 200,
                        equipment: {
                            weapons: ["storm staves", "thunder orbs"],
                            armor: "enchanted robes",
                            mounts: null
                        },
                        specialAbilities: ["thunderbolt", "hurricane", "lightning storm"]
                    }
                ]
            }
        },
        {
            name: "Drakmor",
            ruler: {
                name: "Empress Selene",
                title: "Empress of Shadows",
                magicAffinity: "Shadow",
                lineage: {
                    dynasty: "Nightweaver",
                    generation: 8,
                    predecessors: ["Emperor Moros", "Empress Nyx"],
                    heirs: [
                        {
                            name: "Prince Morpheus",
                            age: 19,
                            magicAffinity: "Dream",
                            claimStrength: 0.88,
                            artifacts: [
                                {
                                    name: "Dreamweaver's Pendant",
                                    power: 75,
                                    abilities: ["dream walking", "nightmare control"]
                                }
                            ]
                        }
                    ]
                }
            },
            demographics: {
                population: 120000,
                growth: 0.02,
                races: [
                    { name: "Human", percentage: 0.35 },
                    { name: "Shadowkin", percentage: 0.30 },
                    { name: "Vampire", percentage: 0.20 },
                    { name: "Other", percentage: 0.15 }
                ]
            }
        }
    ],
    guilds: [
        {
            name: "The Arcane Order",
            leader: "Grand Mage Valerius",
            founded: "1755-03-21",
            reputation: 0.95,
            members: [
                {
                    name: "Eldrin",
                    rank: "Master",
                    specialization: "battle magic",
                    achievements: ["Archmage's Award", "Battle Magic Innovation"],
                    skills: [
                        {
                            name: "Fireball",
                            level: 95,
                            damage: 800,
                            manaCost: 50,
                            variants: [
                                {
                                    name: "Inferno Burst",
                                    damageMultiplier: 2.5,
                                    manaCostMultiplier: 3
                                }
                            ]
                        },
                        {
                            name: "Time Warp",
                            level: 87,
                            duration: 30,
                            manaCost: 150
                        }
                    ]
                },
                {
                    name: "Lyra",
                    rank: "Adept",
                    specialization: "healing",
                    achievements: ["Healer's Crown"],
                    skills: [
                        {
                            name: "Greater Heal",
                            level: 92,
                            healing: 600,
                            manaCost: 80
                        }
                    ]
                }
            ]
        }
    ],
    magicSystem: {
        elements: ["Fire", "Water", "Earth", "Air", "Light", "Shadow", "Time", "Space"],
        schools: [
            { name: "Evocation", difficulty: 0.8, dangerLevel: 0.9 },
            { name: "Illusion", difficulty: 0.6, dangerLevel: 0.3 },
            { name: "Necromancy", difficulty: 0.9, dangerLevel: 0.95 },
            { name: "Healing", difficulty: 0.7, dangerLevel: 0.2 }
        ],
        artifacts: [
            {
                name: "Orb of Eternity",
                power: 98,
                creator: "The Ancient Ones",
                effects: ["time manipulation", "foresight", "age control"],
                limitations: ["one use per day", "requires pure magic essence"]
            },
            {
                name: "Shadowheart Crystal",
                power: 85,
                creator: "Empress Nyx",
                effects: ["shadow control", "dark vision", "fear aura"],
                limitations: ["corrupts non-shadow users", "weakens in daylight"]
            }
        ]
    }
};

export default grandWorld;