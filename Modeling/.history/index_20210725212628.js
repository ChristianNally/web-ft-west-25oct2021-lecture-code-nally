class Planet {

  constructor(name, x, y, Vx, Vy, mass) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.Vx = Vx;
    this.Vy = Vy;
    this.mass = mass;
    this.updatePhaseSpace();
  }

  // get gravity(){
  //   return this.calcGravity();
  // }

  updatePhaseSpace(){
    console.log(`${this.name}: x=${this.x} y=${this.y} Vx=${this.Vx} Vy=${this.Vy} mass=${this.mass}`);
    const [Fx,Fy] = this.calcGravity();
    console.log(`Fx=${Fx} Fy=${Fy}`);

    const Ax = Fx / this.mass;
    const Ay = Fy / this.mass;
    
    this.Vx = this.Vx + Ax;
    this.Vy = this.Vy + Ay;

    this.x = this.x + Vx;
    this.y = this.y + Vy;

    setTimeout(()=>{
      this.updatePhaseSpace();
    },1000);    
  }

  calcGravity(){
    // assumes all gravity is due to the mutual attraction between
    // the planet passed in and the Sun.

    const Msun = 1000; // mass of the Sun
    const G = 1; // gravitational constant

    const r = Math.sqrt((this.x)**2 + (this.y)**2);
    console.log('r:',r);

    const f = G * Msun * this.mass / (r * r); // the force due to gravity
    console.log('magnitude of gravity:',f);

    return [f * this.x / r, f * this.y / r];
  }

}

// name, x, y, vx, vy, mass

const earth = new Planet('Earth',100,100,10,10,1);
