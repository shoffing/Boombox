#pragma strict

private static var EFFECT_RADIUS = 5;
private static var EFFECT_POWER = 100;

function FixedUpdate () {
	var colliders : Collider[] = Physics.OverlapSphere(transform.position, EFFECT_RADIUS);
	
	for(var hit : Collider in colliders) {
		if(hit && hit.rigidbody) {
			var dist = Vector3.Distance(hit.ClosestPointOnBounds(rigidbody.position), rigidbody.position);
			var force = (dist / EFFECT_RADIUS) * EFFECT_POWER * (hit.rigidbody.position - rigidbody.position).normalized;
			hit.rigidbody.AddForce(force, ForceMode.Force);
		}
	}
}