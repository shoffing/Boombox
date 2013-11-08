#pragma strict

function Start () {

}

function Update () {

}


// Callback for when we start colliding with something
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "Player") {
		Debug.Log("YOU HAVE LOST (lol), THE GAEM!");
		yield WaitForSeconds(1);
		Application.LoadLevel(0);
	}
}