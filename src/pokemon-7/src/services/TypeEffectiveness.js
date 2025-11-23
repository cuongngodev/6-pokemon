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
        NORMAL: "Not anything special, you can do better!" 
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
     * @returns {object} - Object containing multiplier, message, and sound
     */
    static getEffectivenessInfo(moveType, pokemonType) {
        const multiplier = TypeEffectiveness.getMultiplier(moveType, pokemonType);
        const message = TypeEffectiveness.getMessage(multiplier);
        const sound = TypeEffectiveness.getSound(multiplier);

        return {
            multiplier,
            message,
            sound
        };
    }

    /**
     * Get the effectiveness message for a given multiplier
     * @param {number} multiplier - The damage multiplier
     * @returns {string|null} - Message to display, or null for normal effectiveness
     */
    static getMessage(multiplier) {
        switch (multiplier) {
            case TypeEffectiveness.EFFECTIVENESS.SUPER_EFFECTIVE:
                return TypeEffectiveness.MESSAGE.SUPER_EFFECTIVE;
            case TypeEffectiveness.EFFECTIVENESS.NOT_VERY_EFFECTIVE:
                return TypeEffectiveness.MESSAGE.NOT_VERY_EFFECTIVE;
            default:
                return TypeEffectiveness.MESSAGE.NORMAL;
        }
    }

    /**
     * Get the appropriate sound name for a given multiplier
     * @param {number} multiplier - The damage multiplier
     * @returns {string} - Sound name to play
     */
    static getSound(multiplier) {
        switch (multiplier) {
            case TypeEffectiveness.EFFECTIVENESS.SUPER_EFFECTIVE:
                return 'HitSuperEffective'; // hit-super-effective.wav
            case TypeEffectiveness.EFFECTIVENESS.NOT_VERY_EFFECTIVE:
                return 'HitNotEffective'; // hit-not-effective.wav
            default:
                return 'HitRegular'; // hit-regular.wav
        }
    }
}