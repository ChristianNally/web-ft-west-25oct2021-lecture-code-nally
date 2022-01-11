class Planet {

  constructor(x, y, vx, vy, mass) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
  }

  // get gravity(){
  //   return this.calcGravity();
  // }

  updatePhaseSpace(){
    const [Fx,Fy] = this.calcGravity();
    const Ax = Fx / this.mass;
    const Ay = Fy / this.mass;
    
    this.vx = this.vx + Ax;
    this.vy = this.vy + Ay;

    setTimeout(()=>{
      this.updatePhaseSpace();
    },1000);    
  }

  calcGravity(){
    // assumes all gravity is due to the mutual attraction between
    // the planet passed in and the Sun.

    const Msun = 1000; // mass of the Sun
    const G = 1; // gravitational constant

    const gravityVector = []; // in x,y coordinates

    const r = sqrt((this.x)**2 + (this.y)**2);
    console.log('r:',r);

    f = G*Msun*m/(r*r); // the force due to gravity
    console.log('magnitude of gravity:',f);

    return gravityVector;
  }

}

module.exports = {
  Planet
}

