import Colour from '../../enums/Colour.js';
import SoundName from '../../enums/SoundName.js';
import { context, input, sounds, timer } from '../../globals.js';
import Panel from './Panel.js';
import Input from '../../../lib/Input.js';

export default class ProgressBar extends Panel {
	static TYPE = {
		HEALTH: 'health',
		EXPERIENCE: 'experience'
	};

	/**
	 * A bar that fills up proportionally to a value.
	 *
	 * @param {number} x
	 * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Pokemon} pokemon
     * @param {string} type - 'health' or 'experience'
	 */
	constructor(x, y, width, height = 8, pokemon, type = ProgressBar.TYPE.HEALTH) {
		super(x, y, width, height);
		this.pokemon = pokemon;
		this.type = type;
		
		if (this.type === ProgressBar.TYPE.HEALTH) {
			// Health bar properties
			this.currentDisplayHealth = pokemon.currentHealth;
			this.targetHealth = pokemon.currentHealth;
			this.currentColor = { r: 0, g: 1, b: 0 }; // Start with green
			this.targetColor = { r: 0, g: 1, b: 0 };
			this.updateTargetColor();
		} else {
			// Experience bar properties
			this.currentDisplayExperience = pokemon.currentExperience;
			this.targetExperience = pokemon.experienceFromLevel(pokemon.level + 1);
			this.currentColor = { r: 0, g: 0, b: 1 }; // Start with blue
			this.targetColor = { r: 0, g: 0, b: 1 };
		}
	}

	/**
	 * Renders the progress bar with smooth animations.
	 */
	render() {
		if (this.type === ProgressBar.TYPE.HEALTH) {
			this.renderHealthProportion();
		} else {
			this.renderExperienceProportion();
		}
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
		
		// Use animated color values
		const r = Math.floor(this.currentColor.r * 255);
		const g = Math.floor(this.currentColor.g * 255);
		const b = Math.floor(this.currentColor.b * 255);
		
		context.fillStyle = `rgb(${r}, ${g}, ${b})`;
		context.fillRect(this.position.x, this.position.y, fillWidth, this.dimensions.y);

		// Border
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.strokeRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		context.restore();
    }

	/**
	 * Renders the experience proportion of the Pokemon
	 */
	renderExperienceProportion() {
		// Update animations
		this.updateExperience();
		
		context.save();

		// Background
		context.fillStyle = '#222222';
		context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		// Experience fill using animated values
		const expRatio = this.currentDisplayExperience / this.pokemon.targetExperience;
		const fillWidth = expRatio * this.dimensions.x;
		
		// Use animated color values
		const r = Math.floor(this.currentColor.r * 255);
		const g = Math.floor(this.currentColor.g * 255);
		const b = Math.floor(this.currentColor.b * 255);
		
		context.fillStyle = `rgb(${r}, ${g}, ${b})`;
		context.fillRect(this.position.x, this.position.y, fillWidth, this.dimensions.y);

		// Border
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.strokeRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);

		context.restore();
	}

	/**
	 * Updates the target values and starts tween animations for experience
	 */
	updateExperience() {
		// Check if experience has changed
		if (this.targetExperience !== this.pokemon.currentExperience) {
			this.targetExperience = this.pokemon.currentExperience;
			
			// Start experience bar width tween
			timer.tween(
				this,
				['currentDisplayExperience'],
				[this.targetExperience],
				0.8 // Slower     
			);
			
			// Experience bars can have color effects for level ups
			if (this.pokemon.currentExperience >= this.pokemon.targetExperience) {
				// Flash gold when experience is full (level up!)
				this.currentColor = { r: 1, g: 0.84, b: 0 }; // Gold flash
				timer.tween(
					this.currentColor,
					['r', 'g', 'b'],
					[0, 0, 1], // Back to blue
					0.5
				);
			}
		}
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
