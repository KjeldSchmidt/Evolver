var creatureCount = 1000;
var totalCreatureIndex = 0;
var creatures = [];

startUp();

function startUp() {
	creatures = randomFirstGeneration( creatureCount );
	gameLoop();
}

function gameLoop() {
	ageAllCreatures();
	battleRoyale();
	euthanize();
	procreate();
	Output.lifeStats();
}

function battleRoyale() {
	shuffle( creatures );
	for ( var i = 0; i < creatures.length -1; i += 2 ) {

		var creature1 = creatures[ i ];
		var creature2 = creatures[ i + 1 ]

		contest( creature1, creature2 );
	}
}

function contest( creature1, creature2 ) {

	if ( creature1.intimidation < creature2.bravery && creature2.intimidation < creature1.bravery ) {
		fight( creature1, creature2 );
	} else if ( creature1.intimidation > creature2.bravery ) {
		chase( creature1, creature2 );
	} else if ( creature2.intimidation > creature1.bravery ) {
		chase( creature2, creature1 );
	} // else, both creatures flee from another, nothing happens
}

function chase( agressor, defender ) {
	if ( ! ( defender.speed > agressor.speed || defender.speed.isClose( agressor.speed, 0.1 ) ) ) {
		defender.markForDeath();
		reward( agressor );
	}
}

function fight( creature1, creature2 ) {
	if ( creature1.strength.isClose( creature2.strength, 0.1 ) ) {
		creature1.markForDeath();
		creature2.markForDeath();
	} else if ( creature1.strength > creature2.strength ) {
		creature2.markForDeath();
		reward( creature1 );
	} else if ( creature2.strength > creature1.strength ) {
		creature1.markForDeath();
		reward( creature2 );
	}
}

function reward( creature ) {
	creature.fertilityBonus += 0.1;
}

function procreate() {
	var creaturesByFertility = creatures.sort( function( a, b ) {
		return a.getFertility() > b.getFertility();
	});

	for ( var i = 0; i < creatures.length && creatures.length < creatureCount; i++ ) {
		var creature = creatures[i];
		var skip = ( 1 - creature.getFertility() ) > Math.random();

		if ( !skip ) {
			creatures.push( creature.procreate() );
		}
	}
}

function euthanize() {
	creatures = creatures.filter( function( creature ) {
		return !creature.markedForDeath;
	});
}

function ageAllCreatures() {
	creatures.forEach( function( creature ) {
		creature.age++;
	});
}