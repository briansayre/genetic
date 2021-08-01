class Person {

    constructor() {
        this.genes = [];
        this.pos = createVector(windowWidth/2, windowHeight/2);
        this.index = 0;
        this.angle = 0;
    }
    
    draw() {
        fill(204, 101, 192, 127);
        ellipse(this.pos.x, this.pos.y, 5);
    }
    
    update() {
        this.angle += atan(this.genes[this.index].x, this.genes[this.index].y);
        this.pos.x -= SPEED * cos(this.angle);
        this.pos.y -= SPEED * sin(this.angle);
        this.index++;
    }

    generateGenes() {
        for (let i = 0; i < GENE_LENGTH; i++) {
            this.genes[i] = p5.Vector.random2D();
        }
    }

    calcFitness() {
        const distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
        let normalised = distanceToGoal / windowWidth;
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