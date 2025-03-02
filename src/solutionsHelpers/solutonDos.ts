// SOLUTIONS
// =========

// 1. BASIC ARRAY OPERATIONS
// ------------------------

// 1.1 Get all kingdom names
const getKingdomNames = () => {
    return grandEnchantedRealm.kingdoms.map(kingdom => kingdom.name);
};

// 1.2 Find rulers with Light/Lightning affinity
const getLightningRulers = () => {
    return grandEnchantedRealm.kingdoms
        .filter(kingdom => 
            kingdom.ruler.magicAffinity?.includes('Light'))
        .map(kingdom => ({
            name: kingdom.ruler.name,
            affinity: kingdom.ruler.magicAffinity
        }));
};

// 1.3 Get all heirs
const getAllHeirs = () => {
    return grandEnchantedRealm.kingdoms
        .flatMap(kingdom => 
            kingdom.ruler.lineage.heirs.map(heir => ({
                kingdom: kingdom.name,
                ...heir
            })));
};

// 2. COMPLEX FILTERING & MAPPING
// -----------------------------

// 2.1 Find high-influence nobility kingdoms
const getHighInfluenceKingdoms = () => {
    return grandEnchantedRealm.kingdoms
        .filter(kingdom => {
            const nobility = kingdom.demographics.socialClasses
                .find(c => c.name === 'nobility');
            return nobility?.influence > 0.3;
        })
        .map(kingdom => ({
            kingdom: kingdom.name,
            nobilityInfluence: kingdom.demographics.socialClasses
                .find(c => c.name === 'nobility').influence
        }));
};

// 3. ADVANCED CALCULATIONS
// -----------------------

// 3.1 Calculate military strength
const calculateMilitaryStrength = () => {
    return grandEnchantedRealm.kingdoms
        .map(kingdom => {
            const baseStrength = kingdom.military?.units.reduce((total, unit) => {
                const unitStrength = unit.name.toLowerCase().includes('mage') 
                    ? unit.count * 5 
                    : unit.count;
                return total + unitStrength;
            }, 0) || 0;

            const allianceMultiplier = kingdom.ruler.alliances
                .filter(a => a.type === 'military')
                .reduce((mult, alliance) => mult + alliance.strength, 1);

            return {
                kingdom: kingdom.name,
                militaryStrength: baseStrength * allianceMultiplier
            };
        })
        .sort((a, b) => b.militaryStrength - a.militaryStrength);
};

// 5. ADVANCED SEARCH & AGGREGATION
// -------------------------------

// 5.1 Advanced search function
const searchEntities = (searchParams) => {
    const { name, type, magicType, minPower, maxPower } = searchParams;
    
    const searchInObject = (obj, path = []) => {
        let results = [];
        
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = [...path, key];
            
            if (typeof value === 'object' && value !== null) {
                // Check if current object matches search criteria
                if (value.name && matchesSearchCriteria(value)) {
                    results.push({
                        item: value,
                        path: currentPath
                    });
                }
                // Continue searching deeper
                results = [...results, ...searchInObject(value, currentPath)];
            }
        }
        
        return results;
    };
    
    const matchesSearchCriteria = (item) => {
        if (name && !item.name.toLowerCase().includes(name.toLowerCase())) {
            return false;
        }
        if (type && !item.type?.toLowerCase().includes(type.toLowerCase())) {
            return false;
        }
        if (magicType && !item.magicAffinity?.toLowerCase().includes(magicType.toLowerCase())) {
            return false;
        }
        if (minPower && (item.power || 0) < minPower) {
            return false;
        }
        if (maxPower && (item.power || 0) > maxPower) {
            return false;
        }
        return true;
    };
    
    return searchInObject(grandEnchantedRealm);
};

// 8. ADVANCED SORTING & FILTERING
// -----------------------------

// 8.1 Multi-level sorting function
const multiSort = (array, sortConfig) => {
    return [...array].sort((a, b) => {
        for (const { key, direction = 'asc', nulls = 'last' } of sortConfig) {
            const valueA = getNestedValue(a, key);
            const valueB = getNestedValue(b, key);
            
            // Handle null/undefined values
            if (valueA === null || valueA === undefined) {
                if (valueB === null || valueB === undefined) continue;
                return nulls === 'last' ? 1 : -1;
            }
            if (valueB === null || valueB === undefined) {
                return nulls === 'last' ? -1 : 1;
            }
            
            // Compare values
            if (valueA !== valueB) {
                const comparison = valueA < valueB ? -1 : 1;
                return direction === 'asc' ? comparison : -comparison;
            }
        }
        return 0;
    });
};

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => 
        current ? current[key] : undefined, obj);
};

// Example usage:
const sortedKingdoms = multiSort(grandEnchantedRealm.kingdoms, [
    { key: 'demographics.population', direction: 'desc' },
    { key: 'ruler.lineage.generation', direction: 'asc' }
]);

// 9. COMPLEX OBJECT MANIPULATION
// ----------------------------

// 9.1 Deep clone with circular reference handling
const deepClone = (obj, transforms = {}, seen = new WeakMap()) => {
    // Handle non-object types
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle circular references
    if (seen.has(obj)) {
        return seen.get(obj);
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        const clone = [];
        seen.set(obj, clone);
        obj.forEach((item, index) => {
            clone[index] = deepClone(item, transforms, seen);
        });
        return clone;
    }
    
    // Handle objects
    const clone = Object.create(Object.getPrototypeOf(obj));
    seen.set(obj, clone);
    
    // Copy property descriptors and apply transforms
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, descriptor]) => {
        const transform = transforms[key];
        if (transform) {
            Object.defineProperty(clone, key, {
                ...descriptor,
                value: transform(descriptor.value)
            });
        } else {
            Object.defineProperty(clone, key, {
                ...descriptor,
                value: deepClone(descriptor.value, transforms, seen)
            });
        }
    });
    
    return clone;
};

// 10. DATA VALIDATION
// ------------------

// 10.1 Validation function
const validateRealm = (realm) => {
    const errors = [];
    
    // Validate kingdom structure
    realm.kingdoms.forEach(kingdom => {
        if (!kingdom.name) {
            errors.push(`Kingdom missing name`);
        }
        
        // Validate ruler
        const ruler = kingdom.ruler;
        if (!ruler?.name || !ruler?.title) {
            errors.push(`Invalid ruler data for kingdom ${kingdom.name}`);
        }
        
        // Validate heirs
        ruler?.lineage?.heirs?.forEach(heir => {
            if (heir.claimStrength < 0 || heir.claimStrength > 1) {
                errors.push(`Invalid claim strength for heir ${heir.name}`);
            }
        });
        
        // Validate demographics
        const totalPercentage = kingdom.demographics?.races
            ?.reduce((sum, race) => sum + race.percentage, 0);
        if (Math.abs(totalPercentage - 1) > 0.001) {
            errors.push(`Race percentages don't sum to 100% in ${kingdom.name}`);
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors
    };
};


////////////////////EXTRA COMPLICATED SORT METHODS ///////////////////////////////

// Calculate power scores for each kingdom
export const getKingdomsPowerScores = (kingdoms: typeof grandEnchantedRealm.kingdoms): Record<string, number> => {
    let outputObject = {};
    kingdoms.forEach((kingdom) => {
      const militaryPower = kingdom.military?.totalForces || 0;
      const populationFactor = kingdom.demographics.population / 10000;
      const powerScore = Math.floor(militaryPower + populationFactor);
      
      outputObject = { ...outputObject, [kingdom.name]: powerScore };
    });
    return outputObject;
  };
  
  // Sort kingdoms by power score, population, and growth rate
  export const sortKingdomsByStrength = (kingdomPowerScores: Record<string, number>, kingdoms: typeof grandEnchantedRealm.kingdoms) => {
    kingdoms.sort((kingdom1, kingdom2) => {
      const kingdom1Power = kingdomPowerScores[kingdom1.name];
      const kingdom2Power = kingdomPowerScores[kingdom2.name];
      
      if (kingdom1Power !== kingdom2Power) {
        // sort by power score
        return kingdom2Power - kingdom1Power;
      } else {
        // If power is equal, compare populations
        if (kingdom1.demographics.population !== kingdom2.demographics.population) {
          return kingdom2.demographics.population - kingdom1.demographics.population;
        } else {
          // If population is equal, compare growth rates
          return kingdom2.demographics.growth - kingdom1.demographics.growth;
        }
      }
    });
  };


  /////////////////////////////7magic effects ///////////////////////////////////////////////
  export enum MAGIC_EFFECTS {
    NOVICE = "NOVICE",
    ADEPT = "ADEPT",
    MASTER = "MASTER",
    LEGENDARY = "LEGENDARY"
  }
  
  export const EFFECTS_MAGIC = [
    {max: 40, effect: MAGIC_EFFECTS.NOVICE},
    {max: 70, effect: MAGIC_EFFECTS.ADEPT},
    {max: 90, effect: MAGIC_EFFECTS.MASTER},
    {max: Infinity, effect: MAGIC_EFFECTS.LEGENDARY}
  ];
  
  export const getMagicEffect = (powerLevel: number): MAGIC_EFFECTS => {
    const {effect} = EFFECTS_MAGIC.find((element) => (powerLevel <= element.max))!;
    return effect;
  };