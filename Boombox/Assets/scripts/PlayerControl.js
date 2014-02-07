#pragma strict

// PARAMETERS
private static var MAX_VELOCITY_CHANGE = 10.0;

private var SPEED = 10;

private static var GRAVITY = 10;
private static var JUMP_HEIGHT = 2;

private var onGround : boolean;
private var health : float;

private var hasKey : boolean;
private var hasDoubleJump : boolean;
private var usedDoubleJump : boolean;
private var timeUsedDoubleJump : float;
private var cam : GameObject;

private var facingLeft : boolean;

//sound effect declarations
public var damageSound : AudioClip;
public var jumpSound : AudioClip;
public var fallSound : AudioClip;
public var itemPickup : AudioClip;


function Start() {
	health = 100;
	
	hasKey = false;
	hasDoubleJump = false;
	usedDoubleJump = false;
	
	cam = GameObject.Find("Main Camera");
	
	facingLeft = false;
}

function Update() {
	// Use raytracing to get onGround
	onGround = Physics.Raycast(transform.position, -Vector3.up, 1.05);
	if(onGround) usedDoubleJump = false;
	
	if(rigidbody.position.y < -10) {
		Application.LoadLevel(0);
	}
	
	// Hit jump button and we're on the ground
	if(Input.GetButtonDown("Jump")) {
		if(onGround || (hasDoubleJump && !usedDoubleJump)) {
			rigidbody.velocity = Vector3(rigidbody.velocity.x, Mathf.Sqrt(2 * JUMP_HEIGHT * GRAVITY), rigidbody.velocity.z);
			cam.audio.clip = jumpSound;
			cam.audio.Play();
			if(!onGround) usedDoubleJump = true;
		}
		
		// put jump sound here
	}
}

function FixedUpdate() {
	// Calculate how fast we should be moving
	var targetVelocity = new Vector3(Input.GetAxis("Horizontal"), 0, 0);
	targetVelocity *= SPEED;
	
	facingLeft = targetVelocity.x < 0;
	
	// Face the right direction dummy
	if(Mathf.Abs(targetVelocity.x) > 0) {
		// TO DO : ANIMATION BLENDING BETWEEN IDLE AND WALKING
		// mekanum natural blend, set parameter of exit and exit = velocity
		GameObject.Find("PlayerCharacterModel").transform.rotation = facingLeft
			? Quaternion.EulerAngles(0, -Mathf.PI/2, 0)
			: Quaternion.EulerAngles(0, Mathf.PI/2, 0);
	}

	// Apply a force that attempts to reach our target velocity
	var velocity = rigidbody.velocity;
	var velocityChange = (targetVelocity - velocity);
	velocityChange.x = Mathf.Clamp(velocityChange.x, -MAX_VELOCITY_CHANGE, MAX_VELOCITY_CHANGE);
	velocityChange.z = Mathf.Clamp(velocityChange.z, -MAX_VELOCITY_CHANGE, MAX_VELOCITY_CHANGE);
	velocityChange.y = 0;
	rigidbody.AddForce(velocityChange, ForceMode.VelocityChange);
	
	// Manually do gravity
	rigidbody.AddForce(0, -GRAVITY * rigidbody.mass, 0);
}

// ===== //

// Callback for when we start colliding with something
function OnCollisionEnter(collision : Collision) {
	//onGround = true;
	
	if(collision.gameObject.tag == "Key") {
		hasKey = true;
		
		cam.audio.clip = damageSound;
		cam.audio.Play();
	}
	
	if(collision.gameObject.tag == "DoubleJump") {
		hasDoubleJump = true;
		
		cam.audio.clip = damageSound;
		cam.audio.Play();
	}
}

// Callback for when we stop colliding with something
function OnCollisionExit(collision : Collision) {
	// onGround = false;
}

// ===== //

// deal damage to the player
function damage(amount : float) {
	health -= amount;
	
	cam.audio.clip = damageSound;
	cam.audio.Play();
	
	if(health <= 0) {
		Debug.Log("Game over!");
		
		yield WaitForSeconds(1);
		Application.LoadLevel(0);
	}
}

function holdingKey() {
	return hasKey;
}

