import { GrandWorld } from "../interfaces/GrandWorld";
import { Ruler } from "../interfaces/Kingdom";

// 1. BASIC ARRAY OPERATIONS
// ------------------------

// 1.1 Get all kingdom names
export const getAllKingdomsNames = (grandWorld: GrandWorld): string[] => { ///: Pick<Kingdom, "name">[] for specific attribute name: ..... of kingdom OR ///Partial<Kingdom> where all attributes of kingdom become optional
    const allKingdomsName = grandWorld.kingdoms.map((kingdom)=> (kingdom.name));
    return allKingdomsName;
}
// 1.2 Find all rulers with "Light" or "Lightning" magicAffinity
export const getRulersByMagicAffinity = (grandWorld: GrandWorld): Ruler[] => {  
    return grandWorld.kingdoms      
        .filter((kingdom)=> (kingdom.ruler.magicAffinity.includes('Light'))) //kingdom.ruler.magicAffinity === "Light" || kingdom.ruler.magicAffinity === "Lightning"  FOR 2 OPTIONS
        //--------------------OR---------------------------------//
        //const validAffinities = new Set(["Light", "Lightning"]);
        //validAffinities.has(kingdom.ruler.magicAffinity)
        .map((kingdom)=> (kingdom.ruler))
}
// 1.4 Get total population across all kingdoms
export const getTotalPopulation = (grandWorld: GrandWorld): number => {
    const totalPopulation = grandWorld.kingdoms.reduce((totalValue, currentElement)=> totalValue + currentElement.demographics.population, 0);
    return totalPopulation;
}


// 2. COMPLEX FILTERING & MAPPING
// -----------------------------
// 2.1 Find kingdoms where nobility influence > 30% and create object with kingdom name and influence
export const getKingdomsByNobility = (grandWorld: GrandWorld): Record<string, number>[] => {
    const kingdomNobility = grandWorld.kingdoms.map((kingdom)=> {
        const socialClasses = kingdom.demographics.socialClasses?.find((socialClass)=> (socialClass.name.includes('nobility') && socialClass.influence * 100 > 30));

        return socialClasses ?
            {[kingdom.name]: socialClasses.influence }
            : null

    }).filter((item)=> item != null)//Boolean only is enough but TS don't get it 

    return kingdomNobility
}

//// ANOTHER OPTION (add in object)
export const getKingdomsNobility = (grandWorld: GrandWorld): Record<string, number> => {
    const kingdomNobility = grandWorld.kingdoms.reduce((totalObject, currentElement)=> {
        const socialClasses = currentElement.demographics.socialClasses?.find((socialClass)=> (socialClass.name.includes('nobility') && socialClass.influence * 100 > 30));

        if (socialClasses) {
            return {
                ...totalObject,
                [currentElement.name]: socialClasses.influence * 100
            }
        }

        //totalObject[currentElement.name] = socialClasses.influence * 100;

        //if no socialClasses on that condition
        return totalObject;
        
    }, {} as Record<string, number>);
    return kingdomNobility;
}
// 2.2 Get all military units with mounts, including kingdom name
interface MilitaryUnits {
    name: string,
    mounts: string,
    kingdom: string
}
export const getAllMilitaryUnits = (grandWorld: GrandWorld): MilitaryUnits[] => {
    const allMilitaryMounts = grandWorld.kingdoms.flatMap((kingdom)=> {
            return kingdom.military?.units.map((unit)=> ({name: unit.name, mounts: unit.equipment.mounts? unit.equipment.   mounts : "none", kingdom: kingdom.name}))
          }).filter((element)=> (element != undefined));   
    return allMilitaryMounts;
}
// 2.3 Create hierarchy of magical abilities (categorize by power level: >90 Legendary, >80 Master, >70 Adept)
export const getMagicalAbilities = (grandWorld: GrandWorld): Record<string, string> => {
  const magicalAbilities = [
    {key: "legendary", value: 90},
    {key: "master", value: 80},
    {key: "adept", value: 70},
];

const magicSystems = grandWorld.magicSystem.artifacts.reduce((totalArtifacts, actualArtifact)=> {
  const magicKey = magicalAbilities.find((magicAbility)=> (magicAbility.value < actualArtifact.power));
  return totalArtifacts = {
    ...totalArtifacts,
    [actualArtifact.name]: magicKey?.key
  }
}, {})

return magicSystems;
}
// 2.4 Find all artifacts that have multiple limitations and sort by power
export const getArtifatcsByLimitation = (grandWorld: GrandWorld)=> {
  const artifactsByLimitations = grandWorld.magicSystem.artifacts.filter((artifact)=> {if (artifact.limitations) return artifact.limitations?.length > 1});

  return artifactsByLimitations.sort((artifact1 , artifact2) => (artifact1.power - artifact2.power))
}