import TypeEffectiveness from "../services/TypeEffectiveness.js";

export default class Move {
	/**
	 * Represents a Pokémon move with its properties and effects.
	 * 
	 * @param {string} name The name of the move
	 * @param {object} definition The move definition from moves.json
	 */
	constructor(name, definition) {
		this.name = name;
		this.type = definition.type;
		this.basePower = definition.basePower;
	}

	/**
     * Use this move against a target Pokémon with type effectiveness.
     * 
     * @param {Pokemon} attacker The Pokémon using this move
     * @param {Pokemon} defender The Pokémon receiving the move
     * @returns {object} Damage and effectiveness information
     */
    useWithEffectiveness(attacker, defender) {
        const result = this.calculateDamageWithEffectiveness(attacker, defender);
		// Apply damage to defender
        defender.receiveDamage(result.damage);
        return result;
    }

    /**
     * Calculate the actual damage this move will deal with type effectiveness.
     * 
     * @param {Pokemon} attacker The Pokémon using this move
     * @param {Pokemon} defender The Pokémon receiving the move
     * @returns {object} Object containing damage and effectiveness info
     */
    calculateDamageWithEffectiveness(attacker, defender) {
        // Debug logging
        console.log(`Move: ${this.name} (${this.type}) vs Defender: ${defender.name} (${defender.type})`);
        console.log(`Attacker stats: level=${attacker.level}, attack=${attacker.attack}`);
        console.log(`Defender stats: defense=${defender.defense}`);

        // Calculate base damage using standard Pokemon formula
        const baseDamage = Math.max(
            1,
            Math.floor(
                (((2 * attacker.level) / 5 + 2) *
                    this.basePower *
                    (attacker.attack / defender.defense)) /
                    50 +
                    2
            )
        );

        console.log(`Base damage: ${baseDamage}`);

        // Get type effectiveness information
        const effectivenessInfo = TypeEffectiveness.getEffectivenessInfo(
            this.type, 
            defender.type
        );

        console.log(`Type effectiveness multiplier: ${effectivenessInfo.multiplier}`);
		console.log(`Effectiveness message: ${effectivenessInfo.message}`);
        // Apply type effectiveness multiplier
        const finalDamage = Math.max(1, Math.floor(baseDamage * effectivenessInfo.multiplier));

        console.log(`Final damage: ${finalDamage}`);

        return {
            damage: finalDamage,
            baseDamage: baseDamage,
            effectiveness: effectivenessInfo,
			sound: TypeEffectiveness.getSound(effectivenessInfo.multiplier)
        };
    }	/**
	 * Calculate the actual damage this move will deal.
	 * 
	 * @param {Pokemon} attacker The Pokémon using this move
	 * @param {Pokemon} defender The Pokémon receiving the move
	 * @returns {number} The damage to inflict
	 */
	calculateDamage(attacker, defender) {
		// Use the standard Pokémon damage formula
		const damage = Math.max(
			1,
			Math.floor(
				(((2 * attacker.level) / 5 + 2) *
					this.basePower *
					(attacker.attack / defender.defense)) /
					50 +
					2
			)
		);

		return damage;
	}

	/**
	 * Use this move against a target Pokémon.
	 * 
	 * @param {Pokemon} attacker The Pokémon using this move
	 * @param {Pokemon} defender The Pokémon receiving the move
	 */
	use(attacker, defender) {
		const damage = this.calculateDamage(attacker, defender);
		defender.currentHealth = Math.max(0, defender.currentHealth - damage);
		return damage;
	}
	
}