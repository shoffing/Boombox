#pragma strict

private var opacity : float;
private var touched : boolean;

function Start() {
	opacity = 1.0f;
}

function Update() {
	renderer.material.color.a = opacity;
}

function OnCollisionEnter(col : Collision) {
	if(col.gameObject.tag == "Player" && !touched) {
		touched = true;
		Invoke("FadeFloor", 0.1);
	}
}

function FadeFloor() {
	opacity -= 0.1;
	
	if(opacity <= 0) {
		Destroy(gameObject);
	} else {
		Invoke("FadeFloor", 0.1);
	}
}