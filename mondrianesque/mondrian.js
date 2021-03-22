let colours = ['#FFFFFF','#dd0100','#fac901','#225095'];
let image_width = 400;
let image_height = 400;
let max_depth = 5;
let prop_split = 0.8;
let prop_horizontal = 0.5;
let prop_split_dimension_flip = 0.9;
let rect_border = 5;
let split_padding = 0.1;

function setup() {
  createCanvas(image_width, image_height);
  noLoop();
}

function draw() {
  background(220);
  draw_rect(0,0,image_width,image_height,random(colours));
  split_rect(0,0,image_width,image_height,0, prop_horizontal);
}

function split_rect(x,y,width,height,depth, prop_horizontal) {
  if (depth < max_depth && width > 4 * rect_border && height > 4 * rect_border && random(1.0) < Math.pow(prop_split,depth)) {
    var split_point = split_padding + (1.0 - 2.0 * split_padding) * random(1.0);
    if (random(1.0) < prop_horizontal) {
      // horizontal split
      draw_rect(x,y,split_point * width, height, random(colours));
      if(random(1.0) <  prop_split_dimension_flip) {
        split_rect(x,y,split_point * width, height, depth + 1, 1.0 - prop_horizontal);
      } else {
        split_rect(x,y,split_point * width, height, depth + 1, prop_horizontal);
      }
      draw_rect(x + split_point * width, y, (1.0 - split_point) * width, height, random(colours));
      if(random(1.0) <  prop_split_dimension_flip) {
        split_rect(x + split_point * width, y, (1.0 - split_point) * width, height, depth + 1, 1.0 - prop_horizontal);
      } else {
        split_rect(x + split_point * width, y, (1.0 - split_point) * width, height, depth + 1, prop_horizontal);
      }
    } else {
      // vertical split
      draw_rect(x,y, width, split_point * height, random(colours));
      if(random(1.0) <  prop_split_dimension_flip) {
        split_rect(x,y,width, split_point * height, depth + 1, 1.0 - prop_horizontal);
      } else {
        split_rect(x,y,width, split_point * height, depth + 1, prop_horizontal);
      }
      draw_rect(x, y  + split_point * height, width, (1.0 - split_point) * height, random(colours));
      if(random(1.0) <  prop_split_dimension_flip) {
        split_rect(x, y  + split_point * height, width, (1.0 - split_point) * height, depth + 1, 1.0 - prop_horizontal);
      } else {
        split_rect(x, y  + split_point * height, width, (1.0 - split_point) * height, depth + 1, prop_horizontal);
      }
    }
  }
}

function draw_rect(x,y,width,height,colour) {
  strokeWeight(rect_border);
  fill(colour);
  rect(x,y,width,height);
}
