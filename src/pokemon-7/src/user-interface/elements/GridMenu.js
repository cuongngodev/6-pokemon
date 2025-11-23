import Panel from "./Panel.js";
import GridSelection from "./GridSelection.js";

export default class GridMenu extends Panel {
	static BATTLE_MOVE_MENU = { x: 9, y: 8, width: 5, height: 3 };

	/**
	 * A UI element that is a GridSelection on a Panel.
	 * Displays items in a 2x2 grid layout for easy navigation.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {array} items Elements are objects that each
	 * have a string `text` and function `onSelect` property.
	 * Maximum of 4 items for a 2x2 grid.
	 */
	constructor(x, y, width, height, items) {
		super(x, y, width, height);

		this.gridSelection = new GridSelection(x, y, width, height, items);
	}

	update() {
		this.gridSelection.update();
	}

	render() {
		super.render();
		this.gridSelection.render();
	}
}