var W = 920,
	H = 640,
	FPS = 60,
	CAMERA_SPEED = 420,
	CAMERA_LERP = 0.05,

	PI = Math.PI,
	PI2 = Math.PI * 2,

	MAX_TRAIL_LENGTH = 5,
	SHIP_FRICTION = 0.9,
	SHIP_RADIUS = 8,
	SHIP_SHOT_INTERVAL = 500,
	SHIP_ATTACK_RADIUS = 100,
	SHIP_TARGET_SEPARATION = 50,
	SHIP_EVADE_RADIUS = 300,
	SHIP_UNDER_ATTACK = 3,

	SECTOR_RADIUS = 50,
	SECTOR_BAR_WIDTH = 150,
	SECTOR_BAR_HEIGHT = 5,
	SECTOR_BAR_OFFSET = 5,
	SECTOR_CONQUER_RADIUS = SECTOR_RADIUS * 1.7,
	SECTOR_CONQUER_TIME = 3,

	HEALTH_BAR_HEIGHT = 3,
	HEALTH_BAR_WIDTH = 20,

	ENEMY = {
		name: "enemies",
		strokeColor: "hsl(0, 100%, 50%)",
		fillColor: "hsla(0, 100%, 50%, 0.2)",
		phaseOffset: PI
	},

	PLAYER = {
		name: "player",
		strokeColor: "hsl(140, 100%, 50%)",
		fillColor: "hsla(140, 100%, 50%, 0.2)",
		phaseOffset: PI / 4
	},

	// Bullets
	BULLET = { speed: 150, disappear: 2, dmg: 0.15, color: "hsl(0, 90%, 60%)" };

PLAYER.enemy = ENEMY;
ENEMY.enemy = PLAYER;

var LETTERS = {
	'0': [
		[ , 1, 1, 1, ],
		[1,  ,  ,  , 1],
		[1,  ,  ,  , 1],
		[1,  ,  ,  , 1],
		[ , 1, 1, 1, ]
	],
	'1': [
		[ , ,  1,  , ],
		[ , 1, 1,  , ],
		[ ,  , 1,  , ],
		[ ,  , 1,  , ],
		[1, 1, 1, 1, 1]
	],
	'2': [
		[1, 1, 1, 1, ],
		[ ,  ,  ,  , 1],
		[ , 1, 1, 1, ],
		[1,  ,  ,  , ],
		[1, 1, 1, 1, 1]
	],
	'3': [
		[ 1, 1, 1, 1,  ],
		[  ,  ,  ,  , 1 ],
		[  , 1, 1, 1, 1 ],
		[  ,  ,  ,  , 1 ],
		[ 1, 1, 1, 1,  ]
	],
	'4': [
		[ 1,  ,  , 1,  ],
		[ 1,  ,  , 1,  ],
		[ 1, 1, 1, 1, 1 ],
		[  ,  ,  , 1,  ],
		[  ,  ,  , 1,  ]
	],
	'5': [
		[ 1, 1, 1, 1, 1 ],
		[ 1,  ,  ,  ,  ],
		[ 1, 1, 1, 1,  ],
		[  ,  ,  ,  , 1 ],
		[ 1, 1, 1, 1,  ]
	],
	'6': [
		[  , 1, 1, 1,  ],
		[ 1,  ,  ,  ,  ],
		[ 1, 1, 1, 1,  ],
		[ 1,  ,  ,  , 1 ],
		[  , 1, 1, 1,  ]
	],
	'7': [
		[ 1, 1, 1, 1, 1 ],
		[  ,  ,  ,  , 1 ],
		[  ,  ,  , 1,  ],
		[  ,  , 1,  ,  ],
		[  ,  , 1,  ,  ]
	],
	'8': [
		[  , 1, 1, 1,  ],
		[ 1,  ,  ,  , 1 ],
		[  , 1, 1, 1,  ],
		[ 1,  ,  ,  , 1 ],
		[  , 1, 1, 1,  ]
	],
	'9': [
		[  , 1, 1, 1,  ],
		[ 1,  ,  ,  , 1 ],
		[  , 1, 1, 1, 1 ],
		[  ,  ,  ,  , 1 ],
		[  , 1, 1, 1,  ]
	],
	'': [
		[  , 1, 1, 1,  ],
		[ 1,  ,  ,  , 1 ],
		[ 1,  ,  ,  , 1 ],
		[ 1,  ,  ,  , 1 ],
		[  , 1, 1, 1,  ]
	],
	"A": [
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, , , , 1]
	],
	"B": [
		[1, 1, 1, 1, ],
		[1, , , 1, ],
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1]
	],
	"C": [
		[1, 1, 1, 1, 1],
		[1, , , , ],
		[1, , , , ],
		[1, , , , ],
		[1, 1, 1, 1, 1]
	],
	"D": [
		[1, 1, 1, , ],
		[1, , , 1, ],
		[1, , , , 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1]
	],
	"E": [
		[1, 1, 1, 1, 1],
		[1, , , , ],
		[1, 1, 1, , ],
		[1, , , , ],
		[1, 1, 1, 1, 1]
	],
	"G": [
		[1, 1, 1, 1, 1],
		[1, , , , ],
		[1, , 1, 1, 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1]
	],
	"H": [
		[1, , , , 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, , , , 1]
	],
	"I": [
		[1, 1, 1, 1, 1],
		[, , 1, , ],
		[, , 1, , ],
		[, , 1, , ],
		[1, 1, 1, 1, 1]
	],
	"L": [
		[1, , , , ],
		[1, , , , ],
		[1, , , , ],
		[1, , , , ],
		[1, 1, 1, 1, 1]
	],
	"M": [
		[1, , , , 1],
		[1, 1, , 1, 1],
		[1, , 1, , 1],
		[1, , , , 1],
		[1, , , , 1]
	],
	"N": [
		[1, , , , 1],
		[1, 1, , , 1],
		[1, , 1, , 1],
		[1, , , 1, 1],
		[1, , , , 1]
	],
	"O": [
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, , , , 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1]
	],
	"P": [
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1],
		[1, , , , ],
		[1, , , , ]
	],
	"R": [
		[1, 1, 1, 1, 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1],
		[1, , , 1, ],
		[1, , , , 1]
	],
	"S": [
		[1, 1, 1, 1, 1],
		[1, , , , ],
		[1, 1, 1, 1, 1],
		[, , , , 1],
		[1, 1, 1, 1, 1],
	],
	"T": [
		[1, 1, 1, 1, 1],
		[, , 1, , ],
		[, , 1, , ],
		[, , 1, , ],
		[, , 1, , ]
	],
	"U": [
		[1, , , , 1],
		[1, , , , 1],
		[1, , , , 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1]
	],
	"V": [
		[1, , , , 1],
		[1, , , , 1],
		[1, , , , 1],
		[, 1, , 1, ],
		[, , 1, , ]
	],
	"W": [
		[1, , , , 1],
		[1, , , , 1],
		[1, , 1, , 1],
		[1, 1, , 1, 1],
		[1, , , , 1]
	],
	"Y": [
		[1, , , , 1],
		[1, , , , 1],
		[1, 1, 1, 1, 1],
		[, , 1, , ],
		[, , 1, , ]
	],
	":": [
		[, , , , ],
		[, , 1, , ],
		[, , , , ],
		[, , 1, , ],
		[, , , , ]
	],
	"'": [
		[, , 1, , ],
		[, , 1, , ],
		[, , , , ],
		[, , , , ],
		[, , , , ]
	]
};

var floor = Math.floor,
	ceil = Math.ceil,
	min = Math.min,
	max = Math.max,
	round = Math.round,
	pow = Math.pow,
	cos = Math.cos,
	sin = Math.sin,
	atan2 = Math.atan2,
	abs = Math.abs;

function vec(x, y) {
	return { 
		x: x || 0, 
		y: y || 0,
		copy: function(v) {
			this.x = v.x; this.y = v.y; return this;
		},
		add: function(v) {
			this.x += v.x;
			this.y += v.y;
		}
	};
}

function getSuper(o) {
	var sup = {};
	for (var i in o) {
		if (o[i] && o[i].call) {
			sup[i] = (function(fn) {
				return function() {
					fn.apply(o, arguments);
				}
			})(o[i]);
		}
	}
	return sup;
}

function rand(a, b) {
	if (a === undefined) {
		a = 0;
		b = 1;
	}
	if (b === undefined) {
		b = a;
		a = 0;
	}

	return a + Math.random() * (b - a);
}

function pick(arr, yrnd) {
	return yrnd ? arr[ rnd.integer( arr.length - 1 )] : arr[~~rand(arr.length)];
}

function invoke(arr, name, arg) {
	var i = arr.length;
	while (i--) {
		arr[i] && arr[i][name] && arr[i][name](i, arg);
	}
}

function merge(to, from) {
	for (var n in from) {
		if (typeof to[n] === "undefined") {
			to[n] = from[n];
		}
	}
	return to;
}

function path(points, close) {
	G.ctx.beginPath();
	G.ctx.moveTo(points[0].x, points[0].y);
	for (var i = 1; i < points.length; i++) {
		G.ctx.lineTo(points[i].x, points[i].y);
	}
	(close || close === undefined) && G.ctx.closePath();
}

function pathA(points, close) {
	G.ctx.beginPath();
	G.ctx.moveTo(points[0], points[1]);
	for (var i = 2; i < points.length; i += 2) {
		G.ctx.lineTo(points[i], points[i+1]);
	}
	(close || close === undefined) && G.ctx.closePath();
}

function line(x0, y0, x1, y1, color) {
	G.ctx.beginPath();
	G.ctx.moveTo(x0, y0);
	G.ctx.lineTo(x1, y1);
	stroke(color);
}

function circle(x, y, r) {
	G.ctx.beginPath();
	G.ctx.arc(x, y, r, 0, PI2);
}

function rect(x, y, w, h) {
	G.ctx.beginPath();
	G.ctx.rect(x, y, w, h);
}

function fill(color) {
	color && (G.ctx.fillStyle = color);
	G.ctx.fill();
}

function stroke(color, w) {
	color && (G.ctx.strokeStyle = color);
	w && (G.ctx.lineWidth = w);
	G.ctx.stroke();
	G.ctx.lineWidth = 1;
}

function dist(a, b) {
	return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

function clamp(a, min, max) {
	return a < min ? min : a > max ? max : a;
}

function circleRect(c, r) {
	var x = clamp(c.x, r.x, r.x + r.width);
	var y = clamp(c.y, r.y, r.y + r.height);
	var dx = c.x - x;
	var dy = c.y - y;
	return dx * dx + dy * dy <= c.radius * c.radius;
}

function pointInView(x, y) {
	return x >= G.camera.x && x < G.camera.x + W
		&& y >= G.camera.y && y < G.camera.y + H;
}

function contains( r, x, y ) {
	return x >= r.x && x < r.x + r.width
		&& y >= r.y && y < r.y + r.height;
}

function lerp(k, a, b) {
	return k * ( b - a ) + a;
}

function angleBetween(a, b) {
	return atan2(b.y - a.y, b.x - a.x);
}

function formatTime( n ) {
	n = ~~n;
	var seconds = "" + max( 0, n % 60 ),
		minutes = "" + ~~max( 0, n / 60 );

	while( seconds.length < 2 ) {
		seconds = "0" + seconds;
	}
	while( minutes.length < 2 ) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}

function linear( t, b, c, d ) {
    return ( t / d ) * c + b;
}

function swing(t, b, c, d) {
    return c * (0.5 - Math.cos(((t / d) * Math.PI)) / 2) + b;
}

function easeOutBounce(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
}

function tween( obj, prop, a, b, d, ease, end ) {
    ease = ease || linear;
    var t = 0;
    var o = {
        update: function( i ) {
            t = min( d, t + G.dt );
            obj[ prop ] = ease( t, a, b - a, d );

            if( t == d ) {
                if ( end ) {
                    end.call( obj );
                }

                G.tweens.splice( i, 1 );
            }
        }
    };

    G.tweens.push( o );
}

function drawTextLine( opt ) {
	var numberOfChars = opt.text.length,
		size = 5;
	for (var i = 0; i < numberOfChars; i++) {
		var letter = LETTERS[opt.text.charAt(i)];
		if (!letter) continue;
		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				if (letter[y][x] === 1) {
					G.ctx.rect(opt.x + x * opt.scale + (opt.scale * size + opt.hspacing) * i, opt.y + y * opt.scale, opt.scale, opt.scale);
				}
			}
		}
	}
};

function drawText( opt ) {
	merge(opt, {
		vspacing: 0,
		hspacing: 2,
		scale: 3
	});

	var size = 5,
		lines = ("" + opt.text).toUpperCase().split( '\n' ),
		numberOfLines = lines.length,
		letterSize = size * opt.scale,
		longestLine = 0;

	G.ctx.beginPath();
	for (var i = 0; i < numberOfLines; i++) {
		var line = lines[i],
			lineWidth = (letterSize * line.length) + ((line.length - 1) * opt.hspacing),
			sx = opt.x,
			sy = opt.y + (letterSize + opt.vspacing) * i;

		if (opt.halign == "center") {
			sx = opt.x - lineWidth / 2;
		} else if (opt.halign == "right") {
			sx = opt.x - lineWidth;
		}

		if (opt.valign == "center") {
			sy = opt.y - letterSize / 2;
		} else if (opt.valign == "bottom") {
			sy = opt.y - letterSize;
		}

		if (line.length > lines[longestLine].length) {
			longestLine = i;
		}

		drawTextLine({ text: line, x: ~~sx, y: ~~sy, hspacing: opt.hspacing, scale: opt.scale });
	}
};

function particle(opts) {
	var p = merge({
		update: function( i ) {
			this.x += this.vx * G.dt;
			this.y += this.vy * G.dt;
			if( ( this.d -= G.dt ) < 0) {
				G.particles.splice( i, 1 );
			}
		}
	}, opts);
	G.particles.push( p );
	return p;
}

function RandomGenerator(s) {
    if ( s === undefined ) s = Date.now();

    var a = 1664525,
	    c = 1013904223,
	    m = Math.pow(2, 32),
        seed = s;

    this.seed = function( s ) {
        seed = s;
    };

    this.nextInt = function() {
        seed = ( a * seed + c ) % m;
        return seed;
    };

    this.nextFloat = function() {
        return this.nextInt() / m;
    };

    this.i = function( a, b ) {
        if ( a === undefined ) {
            a = 0;
            b = 1;
        }
        if ( b === undefined ) {
            b = a;
            a = 0;
        }

        return Math.floor( a + this.nextFloat() * ( b - a + 1 ) );
    };

    this.f = function( a, b ) {
        if ( a === undefined ) {
            a = 0;
            b = 1;
        }
        if ( b === undefined ) {
            b = a;
            a = 0;
        }
        return a + this.nextFloat() * ( b - a );
    };

    this.pick = function( arr ) {
        return arr[ this.i( arr.length - 1 ) ];
    };
}

function initAI( ship ) {

}

function ai( ship ) {

	if( ( ship.nextBehaviourCheck -= G.dt ) > 0) {
		return;
	}

	if ( ship.behaviours.length ) {
		return;
	}

	var friends = G.world[ship.team.name];
	var enemies = G.world[ship.team.enemy.name];

	// Lay out all possible options.
	var conquerSector = {
		weight: 30,
		condition: function() {
			var sectors = G.world.sectors.filter(function( sector ) {
				var friendsAround = shipsAround( sector, friends, SHIP_ATTACK_RADIUS * 2 );
				var enemiesAround = shipsAround( sector, enemies, SHIP_ATTACK_RADIUS * 2 );
				return sector.team !== ship.team && ((friendsAround >= enemiesAround && friendsAround < 4) || ( enemies.length - 1 < friends.length ));
			});
			this.target = sectors.sort(function( a, b ) {
				return dist( a, ship ) - dist( b, ship );
			})[0];

			return !!sectors.length;
		},
		behaviour: function() {
			return new MoveTo( this.target );
		}
	};

	var evade = {
		weight: 20,
		condition: function() {
			return ship.underAttack && shipsAround( ship, friends, SHIP_ATTACK_RADIUS * 2 ) - rand(2) < shipsAround( ship, enemies, SHIP_ATTACK_RADIUS * 2 );
		},
		behaviour: function() {
			var t = {};
			var iters = 0;
			do {
				t.x = ship.x + rand( -1, 1 ) * SHIP_EVADE_RADIUS;
				t.y = ship.y + rand( -1, 1 ) * SHIP_EVADE_RADIUS;
			} while ( G.world.shipOnLine( ship, t, SHIP_ATTACK_RADIUS * 2 ) && iters++ < 20 )
			return new MoveTo(t);
		}
	};

	var defendFriend = {
		weight: 10,
		condition: function() {
			return !!(this.target = friends.filter(function( f ) {
				return shipsAround( f, enemies, SHIP_ATTACK_RADIUS ) > pick([2, 3]);
			})[0]) && !G.world.shipOnLine( ship, this.target );
		},
		behaviour: function() {
			return new MoveTo(this.target);
		}
	};

	var attack = {
		weight: ship.underAttack > 0 ? 55 : 30,
		condition: function() {
			var enemy = ship.getClosestEnemy();
			return enemy && shipsAround( enemy, enemies, SHIP_ATTACK_RADIUS * 2 ) - 2 < shipsAround( ship, enemies, SHIP_ATTACK_RADIUS * 2 );
		},
		behaviour: function() {
			ship.target = ship.getClosestEnemy();
			return new MoveTo(ship);
		}
	};

	var defendBase = {
		weight: 25,
		condition: function() {
			this.base = pick( G.world.sectors.filter(function( s ) {
				return s.team === ship.team 
					&& shipsAround( s, enemies, SECTOR_CONQUER_RADIUS * 2 ) > shipsAround( s, friends, SECTOR_CONQUER_RADIUS * 2 );
			}));
			return !!this.base;
		},
		behaviour: function() {
			return new MoveTo( this.base );
		}
	};

	var options = [conquerSector, evade, attack, defendBase, defendFriend];

	var r = rand();
	var totalWeight = options.reduce(function( w, opt ) { return w + opt.weight; }, 0);
	var opt = pick( options.filter(function( o ) {
		var tmp = r;
		var perc = o.weight / totalWeight;
		r -= perc;
		return tmp < perc && o.condition();
	}));
	if( opt ) {
		ship.addBehaviour( opt.behaviour() );
	}

	ship.nextBehaviourCheck = 2;

}

function shipsAround( loc, ships, radius ) {

	return ships.filter(function( ship ) {
		return dist( loc, ship ) < radius;
	}).length;

}

// Moves a ship to a point. Doesn't take movement of the point into consideration.
// Credits: David Geary's Snailbait's behaviour concept.
function MoveTo(target) {
	this.target = { x: target.x, y: target.y };
	this.name = "MoveTo";
	this.ship = null;
	this.pathTimeout = 0.8;
	this.oncomplete = null;

	this.done = function() {
		return dist(this.ship, this.target) < SHIP_TARGET_SEPARATION;
	};

	this.render = function() {
		if ((this.pathTimeout -= G.dt) < 0) return;
		line(this.ship.x, this.ship.y, this.target.x, this.target.y, "hsla(160, 100%, 50%, 0.3)");
		circle(this.target.x, this.target.y, 3);
		fill("hsla(160, 100%, 50%, 0.3)");
	};

	this.logic = function(i) {
		if (this.done()) {
			this.ship.behaviours.splice(i, 1);
			this.oncomplete && this.oncomplete(this);
			return;
		}
		this.ship.angle = atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
		this.ship.vx = cos(this.ship.angle) * this.ship.speed;
		this.ship.vy = sin(this.ship.angle) * this.ship.speed;
		
	};
}

function Ship(x, y, type) {
	this.x = x;
	this.y = y;
	this.radius = SHIP_RADIUS;
	this.angle = 0;
	this.vx = 0;
	this.vy = 0;
	this.speed = 150;
	this.health = 1;
	this.showHealth = 0;
	this.inView = 0;
	this.lastShot = 0;
	this.points = [];
	this.behaviours = [];
	this.underAttack = 0;

	// for enemies
	this.nextBehaviourCheck = 0;

	var points = [1,0, -0.4,1, -1,0.8, -0.5,0, -1,-0.8, -0.4,-1];
	for (var i = 0; points && i < points.length; i += 2) {
		this.points.push(vec(points[i] * this.radius, points[i+1] * this.radius));
	}

	this.halting = function() {
		return abs(this.vx) < 4 || abs(this.vy) < 4;
	};

	this.getClosestEnemy = function() {
		var _this = this;
		return G.world.ships.filter(function( ship ) {
			return ship.team !== _this.team && dist( _this, ship ) < SHIP_ATTACK_RADIUS;
		}).sort(function( a, b ) {
			return dist( _this, a ) - dist( _this, b );
		})[ 0 ];
	};

	this.getClosestAlly = function() {
		var _this = this;
		return G.world.ships.filter(function( ship ) {
			return ship.team === _this.team;
		}).sort(function( a, b ) {
			return dist( _this, a ) - dist( _this, b );
		})[ 0 ];
	};

	this.addBehaviour = function(behaviour) {
		var i = this.behaviours.length;
		while (i--) {
			if (this.behaviours[i].name === behaviour.name) {
				this.behaviours.splice(i, 1);
			}
		}
		behaviour.ship = this;
		this.behaviours.push(behaviour);
	};

	this.shoot = function(dontPlay) {
		if (G.now - this.lastShot >= SHIP_SHOT_INTERVAL) {
			bullet(this.x, this.y, this.radius, this.angle, this);
			this.lastShot = G.now;
		}
	};

	this.shootAt = function(p, dontPlay) {
		this.angle = angleBetween(this, p);
		this.shoot(dontPlay);
	};

	this.moveTo = function(point) {
		this.addBehaviour(new MoveTo(point));
	};

	this.update = function(i) {
		if (this.dead()) {
			G.world.ships.splice(i, 1);
			G.world[this.team.name].splice(G.world[this.team.name].indexOf(this), 1);
			if( this.inView ) {
				G.shaking = 0.15;
			}
			return;
		}

		if( this.team === ENEMY && G.world.aiDelay === 0 && !G.world.gameOver ) {
			ai(this);
		}

		invoke(this.behaviours, "logic");

		if( this.underAttack && rand() < G.world.aiSmart && !this.target ) {
			this.target = this.getClosestEnemy();
		}

		if( this.halting() ) {
            var noTarget = !this.target || dist(this, this.target) > SHIP_ATTACK_RADIUS || G.world.shipOnLine(this, this.target);

            if (noTarget) {
                // Pick a different target if the current one isn't available
                this.target = this.getClosestEnemy();
            }

            if (this.target) {
                this.shootAt(this.target);
            }
        }

		this.vx *= SHIP_FRICTION;
		this.vy *= SHIP_FRICTION;
		
		this.x += this.vx * G.dt;
		this.y += this.vy * G.dt;

		this.x = max(this.radius, min(this.x, G.world.width - this.radius));
		this.y = max(this.radius, min(this.y, G.world.height - this.radius));

		this.inView = circleRect(this, G.camera);
		this.underAttack -= G.dt;
	};

	this.render = function() {
		invoke(this.behaviours, "render");
		if (!this.inView) return;

		G.ctx.save();

		G.ctx.translate(~~this.x, ~~this.y);

		// Health bar
		// Black bg
		rect(-10, 13, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT/2);
		fill("hsl(0, 0%, 10%)");
		rect(-10, 13 + HEALTH_BAR_HEIGHT/2, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT/2);
		fill("hsl(0, 0%, 30%)");
		// Content
		rect(-10, 13, this.health * HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT);
		fill("hsl(100, 100%, 30%)");
		rect(-10, 13 + HEALTH_BAR_HEIGHT/2, this.health * HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT/2);
		fill("hsl(100, 100%, 50%)");

		G.ctx.rotate(this.angle);

		G.ctx.lineWidth = 1;
		path(this.points);

		fill(this.team.fillColor);
		stroke(this.team.strokeColor);

		G.ctx.restore();
	};

	this.receiveDamage = function(bullet) {
		this.health -= bullet.dmg;
		this.underAttack = SHIP_UNDER_ATTACK;
		bullet.explode();
	};

	this.dead = function() {
		return this.health <= 0;
	};
};

function Sector(x, y, radius, team) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.team = null;
	this.nextHoming = rand(5, 13);
	this.circles = [];

	this.playerConquerTime = 0;
	this.enemyConquerTime = 0;

	this.render = function() {
		var phase = G.tick / 8 + ( this.team ? this.team.phaseOffset : PI * 0.2 );

		G.ctx.save();
			circle(this.x, this.y, this.radius);

			fill(this.team ? this.team.fillColor : "rgba(200,200,200,0.3)");
			stroke(this.team ? this.team.strokeColor : "rgb(200,200,200)");

			circle(this.x, this.y, this.radius / 10 + Math.sin(phase) * this.radius / 15);
			stroke();

			G.ctx.beginPath();
			G.ctx.arc(this.x, this.y, this.radius, phase, phase + PI / 4);
			stroke(0,5);

			var w = 60;
			var h = 3;
			if (this.playerConquerTime > 0 && this.playerConquerTime < SECTOR_CONQUER_TIME) {
				rect( this.x - w/2, this.y - h * 6, w, h );
				fill("hsl(0, 0%, 0%)");
				rect( this.x - w/2, this.y - h * 6, w * (this.playerConquerTime / SECTOR_CONQUER_TIME), h );
				fill("hsla(140, 100%, 55%, 0.8)");
			}
			if (this.enemyConquerTime > 0 && this.enemyConquerTime < SECTOR_CONQUER_TIME) {
				rect( this.x - w/2, this.y - h * 4, w, h );
				fill("hsl(0, 0%, 0%)");
				rect( this.x - w/2, this.y - h * 4, w * (this.enemyConquerTime / SECTOR_CONQUER_TIME), h );
				fill("hsla(0, 100%, 55%, 0.8)");
			}

			G.ctx.globalAlpha = 0.8;
			for (var i = 0; i < this.circles.length; i++) {
				if (this.circles[i] <= 0) continue;
				circle(this.x, this.y, this.circles[i]);
				stroke(0, 0.5);
				this.circles[i] -= 3;
			}
			G.ctx.globalAlpha = 1;
		G.ctx.restore();
	};

	this.update = function(i) {
		if ((this.nextHoming -= G.dt) <= 0) {
			this.circles.length = 0;
			var i = 4;
			while (i--) {
				this.circles.push(i * 80);
			}
			this.nextHoming = rand(13, 25);
		} 

		// Get all the ships within a conquering radius.
		var shipsAround = G.world.getShipsAround(this, SECTOR_CONQUER_RADIUS);
		var player = shipsAround.filter(function(ship) { return ship.team === PLAYER && ship.underAttack <= 0 && ship.halting(); });
		var enemies = shipsAround.filter(function(ship) { return ship.team === ENEMY && ship.underAttack <= 0 && ship.halting(); });
		var dominator;
		var _this = this;

		dominator = player.length > enemies.length ? PLAYER : ( player.length < enemies.length ? ENEMY : null );

		var playerTimeInc = 0;
		var enemyTimeInc = 0;
		if (dominator === PLAYER && this.team !== PLAYER) {
			playerTimeInc = 1;
			enemyTimeInc = -1;
			player.forEach(function( ship ) {
				rand() < rand() && ship.shootAt( _this );
			});
		} else if (dominator === ENEMY && this.team !== ENEMY) {
			enemyTimeInc = 1;
			playerTimeInc = -1;
			enemies.forEach(function( ship ) {
				rand() < G.world.aiSmart && ship.shootAt( _this );
			});
		}

		var speed = clamp( abs( player.length - enemies.length ) * 0.1, 0.1, 0.4 );
		this.playerConquerTime = clamp(this.playerConquerTime + playerTimeInc * speed * G.dt, 0, SECTOR_CONQUER_TIME);
		this.enemyConquerTime = clamp(this.enemyConquerTime + enemyTimeInc * speed * G.dt, 0, SECTOR_CONQUER_TIME);

		var explode = false;
		if (this.playerConquerTime === SECTOR_CONQUER_TIME && this.team !== PLAYER) {
			G.world.playerWins++;
			if( this.team === ENEMY ) {
				G.world.enemyWins--;
			}
			this.team = PLAYER;
			this.nextHoming = 0;
			G.shaking = 0.2;
		} else if (this.enemyConquerTime === SECTOR_CONQUER_TIME && this.team !== ENEMY) {
			G.world.enemyWins++;
			if( this.team === PLAYER ) {
				G.world.playerWins--;
			}
			this.team = ENEMY;
			this.nextHoming = 0;
			G.shaking = 0.2;
		}
	};
}

function Bullet(x, y, angle, owner) {
	this.sx = x;
	this.sy = y;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.cos = cos(angle);
	this.sin = sin(angle);
	this.length = 10;
	this.owner = owner;
	this.type = BULLET;
	merge(this, this.type);

	this.target = null;
	this.prev = [vec().copy(this), vec().copy(this), vec().copy(this)];

	this.update = function(i) {
		this.prev[2].copy(this.prev[1]);
		this.prev[1].copy(this.prev[0]);
		this.prev[0].copy(this);

		if (this.target) {
			var angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
			this.cos = cos(angle);
			this.sin = sin(angle);

			if ((this.disappear -= G.dt) <= 0) {
				G.world.bullets.splice( i, 1 );
				return;
			}
		}

		this.sx += this.cos * this.speed * G.dt;
		this.sy += this.sin * this.speed * G.dt;

		this.x = this.sx + this.cos * this.length;
		this.y = this.sy + this.sin * this.length;

		if (!contains(G.world, this.sx, this.sy)) {
			G.world.bullets.splice(i, 1);
		}
	};

	this.render = function() {
		if (!pointInView(this.sx, this.sy)) return;
		for (var i = 0; i < 3; i++) {
			circle(this.prev[i].x, this.prev[i].y, 3 - i);
			fill(this.owner.team.strokeColor);
		}
	};

	this.explode = function(color, f) {
		for (var i = 0; i < 5; i++) {
			var a = PI2 / 5 * i;
			particle({
				x: this.x + cos( a ) * 10,
				y: this.y + sin( a ) * 10,
				r: rand( 1, 2 ),
				vx: cos( a ) * rand( 50, 100 ) * f,
				vy: sin( a ) * rand( 50, 100 ) * f,
				d: rand( 0.4, 0.7 ),
				render: function() {
					G.ctx.globalAlpha = this.d;
					circle( this.x, this.y, this.r );
					fill(color);
					G.ctx.globalAlpha = 1;
				}
			});	
		}
	};
}

function bullet(x, y, r, angle, type, hue) {
	r *= 1.5;
	var b = new Bullet(x + cos(angle) * r, y + sin(angle) * r, angle, type, hue);
	G.world.bullets.push(b);
	return b;
}

function Cursor() {
	this.x = this.y = 0;
	this.down = false;

	this.mousedown = function(p, isRight) {
		this.x = p.x + G.camera.x;
		this.y = p.y + G.camera.y;
		this.down = true;
	};

	this.mousemove = function(p) {
		this.x = p.x + G.camera.x;
		this.y = p.y + G.camera.y;
	};

	this.mouseup = function(p) {
		this.x = p.x + G.camera.x;
		this.y = p.y + G.camera.y;
		this.down = false;
	};

	this.render = function() {
		
	};

	return (this.sup = getSuper(this));
}

function SelectionCursor() {
	var sup = Cursor.call(this);

	this.ships = [];
	this.posDown = vec();
	this.points0 = [vec(0,0), vec(-20, -7), vec(-18, 0)];
	this.points1 = [vec(0,0), vec(-20, 7), vec(-18, 0)];
	this.isCallingGoTo = false;

	this.mousedown = function(p, isRight) {
		sup.mousedown(p, isRight);

		this.posDown.x = this.x;
		this.posDown.y = this.y;
		this.isCallingGoTo = isRight;

		if (isRight) {
			var loc = this;
			this.ships.forEach(function(ship, i, arr) {
				var angle = PI2 / arr.length * i;
				var r = rand(10, 30);
				ship.moveTo({ x: loc.x - cos(angle) * r, y: loc.y - sin(angle) * r });
			});
		}
	};

	this.mouseup = function(p) {
		sup.mouseup(p);

		if (!this.isCallingGoTo) {
			var bounds = { x: min(this.posDown.x, this.x), y: min(this.posDown.y, this.y) };
			bounds.width = max(this.posDown.x, this.x) - bounds.x;
			bounds.height = max(this.posDown.y, this.y) - bounds.y;

			this.ships = G.world.player.filter(function(ship) {
				return circleRect(ship, bounds);
			});
		}
	};

	this.render = function() {
		if ( this.x == 0 && this.y == 0 ) return;
		G.ctx.save();
			G.ctx.translate(this.x, this.y);
			G.ctx.rotate(-PI/2 - PI/6);
			path(this.points0);
			fill("hsl(100, 100%, 60%)");
			path(this.points1);
			fill("hsl(100, 80%, 71%)");
		G.ctx.restore();

		if (this.down && !this.isCallingGoTo && G.scene === PlayScene) {
			rect(this.posDown.x, this.posDown.y, this.x - this.posDown.x, this.y - this.posDown.y);
			fill("hsla(100, 100%, 860%, 0.1)");
			stroke("hsl(100, 100%, 60%)", 0.5);
		}
	};
}

function AttackCursor() {
	var sup = Cursor.call(this);

	this.mouseup = function(p) {
		sup.mouseup(p);

		var worldPoint = this;
		var enemy = G.world.enemies.filter(function(ship) {
			return dist(ship, worldPoint) < ship.radius;
		})[0];

		if (enemy) {
			var playerShips = G.world.player.filter(function(ship) {
				return dist(enemy, ship) < SHIP_ATTACK_RADIUS * 2;
			});
			playerShips.forEach(function(ship) {
				ship.shootAt(enemy);
			});
		}
	};

	this.render = function() {
		G.ctx.save();
			G.ctx.translate(this.x, this.y);

			circle(0, 0, 7);
			fill("hsla(0, 100%, 60%, 0.5)");

			circle(0, 0, 3);
			stroke("hsla(0, 100%, 60%)");

			G.ctx.beginPath();
			G.ctx.rect(-1,-20, 2,13); // Up
			G.ctx.rect(7,  -1,13, 2); // Right
			G.ctx.rect(-1,  7, 2,13); // Down
			G.ctx.rect(-20,  -1,13, 2); // Left

			fill("hsl(0, 100%, 60%)");

			var phase = G.tick / 10;
			G.ctx.beginPath();
			G.ctx.arc(0, 0, 10, phase, phase + PI/4);
			stroke("hsl(0, 100%, 80%)", 1);

			G.ctx.beginPath();
			G.ctx.arc(0, 0, 10, phase + PI, phase + PI + PI/4);
			stroke("hsl(0, 100%, 80%)", 1);

			G.ctx.beginPath();
			G.ctx.arc(0, 0, 10, phase + PI/2, phase + PI/2 + PI/4);
			stroke("hsl(0, 100%, 80%)", 1);

			G.ctx.beginPath();
			G.ctx.arc(0, 0, 10, phase + PI/2 + PI, phase + PI/2 + PI + PI/4);
			stroke("hsl(0, 100%, 80%)", 1);

		G.ctx.restore();
	};
}


function cache( w, h, cb ) {
	var c = document.createElement( "canvas" );
	c.width = w;
	c.height = h;
	return cb( c.getContext( "2d" ), w, h ) || c;
}

function World() {

	this.x = this.y = 0;
	this.width = W;
	this.height = H;
	this.sectors = [];
	this.ships = [];
	this.player = [];
	this.enemies = [];
	this.bullets = [];
	this.particles = [];
	this.accumPlayerWins = 0;
	this.aiDelay = 4;

	this.init = function() {
		G.level++;

		this.sectors.length = 0;
		this.ships.length = 0;
		this.player.length = 0;
		this.enemies.length = 0;
		this.bullets.length = 0;
		this.particles.length = 0;
		this.playingTime = 0;
		this.aiSmart = 0;
		this.playerWins = 2;
		this.enemyWins = 3;
		this.gameOver = false;
		this.reload = 0;

		var i = G.rnd.i( 5, 15 );
		var ratio = 4/3;
		this.width = max( 1800, 2.5 * i * SECTOR_RADIUS * 2 );
		this.height = this.width / ratio;
		this.winSize =  1 / ( ( i + 4 ) );
		G.initBackground();

		while( i-- ) {
			var s = new Sector(0, 0, SECTOR_RADIUS * rand(0.8, 1));
			do {
				s.x = rand(SECTOR_RADIUS, this.width - SECTOR_RADIUS);
				s.y = rand(this.height * 0.3, this.height * 0.8);
			} while (this.sectors.filter(function(sec) {
				return dist(sec, s) < SECTOR_CONQUER_RADIUS * 3.5;
			}).length)
			this.sectors.push(s);
		}

		var leftX = (this.width) / 2 - SECTOR_RADIUS * 3;

		// player
		this.spawnShipsAround(leftX, SECTOR_RADIUS * 2, SECTOR_RADIUS + 5, 6, PLAYER, true);
		this.spawnShipsAround(leftX + SECTOR_RADIUS * 6, SECTOR_RADIUS * 2, SECTOR_RADIUS + 10, 6, PLAYER, true);
		// enemy
		this.spawnShipsAround(leftX, this.height - SECTOR_RADIUS * 2, SECTOR_RADIUS + 5, 6, ENEMY, true);
		this.spawnShipsAround(leftX + SECTOR_RADIUS * 6, this.height - SECTOR_RADIUS * 2, SECTOR_RADIUS + 10, 6, ENEMY, true);
		this.spawnShipsAround(leftX + SECTOR_RADIUS * 3, this.height - SECTOR_RADIUS * 4, SECTOR_RADIUS + 10, 6, ENEMY);

		tween( G.camera, "x", 0, this.width/2 - W/2, 2.5, swing );
	};

	this.spawnShipsAround = function(x, y, radius, amount, team, isBase) {
		for (var i = 0; i < amount; i++) {
			var angle = i * PI2 / amount;
			var ship = this.spawnShip(x + cos(angle) * radius, y + sin(angle) * radius, team);
			ship.angle = angle;
		}

		if( isBase ) {
			var sector = new Sector( x, y, radius - 10 );
			sector.team = team;
			this.sectors.push( sector );
		}
	};

	this.spawnShip = function(x, y, team) {
		var ship = new Ship(x, y);
		ship.team = team;
		this[team.name].push(ship);
		this.ships.push(ship);
		return ship;
	};

	this.getShipsAround = function(p, radius) {
		if (!radius) radius = SHIP_ATTACK_RADIUS;
		return this.ships.filter(function(ship) {
			return dist(ship, p) < radius;
		});	
	};

	this.shipOnLine = function( start, end, radius ) {
		if( !radius ) radius = SHIP_ATTACK_RADIUS;
		var p = {};
		var step = max( 0.1, radius / dist( start, end ) );

		for( var k = 0; k <= 1; k += step ) {
			p.x = lerp( k, start.x, end.x );
			p.y = lerp( k, start.y, end.y );
			if( this.getShipsAround( p, radius ).length ) return true;
		}

		return false;
	};

	this.update = function() {
		invoke(this.ships, "update");
		invoke(this.bullets, "update");
		invoke(this.sectors, "update");
		invoke(this.particles, "update");

		for (var i = 0; i < this.ships.length; i++) {
			var a = this.ships[i];
			for (var j = i+1; j < this.ships.length; j++) {
				var b = this.ships[j];
				var dx = b.x - a.x;
				var dy = b.y - a.y;
				var d = Math.sqrt(dx * dx + dy * dy);
				var radius = b.radius + a.radius;
				if (d < radius) {
					var normalX = dx / d;
					var normalY = dy / d;
					var separation = (radius - d) / 2;
					a.x -= separation * normalX;
					a.y -= separation * normalY;
					b.x += separation * normalX;
					b.y += separation * normalY;
					var e = 0.2;
					var rvel = (b.vx - a.vx) * normalX + (b.vy - a.vy) * normalY;
					var impulse = -(1 + e) * rvel;
					impulse /= (1 + 1);
					a.vx -= impulse * normalX;
					a.vy -= impulse * normalY;
					b.vx += impulse * normalX;
					b.vy += impulse * normalY;
				}
			}
		}

		for (var j = 0; j < this.bullets.length; j++) {
			var b = this.bullets[j];
			for (var i = 0; i < this.ships.length; i++) {
				var ship = this.ships[i];
				if (ship.team !== b.owner.team) {
					if (dist(b, ship) < ship.radius) {
						ship.receiveDamage(b);
						b.explode(ship.team.strokeColor, 1);
						ship.inView && (G.shaking = 0.1);
						this.bullets.splice(j--, 1);
						break;
					}
				}
			}
		}

		for (var j = 0; j < this.bullets.length; j++) {
			var b = this.bullets[j];
			for (var i = 0; i < this.sectors.length; i++) {
				var sector = this.sectors[i];
				if (b.team !== sector.team && dist(b, sector) < sector.radius * 0.5) {
					b.explode(sector.team ? sector.team.strokeColor : "white", 0.5);
					this.bullets.splice(j--, 1);
					break;
				}
			}
		}

		if (G.keys[37]) {
			G.camera.x -= CAMERA_SPEED * G.dt;
		} else if (G.keys[39]) {
			G.camera.x += CAMERA_SPEED * G.dt;
		} else if (G.keys[38]) {
			G.camera.y -= CAMERA_SPEED * G.dt;
		} else if (G.keys[40]) {
			G.camera.y += CAMERA_SPEED * G.dt;
		}

		G.camera.x = max( 0, min(G.camera.x, this.width - W) );
		G.camera.y = max( 0, min(G.camera.y, this.height - H) );

		this.playerWins = max( 0, this.playerWins );
		this.enemyWins = max( 0, this.enemyWins );
		!this.gameOver && ( this.playingTime += G.dt );
		this.aiSmart = 0.2 + ( 1 - Math.exp( -( G.level - 0.8 ) / 12 ) );
		this.aiDelay = max( 0, this.aiDelay - G.dt );

		if( !this.gameOver ) {
			if( this.player.length === 0 ) {
				this.endGame(false);
			} else if( this.enemyWins === this.winSize ) {
				this.endGame(false);
			} else if( this.playerWins === this.winSize ) {
				this.endGame(true);
			}
		}
	};

	this.renderStats = function() {
		var strokeWidth = 0.7;

		G.ctx.save();
		G.ctx.translate( W/2, 0 );

		var barWidth = 100;
		var barHeight = 8;
		var realWidth = barWidth * 1.4;

		// Player
		G.ctx.save();
		pathA([ -60 - barWidth,0, -60,0, -45,barHeight, -60 - barWidth * 1.2,barHeight ]);
		stroke( PLAYER.strokeColor );
		G.ctx.clip();

		var frac = min( 1, this.playerWins * this.winSize );
		rect( -45 - realWidth * frac, 0, realWidth, barHeight );
		fill( "hsl(65, 100%, 50%)" );
		rect( -45 - realWidth * frac, barHeight/2, realWidth, barHeight/2 );
		fill( "hsl(65, 100%, 20%)" );
		G.ctx.restore();

		// Enemy
		G.ctx.save();
		pathA([ 60 + barWidth,0, 60,0, 45,barHeight, 60 + barWidth * 1.2,barHeight ]);
		stroke( ENEMY.strokeColor );
		G.ctx.clip();

		var frac = min( 1, this.enemyWins * this.winSize );
		rect( 45, 0, realWidth * frac, barHeight);
		fill("hsl(65, 100%, 50%)");
		rect( 45, barHeight/2, realWidth * frac, barHeight/2);
		fill("hsl(65, 100%, 20%)");
		G.ctx.restore();

		// Player ship
		G.ctx.save();
		pathA([ -60 - barWidth,barHeight, -45,barHeight, -30,barHeight*2, -60 - barWidth * 1.2,barHeight*2 ]);
		stroke( PLAYER.strokeColor );
		G.ctx.clip();

		var frac = this.player.length / 12;
		rect( -30 - realWidth * frac, barHeight, realWidth, barHeight );
		fill( "hsl(140, 100%, 50%)" );
		rect( -30 - realWidth * frac, barHeight + barHeight/2, realWidth, barHeight/2 );
		fill( "hsl(140, 100%, 20%)" );
		G.ctx.restore();

		// Enemy ship
		G.ctx.save();
		pathA([ 60 + barWidth,barHeight, 45,barHeight, 30,barHeight*2, 60 + barWidth * 1.2,barHeight*2 ]);
		stroke( ENEMY.strokeColor );
		G.ctx.clip();

		frac = this.enemies.length / 12;
		rect( 30, barHeight, realWidth * frac, barHeight);
		fill("hsl(0, 100%, 50%)");
		rect( 30, barHeight + barHeight/2, realWidth * frac, barHeight/2);
		fill("hsl(0, 100%, 20%)");
		G.ctx.restore();

		// Time
		pathA([ -60,0, 60,0, 30,30, -30,30 ]);
		fill( "hsla(0, 0%, 50%, 1)" );

		pathA([ -45,15, 45,15, 30,30, -30,30 ]);
		fill( "hsla(0, 0%, 15%, 1)" );

		drawText({
			text: formatTime( this.playingTime ),
			x: 0,
			y: 15 - 2,
			scale: 2,
			halign: "center",
			valign: "center"
		});
		fill( "hsl(0, 50%, 100%)" );

		G.ctx.restore();
	};

	this.renderHud = function() {
		G.ctx.save();
			G.ctx.translate( G.camera.x - G.shake.x, G.camera.y - G.shake.y );

			this.renderStats();

			drawText({
				x: W/2
			});

		G.ctx.restore();
	};

	this.render = function() {
		G.ctx.save();

			drawText({
				x: G.camera.x + W/2,
				y: G.camera.y + H/2,
				text: G.level,
				halign: "center",
				valign: "center",
				scale: 25
			});
			fill( "rgba(30, 30, 30, 0.3)" );

			invoke(this.bullets, "render");

			invoke(this.sectors, "render");
			invoke(this.particles, "render");
			invoke(this.ships, "render");

			// Hud
			this.renderHud();

			var width = 150;
			var height = width * 3 / 4;
			var margin = 20;
			var marginY = H - height - margin;
			G.ctx.save();
			G.ctx.translate(G.camera.x + margin, G.camera.y + marginY);
			rect(0, 0, width, height);
			fill("rgba(0, 0, 0, 0.3)");
			stroke("rgb(30, 30, 30)", 1);

			rect(~~(G.camera.x / this.width * width), ~~(G.camera.y / this.height * height), 
				~~(W / this.width * width), ~~(H / this.height * height));
			fill("rgb(20,20,20)");

			G.world.sectors.forEach(function(sector) {
				var x = sector.x / G.world.width * width;
				var y = sector.y / G.world.height * height;
				circle(~~x, ~~y, min(sector.radius / G.world.width * width, sector.radius / G.world.height * height));
				fill(sector.team ? sector.team.fillColor : "rgb(150, 150, 150)");
			});

			G.world.ships.forEach(function(ship) {
				var x = ship.x / G.world.width * width;
				var y = ship.y / G.world.height * height;
				rect(~~x, ~~y, 1, 1);
				fill(ship.team.strokeColor);
			});
			G.ctx.restore();

			if( this.gameOver && G.world.reload > 0 ) {
				G.ctx.translate( G.camera.x, G.camera.y );
				G.world.reload -= G.dt;
				rect( 0, H/3, W, H/3 );
				fill( "rgb(150,150,150)" );

				drawText({
					x: W/2,
					y: H/2.8,
					text: "Game Over",
					hspacing: 3,
					scale: 5,
					halign: "center"
				});
				fill( "rgb(220,0,20)" );

				if( G.world.reload < 6 ) {
					drawText({
						x: W/2,
						y: H/2.2,
						text: "You survived " + G.level + " rounds and secured " + G.world.accumPlayerWins + " sectors\nin " + formatTime( this.playingTime ) + " minutes",
						hspacing: 3,
						vspacing: 3,
						scale: 3,
						halign: "center"
					});
					fill( "rgb(1,1,1)" );
					drawText({
						x: W/2,
						y: H/2 + 40,
						text: "Best stat: " + G.getData( "won" ) + " sectors",
						hspacing: 1,
						scale: 2,
						halign: "center"
					});
					fill( "rgb(20,130,10)" );
				}

				if( G.world.reload < 0 ) {
					window.location.reload();
				}
			}

		G.ctx.restore();
	};

	this.endGame = function( success ) {
		this.gameOver = true;
		this.accumPlayerWins += this.playerWins;
		G.saveData( "won", max( G.getData( "won" ), this.accumPlayerWins ) );

		if( !success ) {
			setTimeout(function() {
				tween( G, "flashAlpha", 0.7, 0.1, 1, swing );
				G.world.reload = 13;
			}, 1000);
		} else {
			setTimeout(function() {
				tween( G, "flashAlpha", 9, 0.0, 1, swing );
				G.world.init();
			}, 1000);
		}
	};

}


function Game() {

	G = this;

	G.init = function() {
		G.el = document.getElementById("game");
		G.wrap = document.getElementById("wrap");
		G.f = document.getElementById("f");
		G.ctx = G.el.getContext("2d");
		G.fullScreen = false;

		G.el.width = W;
		G.el.height = H;

		G.shake = vec();
		G.shaking = false;
		G.camera = vec();
		G.camera.width = W;
		G.camera.height = H;
		G.scale = vec(1, 1);
		G.mouse = vec();
		G.cursor = G.selectionCursor = new SelectionCursor();
		G.atkCursor = new AttackCursor();
		G.keys = [];
		G.particles = [];
		G.tweens = [];
		G.flashAlpha = 0;
		G.bgAlpha = 1;

		G.rnd = new RandomGenerator();
		var d = localStorage && localStorage.bs;
		G.data = d ? JSON.parse( d ) : {
			won: 0
		};

		G.scene;
		G.level = 0;
		G.world = new World( G );

		G.paused = false;
		G.dt = 1 / FPS;
		G.accum = 0;
		G.elapsed = 0;
		G.now;
		G.lt;
		G.tick = 0;

		G.wrap.style.opacity = 1;
		G.bindEvents();
		G.resize();
		G.initBackground();
	};

	G.getData = function(key) {
		return G.data[key];
	};

	G.saveData = function(key, value) {
		G.data[key] = value;
		localStorage && ( localStorage.bs = JSON.stringify( G.data ) );
	};

	G.bindEvents = function() {
		function listen(el, event, cb) {
			if (el.attachEvent) {
				el.attachEvent( "on" + event, cb );
			} else {
				el.addEventListener(event, cb, false);
			}
		}

		function getMouseCoords(e) {
			var bounds = G.el.getBoundingClientRect();
			G.mouse.x = (e.pageX - bounds.left) * G.scale.x; 
			G.mouse.y = (e.pageY - bounds.top) * G.scale.y; 
		}

		listen(window, "contextmenu", function(e) { e.preventDefault(); });
		listen(document, "drag", function(e) { e.preventDefault(); });

		listen(window, "blur", function() { G.paused = 1; });
		listen(window, "focus", function() { G.paused = 0; });
		listen(G.f, "click", G.toggleFullScreen);

		listen(G.el, "mousedown", function(e) {
			getMouseCoords(e);
			G.cursor.mousedown(G.mouse, e.which == 3);
			e.preventDefault();
		});

		listen(G.el, "mouseup", function(e) {
			getMouseCoords(e);
			G.cursor.mouseup(G.mouse);
			e.preventDefault();
		});

		listen(G.wrap, "mousemove", function(e) {
			getMouseCoords(e);
			G.cursor.mousemove(G.mouse);
			e.preventDefault();
		});

		listen(document, "keydown", function(e) {
			var code = e.keyCode;
			G.keys[code] = true;
		});

		listen(document, "keyup", function(e) {
			var code = e.keyCode;
			G.keys[code] = false;
		});
	};

	G.resize = function() {
		var ratio = W / H,
			newWidth, newHeight;

		if (window.innerWidth / window.innerHeight > ratio) {
			// The window's width is larger, scale on the x axis
			newHeight = window.innerHeight * 0.9;
			newWidth = newHeight * ratio;
		} else {
			// Scale on the y axis
			newWidth = window.innerWidth * 0.9;
			newHeight = newWidth / ratio;
		}

		newWidth = ~~newWidth;
		newHeight = ~~newHeight;

		var border = ~~(newWidth / W * 12);

		G.wrap.style.width = newWidth + "px";
		G.wrap.style.height = newHeight + "px";
		G.wrap.style.marginLeft = Math.floor((window.innerWidth - newWidth) / 2 - border) + "px";
		G.wrap.style.marginTop = Math.floor((window.innerHeight - newHeight) / 2 - border) + "px";
		G.wrap.style.border = border + "px solid rgb(10,10,10)";

		G.scale.x = W / newWidth;
		G.scale.y = H / newHeight;
	};

	G.toggleFullScreen = function(e) {
		if (document.fullscreenEnabled) {
	    	G.fullScreen ? document.exitFullscreen() : document.body.requestFullscreen();
	  	} 
	  	else if (document.webkitFullscreenEnabled) {
	    	G.fullScreen ? document.webkitExitFullscreen() : document.body.webkitRequestFullscreen();
	  	} 
	  	else if (document.mozFullScreenEnabled) {
	    	G.fullscreen ? document.mozCancelFullScreen() : document.body.mozRequestFullScreen();
	  	}

	  	G.fullScreen = !G.fullScreen;
	  	G.resize();
	  	e.preventDefault();
	};

	G.initBackground = function() {
		G.hexGrid = cache(G.world.width, G.world.height, function(ctx, w, h) {
			var hexagonAngle = 30 * Math.PI / 180;
			var size = 20;
			var hexagonRadius = Math.cos(hexagonAngle) * size;
			var hexagonRadiusY = Math.sin(hexagonAngle) * size;
			var hexagonHeight = size * 2;
			// var hexagonWidth = Math.sqrt(3) / 2 * hexagonHeight;
			var hexagonWidth = hexagonRadius * 2;

			var rows = ceil(h / (hexagonRadiusY + size));
			var cols = ceil(w / hexagonWidth);
			var spacing = 5;
			rows -= floor((spacing * rows) / (hexagonRadiusY + size)) - 2;
			cols -= floor((spacing * cols) / hexagonWidth) - 2;

			ctx.strokeStyle = "rgb(20,20,20)";
			ctx.translate(-hexagonWidth, -hexagonHeight);

			for (var r = 0; r < rows; r++) {
				for (var q = 0; q < cols; q++) {
					if (rand() < 0.55) drawHexagon(
						q * (hexagonWidth + spacing) + ((r % 2) * hexagonWidth/2),
						r * (hexagonRadiusY + size + spacing),
						false
					);
				}
			}

			function drawHexagon(x, y, fill) {
				ctx.beginPath();
				ctx.moveTo(x + hexagonWidth/2, y);
				ctx.lineTo(x + hexagonWidth, y + size / 2);
				ctx.lineTo(x + hexagonWidth, y + 3 * size / 2);
				ctx.lineTo(x + hexagonWidth/2, y + hexagonHeight);
				ctx.lineTo(x, y + 3 / 2 * size);
				ctx.lineTo(x, y + size / 2);
				ctx.closePath();

				if (fill) {
					ctx.fill();
				} else {
					ctx.stroke();
				}
			}
		});

		G.astralBodies = cache(G.world.width, G.world.height, function(ctx, w, h) {
			var i = ~~( w * 0.25 );
			while( i-- ) {
				ctx.beginPath();
				ctx.arc(rand(w), rand(h), rand(0.1, 0.3), 0, PI2);
				ctx.fillStyle = "rgba(255,255,255,"+rand(0.3, 0.6)+")";
				ctx.fill();
			}

			i = ~~( w * 0.25 );
			while( i-- ) {
				ctx.beginPath();
				ctx.arc(rand(w), rand(h), rand(0.3, 0.6), 0, PI2);
				ctx.fillStyle = "rgba(255,255,255,"+rand(0.5, 0.8)+")";
				ctx.fill();
			}

			i = ~~( h * 0.1 );
			while( i-- ) {
				ctx.beginPath();
				ctx.arc(rand(w), rand(h), rand(0.8, 1.2), 0, PI2);
				ctx.fillStyle = "rgba(255,255,255,"+rand(0.5, 0.8)+")";
				ctx.fill();
			}

			// function planet(x, y, radius, hue) {
			// 	ctx.save();
			// 	ctx.beginPath();
			// 	ctx.arc(x, y, radius * 0.95, 0, PI2);
			// 	ctx.fillStyle = "hsla(" + hue + ", 100%, 10%, 0.5)";
			// 	ctx.shadowColor = "hsla(" + hue + ", 100%, 50%, 1)";
			// 	ctx.shadowBlur = 20;
			// 	ctx.fill();
			// 	ctx.shadowBlur = 0;

			// 	ctx.globalCompositeOperation = "lighter";

			// 	var step = 0.01;
			// 	for (var i = 0; i < PI2; i += step) {
			// 		var eX = Math.cos(i) * radius;
			// 		var eY = Math.sin(i) * radius;
			// 		var numberOfDots = max(1, ~~(radius * 0.05));
			// 		for (var j = 0; j < numberOfDots; j++) {
			// 			var interp = rand(0, 1);
			// 			var d = rand(-1, 1);
			// 			ctx.beginPath();
			// 			ctx.arc(x + interp * eX + d, y + interp * eY + d, rand(1, 2), 0, PI2);
			// 			ctx.fillStyle = "hsla(" + hue + ", 80%, " + ~~((1-interp) * 100) + "%, 0.8)";
			// 			ctx.fill();
			// 		}
			// 	}

			// 	ctx.restore();
			// }

			// var x = rand(100);
			// while( x < w ) {
			// 	planet(x, rand(h), rand(30, 100), ~~rand(360));
			// 	x += rand(350, 450);
			// }

		});
	};

	G.updateCursor = function() {
		if (G.keys[70]) {
			if (G.cursor != G.atkCursor) {
				G.cursor = G.atkCursor;
			} else if (G.cursor == G.atkCursor) {
				G.cursor = G.selectionCursor;
			}
			G.keys[70] = false;
		}

		G.cursor.mousemove(G.mouse);
	};

	var lastW, lastH;

	G.logic = function() {
		if( !G.paused ) {
			G.scene.update();
		}

		G.updateCursor();

		// Size
		if (lastW !== window.innerWidth || lastH !== window.innerHeight) {
			lastW = window.innerWidth;
			lastH = window.innerHeight;
			G.resize();
		}

		if( ( G.shaking -= G.dt ) > 0 ) {
			G.shake.x = rand(-4, 4);
			G.shake.y = rand(-4, 4);
		} else {
			G.shake.x = G.shake.y = 0;
		}

		invoke( G.tweens, "update" );
		invoke( G.particles, "update" );
	};

	G.render = function() {
		G.ctx.clearRect(0, 0, W, H);

		G.ctx.save();
			G.ctx.translate( -G.camera.x + G.shake.x, -G.camera.y + G.shake.y );

			G.ctx.globalAlpha = G.bgAlpha;

			G.ctx.drawImage( 
				G.hexGrid, 
				G.camera.x + G.shake.x, 
				G.camera.y + G.shake.y, 
				W,
				H,
				G.camera.x - G.shake.x, 
				G.camera.y - G.shake.y, 
				W, 
				H
			);

			G.ctx.drawImage( 
				G.astralBodies,
				G.camera.x + G.shake.x, 
				G.camera.y + G.shake.y, 
				W,
				H, 
				G.camera.x - G.shake.x, 
				G.camera.y - G.shake.y, 
				W, 
				H
			);

			G.ctx.globalAlpha = 1;
			G.scene.render();
			invoke( G.particles, "render" );
			
			G.cursor.render();

			if( G.flashAlpha ) {
				rect( G.camera.x, G.camera.y, W, H );
				fill( "rgba(255, 255, 255, " + G.flashAlpha + ")" );
			}
		G.ctx.restore();
	}

	G.loop = function() {
		G.now = Date.now();
		G.dt = G.lt ? Math.min(1, (G.now - G.lt)/1000) : 0;
		G.lt = G.now; 

			G.logic();
			G.tick++;

		G.render();
		requestAnimationFrame(G.loop);
	};

	G.playScene = function(scene) {
		G.scene = scene;
		G.scene.init();
	};

	G.init();

};

var MenuScene = {
	init: function() {
		G.bgAlpha = 0.3;
		this.titleY = H * 0.7;
		this.translateY = H;
		this.title = { x0: 0, x1: W };

		var _this = this;
		tween( this.title, "x0", 0, W/2, 1.6 * 1, easeOutBounce, function() {
			tween( G, "bgAlpha", 0.2, 1, 2 * 1, swing );
			tween( _this, "titleY", H * 0.7, H/4, 1 * 1, swing );
			tween( _this, "translateY", H, 0, 1 * 1, swing );
		});
		tween( this.title, "x1", W, W/2, 1.6 * 1 * 1, easeOutBounce );

		this.playerSector = new Sector( W/8, H * 0.55, SECTOR_RADIUS );
		this.playerSector.team = PLAYER;
		this.enemySector = new Sector( W*3.5/4, H * 0.52, SECTOR_RADIUS );
		this.enemySector.team = ENEMY;
		this.target = new Sector( W/2, H * 0.55, SECTOR_RADIUS );
		this.sectors = [this.playerSector, this.enemySector, this.target];

		this.cursor = new SelectionCursor();
		this.cursor.x = W * 0.9;
		this.cursor.y = H * 0.85;
	},

	render: function() {
		G.ctx.save();
		drawText({
			x: this.title.x0 - 2,
			y: this.titleY,
			text: "Battle",
			scale: 8,
			halign: "right",
			valign: "center",
			hspacing: 4
		});

		fill( "hsl(140, 100%, 60%)" );

		drawText({
			x: this.title.x1 + 2,
			y: this.titleY,
			text: "surge",
			scale: 8,
			valign: "center",
			hspacing: 4
		});

		fill( "hsl(0, 100%, 100%)" );

		G.ctx.translate( 0, this.translateY );

		drawText({
			x: this.playerSector.x,
			y: this.playerSector.y - 80,
			text: "Your secured sector",
			scale: 1.8,
			halign: "center",
			valign: "bottom",
			hspacing: 2
		});

		fill( "hsl(0, 100%, 100%)" );

		drawText({
			x: this.enemySector.x,
			y: this.enemySector.y - 80,
			text: "Enemy's secured sector",
			scale: 1.8,
			halign: "center",
			valign: "bottom",
			hspacing: 2
		});

		fill( "hsl(0, 100%, 100%)" );

		drawText({
			x: this.target.x,
			y: this.target.y - 80,
			text: "The target",
			scale: 1.8,
			halign: "center",
			valign: "bottom",
			hspacing: 2
		});

		fill( "hsl(0, 100%, 100%)" );

		invoke( this.sectors, "render" );

		drawText({
			x: W/2,
			y: H - 30,
			text: "Goal: Secure all sectors to win.",
			scale: 2,
			halign: "center",
			valign: "bottom",
			hspacing: 2
		});

		fill( "hsl(0, 100%, 100%)" );

		var r = 15;

		G.ctx.globalAlpha = 1 + Math.sin( G.tick * 0.4 );
		circle( this.cursor.x, this.cursor.y, r - Math.sin( G.tick * 0.4 ) * 0 );
		stroke( "hsl(0, 100%, 80%)" );
		G.ctx.globalAlpha = 1;

		this.cursor.render();

		G.ctx.restore();
	},

	update: function() {
		if( G.bgAlpha === 1 && G.cursor.down && dist( this.cursor, G.mouse ) < 15 ) {
			tween( G, "flashAlpha", 1, 0, 2.5, swing);
			G.playScene( PlayScene );
		}
	}
}

var PlayScene = {
	init: function() {
		
		G.world.init();
		
	},

	update: function() {

		G.world.update();

	},

	render: function() {

		G.world.render();
		
	}
};


window.onload = function() {
	G = new Game();
	G.playScene(MenuScene);
	G.loop();
}