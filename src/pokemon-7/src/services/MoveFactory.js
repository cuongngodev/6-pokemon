import Move from "../entities/Move.js";
import MoveName from "../enums/MoveName.js";

export default class MoveFactory {
	constructor() {
		this.moves = {};
	}

	load(moveDefinitions) {
		this.moves = moveDefinitions;
        Object.keys(moveDefinitions).forEach((name) => {
            MoveName[name] = name;
        });
	}


	get(name) {
		return this.moves[name];
	}

	createInstance(name) {
		if (!this.moves[name]) {
			throw new Error(`Move "${name}" not found in move definitions`);
		}
		return new Move(name, this.moves[name]);
	}
}