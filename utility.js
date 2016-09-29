function sigmoid( t ) {
    return 1 / ( 1 + Math.pow( Math.E, -t ) );
}

function randomFirstGeneration( creatureCount ) {
	var creatures = [];
	for ( var i = 0; i < creatureCount; i++ ) {
		creatures.push( randomCreature() );
	}

	return creatures;
}    

Number.prototype.isClose = function( number, tolerance ) {
	return Math.abs( this - number ) < tolerance;
}

function randomCreature() {
	totalCreatureIndex++;
	var mutability = getRandomMax( 0.3 );
	var fertility = getRandomMax( 0.3 );
	var intimidation = getRandomMax( 0.7 );
	var bravery = getRandomMax( 0.7 );
	var strength = getRandomMax( 0.3 );
	var speed = getRandomMax( 0.3 );

	return new Creature( totalCreatureIndex, mutability, fertility, intimidation, bravery, strength, speed );
}

function getRandomMax( max ) {
	return Math.random() * max;
}

function getRandomArbitrary( min, max ) {
  return Math.random() * (max - min) + min;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}