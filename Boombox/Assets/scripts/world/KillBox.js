#pragma strict

// Callback for when we start colliding with something
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "Player") {
		collision.gameObject.GetComponent(PlayerControl).damage(9999);
	}
}