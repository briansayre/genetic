class Person {

    constructor() {
        this.genes = [];
        this.pos = createVector(WIDTH/2, HEIGHT/2);
        this.index = 0;
        this.angle = 0;
        this.reachedGoal = false;
    }
    
    draw() {
        fill(204, 101, 192, 127);
        ellipse(this.pos.x, this.pos.y, 5);
    }
    
    update() {
        if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
            this.reachedGoal = true;
        } else {
            this.angle += atan(this.genes[this.index].x, this.genes[this.index].y);
            this.pos.x -= SPEED * cos(this.angle);
            this.pos.y -= SPEED * sin(this.angle);
        }
        this.index++;
      
    }

    generateGenes() {
        for (let i = 0; i < GENE_LENGTH; i++) {
            this.genes[i] = p5.Vector.random2D();
        }
    }

    calcFitness() {
        const distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
        console.log("Distance: "+distanceToGoal)
        let normalised = distanceToGoal / WIDTH;
        return 1 - normalised;
    }

    
    mutate(mutationRate) {
        for (let i = 0; i < GENE_LENGTH; i++) {
            if (random(1) < mutationRate) {
                this.genes[i] = p5.Vector.random2D();
            }
        }
    }


}