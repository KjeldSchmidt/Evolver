function Creature( id, mutability, fertility, intimidation, bravery, strength, speed, parent ) {
	this.id = id;
	this.mutability = mutability;
	this._fertility = fertility;
	this.intimidation = intimidation;
	this.bravery = bravery;
	this.strength = strength;
	this.speed = speed;
	this.parent = parent || null;

	this.age = 0;
	this.name = name;
	this.fertilityBonus = 0;
	this.markedForDeath = false;
	this.bornIn = generation;

	this.canvas = null;
}

Creature.prototype.getFertility = function() {
	return shiftedSigmoid( this._fertility + this.fertilityBonus );
};

Creature.prototype.procreate = function() {
	var mutability = getRandomArbitrary( this.mutability - this.mutability/2, this.mutability + this.mutability/2 );
	var fertility = getRandomArbitrary( this._fertility - this.mutability/2, this._fertility + this.mutability/2 );
	var intimidation = getRandomArbitrary( this.intimidation - this.mutability/2, this.intimidation + this.mutability/2 );
	var bravery = getRandomArbitrary( this.bravery - this.mutability/2, this.bravery + this.mutability/2 );
	var strength = getRandomArbitrary( this.strength - this.mutability/2, this.strength + this.mutability/2 );
	var speed = getRandomArbitrary( this.speed - this.mutability/2, this.speed + this.mutability/2 );

	if ( !( this.mutability > Math.random() ) ) {
		totalCreatureIndex++;
		Output.totalBirths++;
		return new Creature( totalCreatureIndex, mutability, fertility, intimidation, bravery, strength, speed, this.id );	
	}
}

Creature.prototype.markForDeath = function() {
	this.markedForDeath = true;
	Output.totalDeaths++;
}

Creature.prototype.drawRadarChart = function() {
	if ( this.canvas == null ) {
		document.getElementById("creatureRadars").insertAdjacentHTML( 'beforeend', '<canvas id="' + this.id + '" width="250" height="250"></canvas>' );
		this.canvas = document.getElementById( this.id );
	}

	var ctx = this.canvas;

	var radarChart = new Chart( ctx, {
		type: 'radar',
		data: {
			labels: [ "mutability", "fertility", "intimidation", "bravery", "strength", "speed" ],
			datasets: [{
				label: this.id,
				data: this.getStatsArray(),	
			}]
		}
	});
}

Creature.prototype.getStatsArray = function() {
	return [ this.mutability, this._fertility, this.intimidation, this.bravery, this.strength, this.speed ];
}