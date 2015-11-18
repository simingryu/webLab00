"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
	var flag1 = 0;
	var flag_dec = 0;
	
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
			if(flag1 == 0) {
				flag1 = 1;
				document.getElementById('expression').innerHTML = "0";
			}
            var value = this.innerHTML;
			if (0 <= value && value <= 9){
				flag_dec = 0;
				if (displayVal != "0") {
					displayVal = displayVal + value;
					document.getElementById('result').innerHTML = displayVal;
				}
				else {
					displayVal = value;
					document.getElementById('result').innerHTML = displayVal;
				}
			}
			else if(value == "AC"){
				displayVal = "0";
				flag_dec = 0;
				flag1 = 0;
				stack = [];
				
				document.getElementById('expression').innerHTML = "0";
				document.getElementById('result').innerHTML = "0";
			}
			else if(value == "."){
				if (!flag_dec) {
					flag_dec = 1;
					displayVal = displayVal + value;
				}
				document.getElementById('result').innerHTML = displayVal;
				stack.push(displayVal);
			}
			else if(value == "(") {
				
			}
			else {	//operand
				if(document.getElementById('expression').innerHTML == "0") {
					displayVal = displayVal + value;
					document.getElementById('expression').innerHTML = displayVal;
					stack.push(value);
				}
				else if(value == "=") {
					displayVal = displayVal + value;
					stack.push(displayVal);
					
					var result = stack[0];
					var result2 = 0;
					var i;
					
					result1.push(stack);
					
					for (i = 0; i < stack.length; i++) {
						if(stack[i] == "+") {
							result += stack[i+1];
						}
						else if(stack[i] == "-") {
							result -= stack[i+1];
						}
						else if(stack[i] == "*") {
							result *= stack[i+1];
						}
						else if(stack[i] == "/") {
							result /= stack[i+1];
						}
						else {
							result += stack[i+1];
						}
					}
					document.getElementById('expression').innerHTML = result;
                    document.getElementById('result').innerHTML = "0";
					
                    stack = [];
                    displayVal = 0;
                    flag1 = 0;
					flag_dec = 0;
				}
				else {
					displayVal = displayVal + value;
					document.getElementById('expression').innerHTML += displayVal;
					stack.push(value);
				}
				displayVal = 0;
				document.getElementById('result').innerHTML = displayVal;
			}
            $('result').innerHTML = displayVal;
        };
    }
}

function isValidExpression(s) { //괄호 개수 짝 맞는지 체크
	var i = 0;
	var count1 = 0;
	var count2 = 0;
	
	for (i = 0; stack.length; i++) {
		if(stack[i] == "(") {
			count1 = count1 + 1;
		}
	}
	
	for (i = 0; stack.length; i++) {
		if(stack[i] == "(") {
			count2 = count2 + 1;
		}
	}
	
	if (count1 != count2) {
		displayVal = "Error";
		document.getElementById('result').innerHTML = displayVal;
		document.getElementById('expression').innerHTML = "0";
	}
	stack = [];
	displayVal = 0;
	flag1 = 0;
	flag_dec = 0;
}

function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
	
    for(var i = 0; i < stack.length; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        }
		else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            }
			else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        }
						else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                }
				else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}

function postfixCalculate(s) {
	var operand = [];
	for (var i = 0; i < s.length; i++) {
		if (s[i] == "+") {
			var a = operand.pop()*1;
			var b = operand.pop()*1;
			operand.push(b+a);
		} 
		else if (s[i] == "-") {
			var a = operand.pop()*1;
			var b = operand.pop()*1;
			operand.push(b-a);
		} 
		else if (s[i] == "*") {
			var a = operand.pop()*1;
			var b = operand.pop()*1;
			operand.push(b*a);
		}
		else if (s[i] == "/") {
			var a = operand.pop()*1;
			var b = operand.pop()*1;
			operand.push(b/a);
		}
		else {
			operand.push(s[i]);
		}
	}
	return operand.pop();
}