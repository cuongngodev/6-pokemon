import Colour from '../../enums/Colour.js';
import SoundName from '../../enums/SoundName.js';
import { context, input, sounds, timer } from '../../globals.js';
import Panel from './Panel.js';
import Input from '../../../lib/Input.js';

export default class ProgressBar extends Panel {
	/**
	 * A bar that fills up proportionally to a value.
	 *
	 * @param {number} x
	 * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Pokemon} pokemon
	 */
	constructor(x, y, width, height = 8, pokemon) {
		super(x, y, width, height);
		this.pokemon = pokemon;
	}

    /**
     * Renders the health proportion of the Pokemon.
     */
    renderHealthProportion(){
        context.save();

		// Background
		context.fillStyle = '#333333';
		context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		// Health fill
		const healthRatio = this.pokemon.currentHealth / this.pokemon.health;
		// Calculate fill width based on health ratio
        const fillWidth = healthRatio * this.dimensions.x;
		
		// Color based on health percentage
		if (healthRatio > 0.5) {
			context.fillStyle = Colour.Green;
		} else if (healthRatio > 0.25) {
			context.fillStyle = Colour.Yellow;
		} else {
			context.fillStyle = Colour.Red;
		}
		
		context.fillRect(this.position.x, this.position.y, fillWidth, this.dimensions.y);

		// Border
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.strokeRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		context.restore();
    }


    

}
