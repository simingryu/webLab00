var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];	//정답인 3개
var selectedBlocks = [];	//내가 선택한 3개
var timer;

document.observe('dom:loaded', function(){	
	$("start").observe("click", stopToStart);
	$("stop").observe("click", stopGame);

});

function stopToStart(){
	stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").innerHTML = "stop";
	$("answer").innerHTML = "0/0";
	
	clearInterval(timer);
	
	targetBlocks = [];
	selectedBlocks = [];
	
	var allblock = $$(".block");
	for (var i = 0; i < numberOfBlocks.length; i++){
		allblock[i].removeClassName("target");
		allblock[i].removeClassName("selected");
		allblock[i].stopObserving("click");
	}
}

function startToSetTarget(){
	clearInterval(timer);
	targetBlocks = [];
	selectedBlocks = [];
	
	var allblock = $$(".block");
	for (var i = 0; i < targetBlocks.length; i++){
		allblock[targetBlocks[i]].removeClassName("target");
	}
	
	$("state").innerHTML = "Ready!";
	
	do {
		var randomnum1 = Math.floor(Math.random() * 10);
		var randomnum2 = Math.floor(Math.random() * 10);
		var randomnum3 = Math.floor(Math.random() * 10);
	} while(randomnum1 == randomnum2 || randomnum1 == randomnum3 || randomnum2 == randomnum3 || randomnum1 == 9 || randomnum2 == 9 || randomnum3 == 9);
	
	targetBlocks.push(randomnum1);
	targetBlocks.push(randomnum2);
	targetBlocks.push(randomnum3);
	
	timer = setInterval(setTargetToShow, interval);
	console.log(targetBlocks);
}

function setTargetToShow(){
	clearInterval(timer);
	$("state").innerHTML = "Memorize!";
	
	var allblock = $$(".block");
	
	for(var i=0; i < numberOfTarget; i++) {
		allblock[targetBlocks[i]].addClassName("target");
	}

	timer = setInterval(showToSelect, interval);
}

function showToSelect(){
	clearInterval(timer);
	
	$("state").innerHTML = "Select!";
	
	var allblock = $$(".block");
	for (var i = 0; i < allblock.length; i++){
		allblock[i].removeClassName("target");
		allblock[i].observe("click", function() {
			if (selectedBlocks.length < numberOfTarget) {
				this.addClassName("selected");
				this.stopObserving("click");
				selectedBlocks.push(this.readAttribute("data-index"));
		}
	});
	}
	timer = setInterval(selectToResult, interval);
	
}

function selectToResult(){
	clearInterval(timer);console.log(selectedBlocks);
	$("state").textContent = "Checking";
	
	var allblock = $$(".block");
	for (var i = 0; i < numberOfBlocks; i++) {
		allblock[i].removeClassName("selected");
		allblock[i].stopObserving("click");
	}
	
	var count = 0;
	for (var i = 0; i < numberOfTarget; i++) {
		for (var j = 0; j < selectedBlocks.length; j++) {
			if (targetBlocks[i] == selectedBlocks[j]) {
				count++;
			}
		}
	}
	var current = $("answer").innerHTML;
	var array = current.split("/");
	$("answer").textContent = (array[0]*1+count*1) + "/" + (array[1]*1+numberOfTarget*1);
	
	timer = setInterval(startToSetTarget, interval);
}