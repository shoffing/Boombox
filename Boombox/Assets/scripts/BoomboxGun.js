#pragma strict

private var heldObject : GameObject;

private var mousePosWorld : Vector3;

function Start() {
	mousePosWorld = Vector3.zero;
}

function Update() {
	// Calculate mouse position in world
	var ray : Ray = Camera.mainCamera.ScreenPointToRay(Input.mousePosition);
	var plane : Plane = new Plane(Vector3(0,0,-1), Vector3(0,0,0));
	var rayDistance : float;
	if(plane.Raycast(ray, rayDistance)) {
		mousePosWorld = ray.GetPoint(rayDistance);
	}
	
	var eyePos = transform.position + Vector3(0,1,0);
	var aimDir = (mousePosWorld - eyePos).normalized;
	
	// Look for object with rigidbody in aim direction
	if(Input.GetMouseButton(0) && heldObject == null) {
		var hit : RaycastHit;
		if(Physics.Raycast(eyePos, aimDir, hit)) {
			var planes : Plane[] = GeometryUtility.CalculateFrustumPlanes(Camera.mainCamera);
			if(hit.rigidbody && GeometryUtility.TestPlanesAABB(planes, hit.collider.bounds)) {
				heldObject = hit.rigidbody.gameObject;
				
				// Turn on boombox
				if(heldObject.GetComponent(PusherBox) != null) {
					heldObject.GetComponent(PusherBox).enable();
				}
			}
		}
	} else if(!Input.GetMouseButton(0) && heldObject) {
		// Turn off boombox
		if(heldObject.GetComponent(PusherBox) != null) {
			heldObject.GetComponent(PusherBox).disable();
		}
		
		// Just let go of the object
		heldObject = null;
	}
	
	
	// Move the held object to the mouse position
	if(heldObject) {
		var heldObjectNewPos = mousePosWorld;
		
		if(Vector3.Distance(heldObjectNewPos, eyePos) < 2.5) {
			heldObjectNewPos = eyePos + aimDir * 2.5;
		}
		
		var force = ( (heldObjectNewPos - heldObject.rigidbody.position) * 10 - heldObject.rigidbody.velocity ) * heldObject.rigidbody.mass;
		heldObject.rigidbody.AddForce(40 * force, ForceMode.Force);
		
		Debug.DrawLine(eyePos, heldObject.rigidbody.position, Color.green);
	} else {
		Debug.DrawLine(eyePos, eyePos + aimDir * 666, Color.red);
	}
}
