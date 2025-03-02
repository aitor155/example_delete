import { Guild } from "./Guild";
import { Kingdom } from "./Kingdom";
import { MagicSystem } from "./MagicSystem";

export interface GrandWorld {
    kingdoms: Kingdom[],
    guilds: Guild[],
    magicSystem: MagicSystem
}