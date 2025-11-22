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
		
		// Animated properties for smooth transitions
		this.currentDisplayHealth = pokemon.currentHealth; // The health value being displayed (animated)
		this.targetHealth = pokemon.currentHealth; // The target health value to animate to
		
		// Color transition properties 
		this.currentColor = { r: 0, g: 1, b: 0 }; // Start with green
		this.targetColor = { r: 0, g: 1, b: 0 };
		
		// Initialize the correct starting color
		this.updateTargetColor();
	}

     /**
     * Renders the health proportion of the Pokemon with smooth animations.
     */
    renderHealthProportion(){
        // Update animations
        this.updateHealth();
        
        context.save();

		// Background
		context.fillStyle = '#333333';
		context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		// Health fill using animated values
		const healthRatio = this.currentDisplayHealth / this.pokemon.health;
		const fillWidth = healthRatio * this.dimensions.x;
		
		// Use animated color values with optional pulsing
		const r = Math.floor(this.currentColor.r * 255);
		const g = Math.floor(this.currentColor.g * 255);
		const b = Math.floor(this.currentColor.b * 255);
		const alpha = this.isPulsing ? this.pulseAlpha : 1;
		
		context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
		context.fillRect(this.position.x, this.position.y, fillWidth, this.dimensions.y);

		// Border
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.strokeRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		context.restore();
    }

	/**
	 * Updates the target values and starts tween animations
	 */
	updateHealth() {
		// Check if health has changed
		if (this.targetHealth !== this.pokemon.currentHealth) {
			this.targetHealth = this.pokemon.currentHealth;
            // Update target color based on new health
			this.updateTargetColor();
			
			// Start health bar width tween
			timer.tween(
				this,
				['currentDisplayHealth'], // current bar width
				[this.targetHealth], // target bar width
				0.5 // Animation duration in seconds
			);
			
			// Start color tween
			timer.tween(
				this.currentColor,
				['r', 'g', 'b'],
				[this.targetColor.r, this.targetColor.g, this.targetColor.b],
				0.3 // Slightly faster color transition
			);
		}
	}

	/**
	 * Updates the target color based on current health ratio
	 */
	updateTargetColor() {
		const healthRatio = this.pokemon.currentHealth / this.pokemon.health;
		
		if (healthRatio > 0.5) {
			// Green
			this.targetColor = { r: 0, g: 1, b: 0 };
		} else if (healthRatio > 0.25) {
			// Yellow
			this.targetColor = { r: 1, g: 1, b: 0 };
		} else {
			// Red - start pulsing for critical health
			this.targetColor = { r: 1, g: 0, b: 0 };
		}
	}
}
