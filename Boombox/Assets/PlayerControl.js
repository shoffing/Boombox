#pragma strict

// PARAMETERS
static var MAX_VELOCITY_CHANGE = 10.0;

var SPEED = 10;

static var GRAVITY = 10;
static var JUMP_HEIGHT = 2;

var onGround : boolean;

var tempJumpTest : float;

function Start() {
	
}

function Update() {
	if(rigidbody.position.y < -10) {
		Application.LoadLevel(0);
	}
}

function FixedUpdate() {
	// Calculate how fast we should be moving
	var targetVelocity = new Vector3(Input.GetAxis("Horizontal"), 0, 0);
	targetVelocity *= SPEED;

	// Apply a force that attempts to reach our target velocity
	var velocity = rigidbody.velocity;
	var velocityChange = (targetVelocity - velocity);
	velocityChange.x = Mathf.Clamp(velocityChange.x, -MAX_VELOCITY_CHANGE, MAX_VELOCITY_CHANGE);
	velocityChange.z = Mathf.Clamp(velocityChange.z, -MAX_VELOCITY_CHANGE, MAX_VELOCITY_CHANGE);
	velocityChange.y = 0;
	rigidbody.AddForce(velocityChange, ForceMode.VelocityChange);
	
	// Hit jump button and we're on the ground
	if(Input.GetButtonDown("Jump") && onGround) {
		rigidbody.velocity = Vector3(velocity.x, Mathf.Sqrt(2 * JUMP_HEIGHT * GRAVITY), velocity.z);
	}
	
	// Manually do gravity
	rigidbody.AddForce(0, -GRAVITY * rigidbody.mass, 0);
}

// ===== //

// Callback for when we start colliding with something
function OnCollisionEnter(collision : Collision) {
	onGround = true;
}

// Callback for when we stop colliding with something
function OnCollisionExit(collision : Collision) {
	onGround = false;
	
	tempJumpTest = rigidbody.position.x;
}