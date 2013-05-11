(function (window, document) {

	var D = DOMinate,
		state = {
			'table':'properties'
		};

	function $(e) {
		return document.querySelector(e);
	}

	function cleanUp() {
		$('#content').innerHTML = '';
	}

	function setState(state){
		state.table = $('table').className = state;
	}

	function displayTable(type) {

		function createTable() {
			D([$('#content'),
				['table#.properties']
			]);
		}

		function createTableHead() {

			D([$('table'),
				['thead',
					['tr',
						['th#.sort-down', 'Nr']
					]
				]
			]);


			type.structure.forEach(function (column) {
				D([$('table thead:last-of-type tr'),
					['th', column]
				]);
			});
		}

		function createBody() {

			D([$('table'), ['tbody']]);

			var i = 1;

			type.data.forEach(function (row) {


				D([$('table tbody:last-of-type'),
					['tr',
						['td', String(i++)]
					]
				]);

				row.forEach(function (item) {
					/*if(item.pop){

						item.forEach(function(value){

						});
					}*/

					if(item === true){
						item = ['span#.check','•'];
					}else{
						item = String(item);
					}

					D([$('table tbody:last-of-type tr:last-of-type'),
						['td', item]
					]);
				});
			});

			// Insert thead also in tbody for automatic layouting
			for (a = -1; a < type.structure.length; a++) {

				if (a == -1) {
					D([$('table tbody'),
						['tr#.last',
							['th', 'Nr']
						]
					]);
				} else {
					D([$('table tr.last'),
						['th', type.structure[a]]
					]);
				}
			}
		}


		if (state.table != type) {

			createTable();

			createTableHead();

			createBody();

			$('table').style.display = 'inline-block';

			new Tablesort(document.querySelector('#content table'));

			var bodyCells = document.querySelectorAll('tbody tr:first-of-type td');
			var headCells = document.querySelectorAll('thead tr:first-of-type th');

			//take over width of layouted header
			for (var a = 0; a < bodyCells.length; a++) {
				headCells[a].style.width = bodyCells[a].offsetWidth + 'px';
			}
		}
	}

	$('#properties').addEventListener('click', function () {
		cleanUp();
		displayTable(properties);
		setState('properties');
	});
	$('#selectors').addEventListener('click', function () {
		cleanUp();
		displayTable(selectors);
		setState('selectors');
	});

	displayTable(properties);


})(window, document);