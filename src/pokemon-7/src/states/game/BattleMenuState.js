import State from "../../../lib/State.js";
import { stateStack } from "../../globals.js";
import Menu from "../../user-interface/elements/Menu.js";
import BattleMessageState from "./BattleMessageState.js";
import BattleMoveMenuState from "./BattleMoveMenuState.js";
import BattleState from "./BattleState.js";

export default class BattleMenuState extends State {
	static MENU_OPTIONS = {
		Fight: "FIGHT",
		Status: "STATUS",
		Run: "RUN",
	}

	/**
	 * Represents the menu during the battle that the Player can choose an action from.
	 *
	 * @param {BattleState} battleState
	 */
	constructor(battleState) {
		super();

		this.battleState = battleState;

		const items = [
			{ text: BattleMenuState.MENU_OPTIONS.Fight, onSelect: () => this.fight() },
			{ text: BattleMenuState.MENU_OPTIONS.Status, onSelect: () => this.status() },
			{ text: BattleMenuState.MENU_OPTIONS.Run, onSelect: () => this.run() },
		];

		this.battleMenu = new Menu(
			Menu.BATTLE_MENU.x,
			Menu.BATTLE_MENU.y,
			Menu.BATTLE_MENU.width,
			Menu.BATTLE_MENU.height,
			items,
		);
	}

	update() {
		this.battleMenu.update();
		this.battleState.update();
	}

	render() {
		this.battleMenu.render();
	}

	fight() {
		stateStack.pop();
		// Push the move menu state onto the stack to allow the Player to select a move.
		stateStack.push(new BattleMoveMenuState(this.battleState));
	}
	run() {
		stateStack.pop();
		this.battleState.exitBattle();
	}

	status() {
		stateStack.push(new BattleMessageState(`You're doing great!`, 2));
	}
}
