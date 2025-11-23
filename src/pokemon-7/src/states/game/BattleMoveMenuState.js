import State from "../../../lib/State.js";
import { stateStack } from "../../globals.js";
import GridMenu from "../../user-interface/elements/GridMenu.js";
import BattleMessageState from "./BattleMessageState.js";
import BattleTurnState from "./BattleTurnState.js";

export default class BattleMoveMenuState extends State {
	/**
	 * Represents the move selection menu during battle where the Player can choose which move to use.
	 * Displays the Pokemon's available moves in a 2x2 grid layout.
	 *
	 * @param {BattleState} battleState
	 */
	constructor(battleState) {
		super();

		this.battleState = battleState;
		this.playerPokemon = battleState.playerPokemon;

		// Build menu items (includes moves and "Back" option, exactly 4 items)
		const allItems = this.buildMoveItems();

		this.moveMenu = new GridMenu(
			GridMenu.BATTLE_MOVE_MENU.x,
			GridMenu.BATTLE_MOVE_MENU.y,
			GridMenu.BATTLE_MOVE_MENU.width,
			GridMenu.BATTLE_MOVE_MENU.height,
			allItems
		);
	}

	update() {
		this.moveMenu.update();
		this.battleState.update();
	}

	render() {
		this.moveMenu.render();
	}

	/**
	 * Build menu items from the player Pokemon's available moves.
	 * Always returns exactly 4 items, filling empty slots with hyphens.
	 * @returns {Array} Array of exactly 4 menu items
	 */
	buildMoveItems() {
		const moveItems = [];

		// Iterate exactly 4 times to fill the 2x2 grid
		for (let i = 0; i < 4; i++) {
			if (i < this.playerPokemon.moves.length && this.playerPokemon.moves[i]) {
				// Pokemon has a move in this slot
				const move = this.playerPokemon.moves[i];
				moveItems.push({
					text: move.name,
					move: move, // Store the move reference
					onSelect: () => this.useMove(move, i)
				});
		
			} else {
				// Empty move slot - display hyphen and do nothing when selected
				moveItems.push({
					text: "-",
					move: null,
					onSelect: () => {} // No action for empty slots
				});
			}
		}

		return moveItems;
	}

	/**
	 * Use the selected move in battle.
	 * @param {Move} move - The move to use
	 * @param {number} moveIndex - Index of the move in the Pokemon's move array
	 */
	useMove(move, moveIndex) {
		// Store the selected move for the battle turn
		this.battleState.selectedMove = move;
		this.battleState.selectedMoveIndex = moveIndex;

		// Pop this menu and start the battle turn
		stateStack.pop();
		stateStack.push(new BattleTurnState(this.battleState));
	}
}