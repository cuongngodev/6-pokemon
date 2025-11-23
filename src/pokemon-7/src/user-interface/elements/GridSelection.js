import UserInterfaceElement from '../UserInterfaceElement.js';
import SoundName from '../../enums/SoundName.js';
import { context, input, sounds } from '../../globals.js';
import Vector from '../../../lib/Vector.js';
import Input from '../../../lib/Input.js';

export default class GridSelection extends UserInterfaceElement {
	/**
	 * A UI element that displays items in a 2x2 grid layout with cursor navigation.
	 * Unlike the linear Selection component, this allows for both horizontal and vertical navigation.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {array} items Elements are objects that each have a string `text` and function `onSelect` property.
	 * Maximum of 4 items for a 2x2 grid.
	 */
	constructor(x, y, width, height, items) {
		super(x, y, width, height);

		// Limit to 4 items for 2x2 grid
		this.items = items.slice(0, 4);
		this.gridWidth = 2;
		this.gridHeight = 2;
		
		// Current cursor position in grid coordinates
		this.cursorX = 0;
		this.cursorY = 0;
		
		// Calculate cell dimensions
		this.cellWidth = this.dimensions.x / this.gridWidth;
		this.cellHeight = this.dimensions.y / this.gridHeight;
		
		this.initializeItems();
		this.font = this.initializeFont();
	}

	update() {
		if (
			input.isKeyPressed(Input.KEYS.W) ||
			input.isKeyPressed(Input.KEYS.ARROW_UP)
		) {
			this.navigateUp();
		} else if (
			input.isKeyPressed(Input.KEYS.S) ||
			input.isKeyPressed(Input.KEYS.ARROW_DOWN)
		) {
			this.navigateDown();
		} else if (
			input.isKeyPressed(Input.KEYS.A) ||
			input.isKeyPressed(Input.KEYS.ARROW_LEFT)
		) {
			this.navigateLeft();
		} else if (
			input.isKeyPressed(Input.KEYS.D) ||
			input.isKeyPressed(Input.KEYS.ARROW_RIGHT)
		) {
			this.navigateRight();
		} else if (
			input.isKeyPressed(Input.KEYS.ENTER) ||
			input.isKeyPressed(Input.KEYS.SPACE)
		) {
			this.select();
		}
	}

	render() {
		this.items.forEach((item, index) => {
			if (item) {
				this.renderSelectionItem(item, index);
			}
		});
	}
    /**
     * Renders a single item in the grid selection.
     * @param {*} item - The item to render
     * @param {*} index - The index of the item
     */
	renderSelectionItem(item, index) {
		const currentIndex = this.getCurrentSelectionIndex();
		const isSelected = index === currentIndex;
		
		// Align text and set font
		context.save();
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = this.font + 30;
        
		
		// Change text color based on selection state
		if (isSelected) {
			context.fillStyle = '#FFD700'; // Gold color for selected text
		} else {
			context.fillStyle = '#000000'; // Black color for non-selected text
		}

		context.fillText(item.text.toUpperCase(), item.position.x, item.position.y);
		context.restore();
	}
    /**
     * Get the current selection index in the grid based on cursor position.
     * @returns {number} - Current selection index
     */
    getCurrentSelectionIndex() {
		return this.cursorX + this.cursorY * this.gridWidth;
	}

	navigateUp() {
		if (this.cursorY > 0) {
			sounds.play(SoundName.SelectionMove);
			this.cursorY--;
		}
	}

	navigateDown() {
		if (this.cursorY < this.gridHeight - 1) {
			// Check if there's an item in the target position
			const targetIndex = this.cursorX + (this.cursorY + 1) * this.gridWidth;
			if (targetIndex < this.items.length && this.items[targetIndex]) { // Only move if item exists
				sounds.play(SoundName.SelectionMove);
				this.cursorY++;
			}
		}
	}

	navigateLeft() {
		if (this.cursorX > 0) {
			sounds.play(SoundName.SelectionMove);
			this.cursorX--;
		}
	}

	navigateRight() {
		if (this.cursorX < this.gridWidth - 1) {
			// Check if there's an item in the target position
			const targetIndex = (this.cursorX + 1) + this.cursorY * this.gridWidth;
			if (targetIndex < this.items.length && this.items[targetIndex]) {
				sounds.play(SoundName.SelectionMove);
				this.cursorX++;
			}
		}
	}

	select() {
		const currentIndex = this.getCurrentSelectionIndex();
		if (currentIndex < this.items.length && this.items[currentIndex]) {
			sounds.play(SoundName.SelectionChoice);
			this.items[currentIndex].onSelect();
		}
	}


	/**
	 * Adds a position property to each item to be used for rendering.
	 * Arranges items in a 2x2 grid layout.
	 */
	initializeItems() {
		this.items.forEach((item, index) => {
			if (item) {
				const gridX = index % this.gridWidth;
				const gridY = Math.floor(index / this.gridWidth);
				
				const centerX = this.position.x + (gridX * this.cellWidth) + (this.cellWidth / 2);
				const centerY = this.position.y + (gridY * this.cellHeight) + (this.cellHeight / 2);
				
				item.position = new Vector(centerX, centerY);
			}
		});
	}

	/**
	 * Scales the font size based on the size of the grid cells.
	 */
	initializeFont() {
		const maxFontSize = Math.min(this.cellWidth, this.cellHeight) * 0.2;
		return `${Math.min(UserInterfaceElement.FONT_SIZE, maxFontSize)}px ${
			UserInterfaceElement.FONT_FAMILY
		}`;
	}
}