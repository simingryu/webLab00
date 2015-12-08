"use strict";

document.observe("dom:loaded", function() {
	/* 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오
	(힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오.
	 (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var allimages = $$("#labs > img");
	for (var i = 0; i < allimages.length; i++) {
		new Draggable(allimages[i], {revert: true});
	}
	
	var chooseimage = $$("#selectpad > img");
	for (var i = 0; i < chooseimage.length; i++) {
		new Draggable(chooseimage[i], {revert: true});
	}
	
	Droppables.add("selectpad", {onDrop: labSelect});
	Droppables.add("labs", {onDrop: labSelect});
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 laboratory selection에는 최대 세 개까지 들어갈 수 있음
	 저 섹션 아닌 곳으로 이동하면 제자리로 이동함
	 하나가 들어가면 걔가 자리를 잡고 alt를 아래에 입력
	 순서는 무조건 들어온 순서대로
	 밖으로 뺄 수 있음
	 */
	 
	if (drop.id == "labs") {
		$("selectpad").removeChild(drag);
		$("labs").appendChild(drag);
		
		var drag_li;
		var selection_li = $$("#selection > li");
		for (var i = 0; i < selection_li.length; i++) {
			if (drag.getAttribute("alt") == selection_li[i].innerHTML) {
				drag_li = selection_li[i];
			}
		}
		$("selection").removeChild(drag_li);
	}
	else if (drop.id != drag.parentNode.id) {
		if(drop.id == "selectpad") {
			var lili = $$("#selection > li");
			if (lili.length < 3) {
				$("labs").removeChild(drag);
				$("selectpad").appendChild(drag);
				var li = document.createElement("li");
				li.innerHTML = drag.getAttribute("alt");
				$("selection").appendChild(li);
				li.pulsate({
					duration: 1.0,
					delay: 0.5
				})
			}
		}
	}
}

