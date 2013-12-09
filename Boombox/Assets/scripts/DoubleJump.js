#pragma strict

function OnCollisionEnter(col : Collision) {
	if(col.gameObject.tag == "Player") {
		// put key sound here
		Destroy(gameObject);
	}
}