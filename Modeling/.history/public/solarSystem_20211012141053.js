// const beginningOfTime = new Date();

// TODO
//
// 1) add planets via mouse. 
// - click start position,
// - drag to make velocity vector, 
// - vector color changes while dragging,
// - where white vector equals escape velocity
//
// 2) change unit to be closer to physical reality
// 
// 3) make the deltaT something proportional to the setTimeout delay 
//
// 4) investigate using something other than first order 
// numerical integration (for improved accuracy)
//
// 5) add controls for deltaT, speed of time evolution, etc.
//

const DELTA = 1; // time-step in milliseconds
const MASS_SIZE = 20; // ratio of pixel size to mass
const UNIVERSE_SIZE = 666; // in pixels

class Planet {
  constructor(configObject) {
    this.name = configObject.name;
    this.class = configObject.class || 'planet';
    this.x = configObject.x || 0;
    this.y = configObject.y || 0;
    this.Vx = configObject.Vx || 0;
    this.Vy = configObject.Vy || 0;
    if ('undefined' === typeof configObject.mass){
      this.mass = 0;
    } else {
      this.mass = configObject.mass;
    }
    this.color = configObject.color || "white";
    this.dynamic = configObject.dynamic; // set false to create a fixed point
    this.zIndex = configObject.zIndex || 0;

    if ('undefined' === typeof configObject.trail){
      this.trail = false;
    } else {
      this.trail = configObject.trail;
    }

    if (this.trail){
      console.log('a trail is being made');
    }

    if (this.name === 'Earth'){
      console.log('an earth is being made');
    }

    if (this.class == 'planet' || this.class == 'trail'){
      // do nothing
    } else {
      console.log('creating orphan trail');
    }

    if (this.dynamic) {
      this.updatePosition(); // set the physical parameters before showing
    }
    this.append(); // show the new planet on the universe
  }

  append() {
    $("#universe").append(`<div id="${this.name}"></div>`);
    $(`#${this.name}`).css("position", "absolute");
    $(`#${this.name}`).css("background-color", this.color);
    const [CSSleft, CSStop] = this.getCSSCoords([this.x, this.y, this.mass]);
    $(`#${this.name}`).css("top", CSStop);
    $(`#${this.name}`).css("left", CSSleft);
    $(`#${this.name}`).addClass(this.class);
    if (this.mass < 0.001){
      $(`#${this.name}`).css("height", 1);
      $(`#${this.name}`).css("width", 1);  
    } else {
      $(`#${this.name}`).css("height", this.mass * MASS_SIZE);
      $(`#${this.name}`).css("width", this.mass * MASS_SIZE);  
    }
    $('#vector_universe').append(`<circle cx="${CSSleft}" cy="${CSStop}" r="${this.mass}" stroke="black" stroke-width="3" fill="red" />`);
    $("body").html($("body").html());
  }

  getCSSCoords([a, b, m]) {
    // CSS displays the object from the upper left corner of the object
    // so, we need to remove 1/2 the height and width
    // and then shift it toward the mid-point of the universe
    const left = a - 0.5 * m * MASS_SIZE + 0.5 * UNIVERSE_SIZE;
    const top = b - 0.5 * m * MASS_SIZE + 0.5 * UNIVERSE_SIZE;
    return [left, top];
  }

  updatePosition() {
    if ($("#state").html() === "Moving" && this.dynamic) {
      const [Fx, Fy] = this.calcGravity();

      // F=MA therefore...
      const Ax = Fx / this.mass;
      const Ay = Fy / this.mass;

      // deltaV = a * deltaT
      const deltaT = 1;
      // in the limit of small deltaT
      // new velocity = old velocity + a * deltaT;
      // where a is caused only by the force of gravity
      this.Vx = this.Vx + Ax * deltaT;
      this.Vy = this.Vy + Ay * deltaT;

      this.x = this.x + this.Vx;
      this.y = this.y + this.Vy;

      const [CSSleft, CSStop] = this.getCSSCoords([this.x, this.y, this.mass]);
      console.log(
        `${this.name}: x=${this.x} y=${this.y} CSSleft=${CSSleft} CSStop=${CSStop} Vx=${this.Vx} Vy=${this.Vy} mass=${this.mass}`
      );

      if (this.trail){
        const timeStamp = Date.now();;
        console.log('timeStamp:',timeStamp);
        const newName = `trail${timeStamp}`;
        const trail = new Planet({name: newName,
          x: this.x,
          y: this.y,
          mass: 0,
          color: 'gray',
          class: 'trail',
          dynamic: false,
          zIndex: -98});
      }
      $(`#${this.name}`).animate({ top: `${CSStop}`, left: `${CSSleft}` }, 0);
    }
    setTimeout(() => {
      this.updatePosition();
    }, DELTA);
  }

  calcGravity() {
    // assumes all gravity is due to the mutual attraction between
    // the planet passed in and the Sun.

    const Msun = 1000; // mass of the Sun
    const G = 10; // gravitational constant

    const r = Math.sqrt(this.x ** 2 + this.y ** 2);
    if (5 > r) {
      console.log(`${this.name}: Too close to the singularity!`);
    }
    const f = (G * Msun * this.mass) / (r * r); // the force due to gravity

    return [(-1 * f * this.x) / r, (-1 * f * this.y) / r];
  }
}

const handleClick = (event) => {
  console.log('event:',event);
};

// name, x, y, vx, vy, mass
$(document).ready(function () {
  $("#startstop").click(function () {
    if ($("#state").html() === "Moving") {
      $("#state").html("Stopped");
    } else {
      $("#state").html("Moving");
    }
  });

  $("#cleartracks").click(function () {
    $('.trail').remove();
  });

  $("div#universe").css("width", `${UNIVERSE_SIZE}px`);
  $("div#universe").css("height", `${UNIVERSE_SIZE}px`);
  $("div#universe").css("background-color", "black");

  const earth = new Planet({name:'Earth', x:100, y:100, Vx:-3, Vy:4.4, mass:1, color:'blue', dynamic: true, trail: true});
  const mars = new Planet({name:'Mars', x:120, y:120, Vx:-3, Vy:4.4, mass:1, color:'red', dynamic: true, trail: true});
  const other = new Planet({name:'Other', x:200, y:200, Vx:-3, Vy:4.4, mass:1, color:'green', dynamic: true, trail: true});
  const y = new Planet({ name: "Sun", mass: 2.5, dynamic: false, zIndex: -99 });

});
