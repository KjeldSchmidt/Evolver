let creatureStart = 1000;
let creatureMax = 1500;
let generationsToDo = 2000;

var totalCreatureIndex = 0;
var generation = 0;
var creatures = [];

startUp();

function startUp() {
	creatures = randomFirstGeneration( creatureStart );
	for ( var i = 0; i < generationsToDo; i++ ) {
		gameLoop();
	}
	console.log( creatures.length );
	Output.chartAge();
	Output.chartMaxAge();
	Output.chartAverageAge();
	Output.someRadarCharts();
}

function gameLoop() {
	ageAllCreatures();
	battleRoyale();
	euthanize();
	procreate();
	observeStats();
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
		return a.getFertility() < b.getFertility();
	});

	var currentLength = creatures.length;

	for ( var i = 0; i < currentLength && creatures.length < creatureMax; i++ ) {
		var creature = creatures[i];
		var skip = creature.getFertility() > Math.random();

		if ( !skip ) {
			var child = creature.procreate();
			if ( child != undefined ){
				creatures.push( child );
			}			
		}
	}
}

function euthanize() {
	creatures = creatures.filter( function( creature ) {
		return !creature.markedForDeath;
	});
}

function ageAllCreatures() {
	generation++;
	creatures.forEach( function( creature ) {
		creature.age++;
		creature.fertilityBonus = 0;
	});
}


/*
*	Volatile function to track everything you care about in output. Remove or disable calls to improve speeds.
*/
function observeStats() { 
	Output.maxAgeAtGeneration[ generation ] = creatures.sort( function( a, b ) {
		return a.age < b.age;
	})[0].age;

	Output.averageAgeAtGeneration[ generation ] = creatures.reduce( function( prev, elem ) {
		return prev + elem.age;
	}, 0) / creatures.length;
}