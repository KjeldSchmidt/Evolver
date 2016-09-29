
var Output = {
	totalDeaths: 0,
	totalBirths: 0,

	maxAgeAtGeneration: [],
	averageAgeAtGeneration: [],

	lifeStats: function() {
		console.log( creatures.length + " creatures are alive");
		console.log( Output.totalDeaths + " creatures died" );
		console.log( Output.totalBirths + " creatures have been born" );
	},

	showGeneration: function() {

	},

	highestAge: function() {

	},

	youngestGeneration: function() {

	},

	chartAge: function() {
		var ages = new Array( generation ).fill( 0 );
		var highestAge;

		creatures.forEach( function( creature ) {
			ages[ creature.age ] += 1;
		});

		for (var i = ages.length - 1; i > 0; i--) {
			if ( ages[i] != 0 ) {
				highestAge = i;
				break;
			}
		}

		var ctx = document.getElementById("ageDistribution");

		var ageChart = new Chart( ctx, {
			type: 'bar',
			data: {
				labels: naturalNumbersArray( highestAge ),
				datasets: [{
					data: ages,
					backgroundColor: 'rgba( 25, 25, 25, 1 )'
				}],
			}
		});
	},

	chartMaxAge: function() {
		var ctx = document.getElementById("maxAge");
		
		var maxAgeChart = new Chart( ctx, {
			type: 'line',
			data: {
				labels: naturalNumbersArray( generation ),
				datasets: [{
					data: Output.maxAgeAtGeneration,
				}]
			}
		});
	},

	chartAverageAge: function() {
		var ctx = document.getElementById("averageAge");
		
		var maxAgeChart = new Chart( ctx, {
			type: 'line',
			data: {
				labels: naturalNumbersArray( generation ),
				datasets: [{
					data: Output.averageAgeAtGeneration,
				}]
			}
		});
	}


}