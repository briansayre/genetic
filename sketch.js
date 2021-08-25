const POPULATION_COUNT = 50;
const GENE_LENGTH = 200;
const SPEED = 2;
const WIDTH = 640;
const HEIGHT = 900;

let population = [];
let matingPool = [];
let generation = 1;
let moveCount = 0;
let mutationRate = 1/GENE_LENGTH;
let avgFit = 0;


function setup() {
  createCanvas(WIDTH, HEIGHT);
  for (let i = 0; i < POPULATION_COUNT; i++) {
    let p = new Person();
    p.generateGenes();
    population.push(p);
  }
  goal = createVector(WIDTH/2, 200);
  genMostFit = createVector(WIDTH/2, HEIGHT/2);
}

function draw() {
  background(200);
  textSize(32);
  text(generation, 10, 30);
  text(avgFit, 10, 70);
  fill(255, 30, 30);
  ellipse(WIDTH/2, HEIGHT/2, 5);
  rect(goal.x, goal.y, 5, 5);
  fill(30, 255, 30);
  ellipse(genMostFit.x, genMostFit.y, 5);
  moveCount++;
  for (let person of population) {
    person.update();
    person.draw();
  }
  if (moveCount == GENE_LENGTH) {
    moveCount = 0;
    naturalSelection();
    reproduce();
    generation++;
  }
}


function naturalSelection() {
  matingPool = [];
  let bestFit = 0;
  let totalFit = 0;
  for (let person of population) {
    let fitness = person.calcFitness();
    totalFit += fitness;
    if (fitness > bestFit) {
      bestFit = fitness;
      genMostFit = person.pos;
    }
    let n = floor(pow(fitness, 2) * 100);
    console.log(n + " " + fitness)
    for (let i = 0; i < n; i++) {
      matingPool.push(person);
    }
  }
  avgFit = totalFit / POPULATION_COUNT;
}


function reproduce() {
  for (let i = 0; i < population.length; i++) {
    let mummyIndex = floor(random(matingPool.length));
    let daddyIndex = floor(random(matingPool.length));

    let mummy = matingPool[mummyIndex];
    let daddy = matingPool[daddyIndex];

    let child = crossover(daddy, mummy);
    child.mutate(mutationRate);
    population[i] = child;
  }
}

function crossover(d, m) {
  let child = new Person();
  for (let i = 0; i < GENE_LENGTH; i++) {
    if (i % 2 == 0) {
      child.genes[i] = (m.genes[i]);
    } else {
      child.genes[i] = (d.genes[i]);
    }
  }
  return child;
}
