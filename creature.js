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
}

Creature.prototype.getFertility = function() {
	return sigmoid( this._fertility + this.fertilityBonus );
};

Creature.prototype.procreate = function() {
	var mutability = getRandomArbitrary( mutability - this.mutability/2, mutability + this.mutability/2 );
	var fertility = getRandomArbitrary( fertility - this.mutability/2, fertility + this.mutability/2 );
	var intimidation = getRandomArbitrary( intimidation - this.mutability/2, intimidation + this.mutability/2 );
	var bravery = getRandomArbitrary( bravery - this.mutability/2, bravery + this.mutability/2 );
	var strength = getRandomArbitrary( strength - this.mutability/2, strength + this.mutability/2 );
	var speed = getRandomArbitrary( speed - this.mutability/2, speed + this.mutability/2 );

	totalCreatureIndex++;
	Output.totalBirths++;
	return new Creature( totalCreatureIndex, mutability, fertility, intimidation, bravery, strength, speed, this.id );
}

Creature.prototype.markForDeath = function() {
	this.markedForDeath = true;
	Output.totalDeaths++;
}