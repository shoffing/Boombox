#pragma strict

private var boomboxActive : boolean;

private static var EFFECT_RADIUS = 5;
private static var EFFECT_FALLOFF_START = 4;
private static var EFFECT_POWER = 30;

function Start() {
	enable();
}

function Update() {
	// Render concentric rings here
}

function FixedUpdate() {
	if(boomboxActive) {
		var colliders : Collider[] = Physics.OverlapSphere(transform.position, EFFECT_RADIUS);
		
		for(var hit : Collider in colliders) {
			if(hit && hit.rigidbody) {
				var dist = Vector3.Distance(hit.ClosestPointOnBounds(rigidbody.position), rigidbody.position);
				
				var falloffMultiplier = Mathf.Pow(1 - Mathf.Clamp((dist - EFFECT_FALLOFF_START) / (EFFECT_RADIUS - EFFECT_FALLOFF_START), 0, 1), 2);
				var forceDirection = (hit.rigidbody.position - rigidbody.position).normalized;
				var force = forceDirection * EFFECT_POWER * falloffMultiplier;
				
				hit.rigidbody.AddForce(force, ForceMode.Force);
			}
		}
	}
}

function enable() {
	boomboxActive = true;
	GetComponent(ParticleSystem).Play();
}

function disable() {
	boomboxActive = false;
	GetComponent(ParticleSystem).Stop();
}