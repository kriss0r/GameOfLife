let grid;
let cols;
let rows;
let resolution = 20;
let framerate = 10;

blinker1 = [[0,1,0],[0,1,0],[0,1,0]];
blinker2 = [[0,0,0],[1,1,1],[0,0,0]];
clock = [[0,1,0,0],[0,1,0,1],[1,0,1,0],[0,0,1,0]];
octagon = [[0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0],[1,1,0,1,1,0,1,1],[0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0],[1,1,0,1,1,0,1,1],[0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0]];

glider = [[0,0,1],[1,0,1],[0,1,1]];

spaceship1 = [[0,1,0,1],[1,0,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,0]];
spaceship2 = [[0,1,0,1,0],[1,0,0,0,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,1,0],[1,1,1,0,0]];
spaceship3 = [[0,1,0,1,0],[1,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,1,0],[1,1,1,0,0]];

// for more see: https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens#Die_Objekte

let structures = [
	{figure: blinker1, pos: {x: 15, y: 3}},
	{figure: clock, pos: {x: 20, y: 3}},
	{figure: octagon, pos: {x: 30, y: 1}},
	{figure: spaceship1, pos: {x: 5, y: 12}},
	{figure: spaceship2, pos: {x: 5, y: 22}},
	{figure: spaceship3, pos: {x: 5, y: 32}},
	{figure: glider, pos: {x: 0, y: 0}}
];

function setup(){
	createCanvas(800, 800);
	frameRate(framerate);
	cols = width / resolution;
	rows = height / resolution;
	grid = makeArray(cols, rows);

	if(structures.length === 0)
		structures[0] = {figure: 'random', pos: {x: 0, y: 0}};
	for(s in structures){
		addStructure(
			grid,
			structures[s].figure,
			structures[s].pos.x,
			structures[s].pos.y
		);
	}
}

function draw(){
	background(0);
//	noStroke();
	let next = makeArray(cols, rows);
	let neighbors;
	let state;

	for (let i=0; i<cols; i++){
		for (let j=0; j<rows; j++){
			let x = i * resolution;
			let y = j * resolution;
			state = grid[i][j];
			if(state === 1){
				fill(255);
				stroke(0);
				rect(x, y, resolution - 1, resolution - 1);
			}
			neighbors = countNeighbors(grid, i, j);
			next[i][j] = state;
			if(state === 0 && neighbors === 3){
				next[i][j] = 1;
			}
			else if(state === 1 && (neighbors < 2 || neighbors > 3)){
				next[i][j] = 0;
			}
		}
	}
	grid = next;
//	console.log(frameRate());
}

function addStructure(grid, figure, posX, posY){
	if(figure === 'random'){
		for (let i=0; i<cols; i++){
			for (let j=0; j<rows; j++){
				grid[i][j] = floor(random(2));
			}
		}
	}
	else{
		y = figure.length;
		x = figure[0].length;
		for (let i=0; i<y; i++)
			for (let j=0; j<x; j++)
				grid[i+posX][j+posY] = figure[i][j];
	}
}

function makeArray(cols, rows){
	let arr = new Array(cols);
	for (let i=0; i<cols; i++){
		arr[i] = new Array(rows);
		for (let j=0; j<rows; j++)
			arr[i][j] = 0;
	}
	return arr;
}

function countNeighbors(grid, x, y){
	let sum = 0;
	let nx;
	let ny;
	for (let i = -1; i < 2; i++){
		for (let j = -1; j < 2; j++){
			if( i == 0 && j == 0)
				continue;
			nx = x + i;
			ny = y + j;
			if(nx < 0)
				nx = cols - 1;
			else if(nx === cols)
				nx = 0;
			if(ny < 0)
				ny = rows - 1;
			else if(ny === rows)
				ny = 0;
			sum += isNaN(grid[nx][ny]) ? 0 : grid[nx][ny];
		}
	}
	return sum;
}
