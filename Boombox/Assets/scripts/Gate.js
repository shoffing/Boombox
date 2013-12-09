#pragma strict

function OnCollisionEnter(col : Collision) {
	if(col.gameObject.tag == "Player") {
		if(col.gameObject.GetComponent(PlayerControl).holdingKey()) {
			// Disable gate collision
			GetComponent(BoxCollider).enabled = false;
			
			// put gate sound here
			animation.Play();
			
			audio.Play();
		}
	}
}