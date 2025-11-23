export default class TypeEffectiveness {
    static TYPE = {
        FIRE: 'Fire',
        WATER: 'Water',
        GRASS: 'Grass',
        NORMAL: 'Normal'
    };

    static EFFECTIVENESS = {
        SUPER_EFFECTIVE: 2.0,
        NORMAL: 1.0,
        NOT_VERY_EFFECTIVE: 0.5
    };

    static MESSAGE = {
        SUPER_EFFECTIVE: "It's super effective!",
        NOT_VERY_EFFECTIVE: "It's not very effective...",
        NORMAL: null // No message 
    };

    /**
     * Type effectiveness chart
     * [moveType][defenderType] = multiplier
     */
    static typeChart = {
        [TypeEffectiveness.TYPE.FIRE]: {
            [TypeEffectiveness.TYPE.FIRE]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.WATER]: TypeEffectiveness.EFFECTIVENESS.NOT_VERY_EFFECTIVE,
            [TypeEffectiveness.TYPE.GRASS]: TypeEffectiveness.EFFECTIVENESS.SUPER_EFFECTIVE,
            [TypeEffectiveness.TYPE.NORMAL]: TypeEffectiveness.EFFECTIVENESS.NORMAL
        },
        [TypeEffectiveness.TYPE.WATER]: {
            [TypeEffectiveness.TYPE.FIRE]: TypeEffectiveness.EFFECTIVENESS.SUPER_EFFECTIVE,
            [TypeEffectiveness.TYPE.WATER]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.GRASS]: TypeEffectiveness.EFFECTIVENESS.NOT_VERY_EFFECTIVE,
            [TypeEffectiveness.TYPE.NORMAL]: TypeEffectiveness.EFFECTIVENESS.NORMAL
        },
        [TypeEffectiveness.TYPE.GRASS]: {
            [TypeEffectiveness.TYPE.FIRE]: TypeEffectiveness.EFFECTIVENESS.NOT_VERY_EFFECTIVE,
            [TypeEffectiveness.TYPE.WATER]: TypeEffectiveness.EFFECTIVENESS.SUPER_EFFECTIVE,
            [TypeEffectiveness.TYPE.GRASS]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.NORMAL]: TypeEffectiveness.EFFECTIVENESS.NORMAL
        },
        [TypeEffectiveness.TYPE.NORMAL]: {
            [TypeEffectiveness.TYPE.FIRE]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.WATER]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.GRASS]: TypeEffectiveness.EFFECTIVENESS.NORMAL,
            [TypeEffectiveness.TYPE.NORMAL]: TypeEffectiveness.EFFECTIVENESS.NORMAL
        }

        
    };
    /**
    * Get the damage multiplier for a move type against a Pokemon type
    * @param {string} moveType - The type of the move being used
    * @param {string} pokemonType - The type of the defending Pokemon
    * @returns {number} - Damage multiplier (0.5, 1.0, or 2.0)
    */
    static getMultiplier(moveType, pokemonType) {
        if (!moveType) {
            console.warn(`Move type is undefined or null`);
            return TypeEffectiveness.EFFECTIVENESS.NORMAL;
        }

        if (!pokemonType) {
            console.warn(`Pokemon type is undefined or null`);
            return TypeEffectiveness.EFFECTIVENESS.NORMAL;
        }

        if (!TypeEffectiveness.typeChart[moveType]) {
            console.warn(`Unknown move type: ${moveType}`);
            return TypeEffectiveness.EFFECTIVENESS.NORMAL;
        }

        if (!TypeEffectiveness.typeChart[moveType][pokemonType]) {
            console.warn(`Unknown Pokemon type: ${pokemonType} for move type: ${moveType}`);
            return TypeEffectiveness.EFFECTIVENESS.NORMAL;
        }

        return TypeEffectiveness.typeChart[moveType][pokemonType];
   }
   /**
     * Get complete effectiveness information for a move vs Pokemon matchup
     * @param {string} moveType - The type of the move being used
     * @param {string} pokemonType - The type of the defending Pokemon
     * @returns {object} - Object containing multiplier
     */
    static getEffectivenessInfo(moveType, pokemonType) {
        const multiplier = TypeEffectiveness.getMultiplier(moveType, pokemonType);

        return {
            multiplier,
        };
    }
}