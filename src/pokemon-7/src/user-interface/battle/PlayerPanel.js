import Colour from "../../enums/Colour.js";
import { context } from "../../globals.js";
import Pokemon from "../../entities/Pokemon.js";
import UserInterfaceElement from "../UserInterfaceElement.js";
import Panel from "../elements/Panel.js";
import ProgressBar from "../elements/ProgressBar.js";

export default class BattlePlayerPanel extends Panel {
	/**
	 * The Panel displayed beside the Player's Pokemon
	 * during battle that displays their name, health,
	 * level and experience.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {Pokemon} pokemon
	 * @param {object} options Options for the super Panel.
	 */
	constructor(x, y, width, height, pokemon, options = {}) {
		super(x, y, width, height, options);

		this.pokemon = pokemon;
		
		// Create health progress bar
		const healthBarX = x + 0.5;
		const healthBarY = y + height/2; // Higher up to make room for experience bar
		const barWidth = width - 0.8;
		const barHeight = 0.2;
		
		this.healthProgressBar = new ProgressBar(
			healthBarX,
			healthBarY,
			barWidth,
			barHeight,
			this.pokemon,
			ProgressBar.TYPE.HEALTH
		);

		 // Create experience progress bar
        const expBarX = x + 0.5;
        const expBarY = y + height/2 + 1; // Below health bar
        
        this.experienceProgressBar = new ProgressBar(
            expBarX,
            expBarY,
            barWidth,
            barHeight,
            this.pokemon,
            ProgressBar.TYPE.EXPERIENCE
        );

	}

	render() {
		super.render();

		this.renderStatistics();
		this.healthProgressBar.render();
	 	this.experienceProgressBar.render();

	}

	/**
	 * All the magic number offsets here are to
	 * arrange all the pieces nicely in the space.
	 */
	renderStatistics() {
		context.save();
		context.textBaseline = 'top';
		context.fillStyle = Colour.Black;
		context.font = `${UserInterfaceElement.FONT_SIZE-5}px ${UserInterfaceElement.FONT_FAMILY}`;
		context.fillText(
			this.pokemon.name.toUpperCase(),
			this.position.x + 15,
			this.position.y + 12
		);
		context.textAlign = 'right';
		context.fillText(
			`Lv${this.pokemon.level}`,
			this.position.x + this.dimensions.x - 10,
			this.position.y + 12
		);
		context.fillText(
			`HP: ${this.pokemon.getHealthMeter()}`,
			this.position.x + this.dimensions.x - 122,
			this.position.y + this.dimensions.y - 67 // Moved up to make room for both bars
		);
		context.fillText(
			`EXP: ${this.pokemon.getExperienceMeter()}`,
			this.position.x + this.dimensions.x - 130,
			this.position.y + this.dimensions.y - 35 // Moved up to make room for both bars
		);
		context.restore();
	}
}
