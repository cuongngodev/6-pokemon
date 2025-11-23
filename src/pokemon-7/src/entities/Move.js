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