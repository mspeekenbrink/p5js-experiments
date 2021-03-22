function CMAB(pos,label,x,y,e,r,colour,bg_colour) {
  this.pos = pos;
  this.label = label;
  this.x = x;
  this.y = y;
  this.value = e;
  this.reward = r;
  this.draw = function(p) {
    p.setup = function() {
      p.createCanvas(200, 200);
      p.noLoop();
    }

    p.draw = function() {
      p.background(bg_colour);
      p.stroke(colour);
      let thickness = 1 + x*7;
      //let scaling = .6 + y*0.2;
      let scaling = .78;
      //let width = 0.3;
      let width = .08 +  ((Math.exp(1.7*y) - Math.exp(0))/(Math.exp(1.7*1)-Math.exp(0)))*.5;
      // console.log("thickness is ", + thickness);
      p.strokeWeight(thickness);
      p.translate(p.width/2,p.height-20);
      branch(0);

      function branch(depth){
        if (depth < 12) {
          p.line(0,0,0,-p.height/10); // draw a line going up
          {
            p.translate(0,-p.height/10); // move the space upwards
            p.rotate(p.random(-0.05,0.05)); // random wiggle

            if (p.random(1.0) < 0.85 || depth === 0) { // branching
              // p.rotate(0.3); // rotate to the right
              p.rotate(width); // rotate to the right
              p.scale(scaling); // scale down
              p.push(); // now save the transform state
              branch(depth + 1); // start a new branch!
              p.pop(); // go back to saved state
              // p.rotate(-0.6); // rotate back to the left
              p.rotate(-2*width); // rotate back to the left
              p.push(); // save state
              branch(depth + 1); // start a second new branch
              p.pop(); // back to saved state
            }
            else { // no branch - continue at the same depth
              branch(depth);
            }
          }
        }
      }
    }
  };
}

function sample_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let colours = [[[51,51,0,255],[51,51,0,30]], // army green
             [[102,0,0,255],[102,0,0,30]], // brown-red
             [[0,51,51,255],[0,51,51,30]], // blue-green
             [[51,0,51,255],[51,0,51,30]], // purpleish
             [[0,0,102,255],[0, 0, 102,30]], // blue
             [[0,51,102,255],[0,51,102,30]]]; // sea-green

let all_stims = [];
let dim1 = [0.0,0.2,0.4,0.6,0.8,1.0];
let dim2 = [0.0,0.2,0.4,0.6,0.8,1.0];
for (var i = 0; i < dim1.length; i ++) {
  for (var j = 0; j < dim2.length; j ++) {
    all_stims[i*dim2.length + j] = [dim1[i],dim2[j]];
  }
}
let grid_size = [6,6];

let all_options = [];
for(var i=0; i < all_stims.length; i++) {
  let col = sample_int(0,5);
  let stim = new CMAB([],"",all_stims[i][0],all_stims[i][1],0,0,colours[col][0],colours[col][1]);
  all_options.push(stim);
}

let gridHTML='<table class="bandit_table">', WIDTH=grid_size[1], HEIGHT=grid_size[0];
for (var i = 1; i <= HEIGHT; i++){
  gridHTML += '<tr>';
  for (var j = 1; j <= WIDTH; j++){
    gridHTML += '<td align="center" class="arm_frames"><div id="arm_frame_' + i + 'x' + j + '"></div></td>';
  }
  gridHTML += '</tr>';
}
gridHTML += '</table>';
//append grid HTML at grid div
document.getElementById("container").innerHTML = gridHTML;

// adding arm stimuli
for (var i = 1; i <= HEIGHT; i++){
  for (var j = 1; j <= WIDTH; j++){
    //console.log((i-1)*HEIGHT + j - 1);
    let y = document.createElement('DIV');
    y.setAttribute("id", "arm_" + ((i-1)*HEIGHT + j - 1));
    y.setAttribute("class", "arm");
    document.getElementById('arm_frame_' + i + 'x' + j).appendChild(y);
    let myp5 = new p5(all_options[(i-1)*HEIGHT + j - 1].draw, 'arm_' + ((i-1)*HEIGHT + j - 1));
    //console.log("creating arm " + ((i-1)*HEIGHT + j - 1));
  }
}
