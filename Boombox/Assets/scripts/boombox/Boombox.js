#pragma strict

class Boombox extends MonoBehaviour
{
	private var bbActive : boolean;
	
	//
	
	virtual function Start() {
		bbActive = false;
	}
	
	virtual function Update() {
		if(bbActive) {
			bbUpdate();
		}
	}
	
	//
	
	virtual function enable() {
		bbActive = true;
	}
	
	virtual function disable() {
		bbActive = false;
	}
	
	virtual function toggle() {
		if(bbActive) {
			disable();
		} else {
			enable();
		}
	}
	
	//
	
	virtual function bbUpdate(){}
}