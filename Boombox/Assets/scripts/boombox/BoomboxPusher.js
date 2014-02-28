#pragma strict

<<<<<<< HEAD:Boombox/Assets/scripts/boombox/BoomboxPusher.js
public class BoomboxPusher extends Boombox
{
	private final static var EFFECT_RADIUS = 5;
	private final static var EFFECT_FALLOFF_START = 4;
	private final static var EFFECT_POWER = 30;
	
	virtual function bbUpdate() {
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
	
	virtual function enable() {
		super.enable();
		GetComponent(ParticleSystem).Play();
	}
	
	virtual function disable() {
		super.disable();
		GetComponent(ParticleSystem).Stop();
	}
}