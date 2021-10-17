title = "Pardon Me!";

description = `
[TAP] to avoid\nawkwardly\nbumping into\npeople
`;

/**
 * @typedef {{
 * pos: Vector
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;

/**
 * @type { number }
 */
let currentEnemySpeed;

/**
 * @type { number }
 */
let waveCount;

characters = [

  `
yyyyyy
yy y y
yy y y
yyyyyy
 y  y
 y  y
`, `
      
yyyyyy
yy y y
yy y y
yyyyyy
 y  y
`,
  `
yyyyyy
yl l l
yl l l
llllll
 c  c
 c
`,
  `
yyyyyy
yl l l
yl l l
llllll
 c  c
    c
`
];

const G = {
  WIDTH: 100,
  HEIGHT: 75,
  ENEMY_MIN_BASE_SPEED: 1.0,
  ENEMY_MAX_BASE_SPEED: 2.0
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 7,
  theme: "crt"
};

let x;
let w;
let counter = 0;

enemies = [];

waveCount = 0;
currentEnemySpeed = 0;

function update() {
  if (!ticks) {
    x = 50;
    w = 1;
  }

  score++;

  color("black");
  char(addWithCharCode("a", ((ticks / 15) % 2)), x, G.HEIGHT - G.HEIGHT / 4)

  x += w * difficulty;
  if (input.isJustPressed || x < 0 || x > G.WIDTH) {
    w *= -1;
  }

  if (enemies.length === 0) {
    currentEnemySpeed =
      rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED) * difficulty;
    for (let i = 0; i < 9; i++) {
      const posX = rnd(0, G.WIDTH);
      const posY = -rnd(i * G.HEIGHT * 0.1);
      enemies.push({ pos: vec(posX, posY) })
    }
  }

  remove(enemies, (e) => {
    e.pos.y += currentEnemySpeed;
    color("black");
    //char("c", e.pos);

    const isCollidingWithPlayer = char(addWithCharCode("c", ((ticks / 5) % 2)), e.pos).isColliding.char.a;

    if (isCollidingWithPlayer) {
      color("red");
      play("explosion")
      particle(e.pos);
      counter++;
    }

    return (isCollidingWithPlayer || e.pos.y > G.HEIGHT);
  });

  if (counter == 3) {
    play("powerUp");
    end();
    counter = 0;
  }
}

/*
char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos);
Brian, this is the line I use to do animations on a single 6x6 character image, you could replace the floor(ticks/15) part with your own in game counter variable to fine tune the animation if you want to implement a person kicking the box/concrete
*/