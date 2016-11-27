
var seqCont = document.getElementById("seqCont");

var canvas = document.getElementById("canvas");
canvas.className = "flowchart"
canvas.style.background = "white";
canvas.style.textAlign = "center";
canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = 1400;
canvas.height = 800;
canvas.style.zIndex = "-1";
var ctx = canvas.getContext("2d");

//div location values
var flowchartShiftDown = .7;
var flowchartShiftRight = .2;
var margin = 3;
var marginTxt = margin + "px ";
var padding = 3;
var paddingTxt = padding + "px ";
var gridSpacing = 2 * margin + 2 * padding + 20;
var courseDivWidth = 120;
var courseDivHeight = 60;
var numInColDiv = 3;
var containColDivHeight = ((courseDivHeight + ((margin * 2) + (padding * 2))) * (numInColDiv + 1.2));
var containColDivWidth = (courseDivWidth + ((margin * 2) + (padding * 2))) + 20;
var numInRowDiv = 2;
var numColInRowDiv = 2;
var containRowDivHeight = ((courseDivHeight + ((margin * 2) + (padding * 2))) * (numColInRowDiv + .5));
var containRowDivWidth = ((courseDivWidth + ((margin * 2) + (padding * 2))) * (numInRowDiv + .3));
//
var colorMouseOut = {};
var colorMouseOver = {};
var colorMouseClick = {};
colorMouseOut.base = "#D2E9FF";
colorMouseOver.first = "#78BCFF"//"#568F56";
colorMouseOver.base = "FF8973";
colorMouseOver.option = "#1E90FF";
colorMouseClick.first = "#6fa98d";//"#408000"; //"olive"
colorMouseClick.base = "#FF6666";
colorMouseClick.option = "#78BCFF";
//
var colorWirePassive = {};
var colorWireActive = {};
colorWirePassive.base = "#8EC8FF";
colorWireActive.base = "red";
colorWirePassive.seniors = "#D2E9FF";
colorWireActive.seniors = "lightsalmon";
var colorWireTest = {};
colorWireTest.base = "blue";
//
var wireThicknessPassive = {};
var wireThicknessActive = {};
wireThicknessPassive.base = 1;
wireThicknessActive.base = 2;
wireThicknessPassive.seniors = 1;
wireThicknessActive.seniors = 1;
wireThicknessTest = {};
wireThicknessTest.base = 4;

//focus variables
var currentSelection;
var focusChain = [];
var focusChainElectives = [];
var isChainOn = function () {
	if (focusChain.length > 0) {
		return true;
	}
	else {
		return false;
	}
}

generatePrerequisites(); //experimental

//create new courses
var course = {};
for (var i in courseData) {
	course[courseData[i].code] = new Course(courseData[i]);
}
lightEntireTree();


function Course(info) {
	var self = this;
	this.name = info.name;
	this.code = info.code;
	this.label = info.label || info.code;
	this.description = info.description;
	this.trimester = info.trimester;
	this.options = info.options;
	this.optionsSeniorsOnly = info.seniorsOnly || [];
	this.prereq = info.prereq || [];
	this.prereqExtra = info.prereqExtra || [];
	this.prereqWarn = info.prereqWarn || [];
	this.prereqText = info.prereqText || "";
	this.shell = info.shell || "";
	this.isNew = info.isNew;
	this.credit = info.credit;
	this.gridLocation = info.gridLocation;
	this.forms = info.forms;
	this.deptPermission = info.deptPermission;
	this.isContainerCourse = info.isContainerCourse || false;
	this.isInFocus = false;
	this.isLit = false; //used with tree-crawling function, lightAllWires()

	var newDiv = document.createElement("div");
	newDiv.id = self.code;
	newDiv.className = "flowchart";
	newDiv.title = self.forms
	newDiv.gridLocation = self.gridLocation;
	//two lines below shift the flowchart to the right and/or down
	newDiv.gridLocation.row += flowchartShiftDown;
	newDiv.gridLocation.column += flowchartShiftRight;
	css(newDiv);

	var head = function (self) {
		var headline = document.createElement("h4");
		headline.innerHTML = self.name;
		headline.style.fontFamily = "sans-serif";
		headline.style.margin = "5px 0px 0px 0px";
		headline.style.padding = "0px 0px 0px 0px";
		headline.style.fontSize = "x-small";
		headline.style.marginBottom = "0px";
		return headline;
	};
	var sub = function(self) {
		var subhead = document.createElement("p");
		subhead.innerHTML = "(" + self.label + ")" + "<br>" + self.trimester;
		subhead.style.fontFamily = "sans-serif";
		subhead.style.margin = "5px 0px 0px 0px";
		subhead.style.padding = "0px 0px 0px 0px";
		subhead.style.fontSize = "x-small";
		subhead.style.marginTop = "0px";
		return subhead;
	};

	//if (self.code == "MAELECTIVES" || self.code == "MASEMINARS") { 
	if (self.isContainerCourse) {
		newDiv.appendChild(head(self));
	}
	else {
		newDiv.appendChild(head(self));
		newDiv.appendChild(sub(self));
	}
	
	var position = document.getElementsByTagName("body")[0];
	position.appendChild(newDiv);

	this.div = document.getElementById(self.code);


	//ADD EVENT LISTENERS
	this.div = document.getElementById(self.code);
	this.div.addEventListener('mouseover', function () {
		if (self.isContainerCourse) {
			//
		} else {
			mouseoverAction(self);
		}
		
	});
	
	this.div.addEventListener('mouseout', function () {
		//clearAllWires(); //used with tree-crawling function, lightAllWires()
		if (self.isContainerCourse) {
			//
		} else {
			if (focusChain.indexOf(self) < 0) {
				self.div.style.backgroundColor = colorMouseOut.base;
			}
			lightDivChain();
			lightEntireTree();
			//reportExceptions();
			reportExceptions(self);
		}
	});

	this.div.addEventListener('click', function () {
		//if (self.code == "MAELECTIVES" || self.code == "MASEMINARS" || isElective(self)) {
		if (self.isContainerCourse || isElective(self)) {
			buildChainElectives(self);
		} else {
			buildChain(self);
			buildChainElectives(self);
			lightDivChain();
			//lightEntireTree(); //reset tree and draw chain (drops wires from self)
			mouseoverAction(self); //update divs and include wires from self
		//reportExceptions();
		reportExceptions(self);
			
			var focusString =  function () {
				str = "";
				for (var key in focusChain) {
					str += focusChain[key].name + "<br>";
				}
				return str;
			}
			//function below should write the current focus chain to the available blocks in the sequence div
			writeSequence();
		}
	});


	//CSS Definitions 
	function css(div) {
		div.style.position = "absolute";
		div.style.backgroundColor = colorMouseOut.base;
		div.style.textAlign = "center";
		div.style.margin = marginTxt + marginTxt + marginTxt + marginTxt;
		div.style.padding = paddingTxt + paddingTxt + paddingTxt + paddingTxt;
		div.style.borderRadius = "20px";
		div.style.boxShadow = "3px 3px 15px gray"

		if (self.code == "MASEMINARS") {
			div.style.height = String(containColDivHeight) + "px";
			div.style.width = String(containColDivWidth) + "px";
			div.style.left = div.gridLocation.column * (gridSpacing + parseInt(120, 10)) + "px";
			div.style.top = div.gridLocation.row * (gridSpacing + parseInt(60, 10)) + "px";
			//div.style.zIndex = "-1";
		}
		else if (self.code == "MAELECTIVES") {
			div.style.height = String(containRowDivHeight) + "px";
			div.style.width = String(containRowDivWidth) + "px";
			div.style.left = div.gridLocation.column * (gridSpacing + parseInt(120, 10)) + "px";
			div.style.top = div.gridLocation.row * (gridSpacing + parseInt(60, 10)) + "px";
		}
		else {
			div.style.height = String(courseDivHeight) + "px";
			div.style.width = String(courseDivWidth) + "px";
			div.style.left = div.gridLocation.column * (gridSpacing + parseInt(div.style.width, 10)) + "px";
			div.style.top = div.gridLocation.row * (gridSpacing + parseInt(div.style.height, 10)) + "px";
		}		
	}
}

function mouseoverAction(self) {
	//lightAllWires(self); return;//used with tree-crawling function, lightAllWires()

	lightEntireTree();
	lightWiresFrom(self, colorWireActive, wireThicknessActive);
	lightDivsFrom(self, colorMouseOver);
	if (focusChain.indexOf(self) < 0) {
		if (focusChain.length == 0) {
			self.div.style.backgroundColor = colorMouseOver.first;
		} else {
			self.div.style.backgroundColor = colorMouseOver.base; //set self, if not in chain
		}
	}
	reportExceptions(self);

	$('#courseInfo').show();
	writeInfo(self);    
}

function writeInfo(self) {
	var courseName = document.getElementById("courseName");
	var courseCode = document.getElementById("courseCode");
	var courseDesc = document.getElementById("courseDesc");

	courseName.innerHTML = self.name;
	courseCode.innerHTML = "(" + self.label + ")" + "  Terms Offered: " + self.trimester + "<br>" + self.forms;
	courseDesc.innerHTML = self.description;
}

//writes the current focus chain to the available blocks at the bottom of the page
function writeSequence() { 
	var blocks = document.querySelectorAll('div.selectBlock');
	var startAtNum;
	var count = 0;
	switch(userChoice) {
		case 2:
			startAtNum = 0;
			break;
		case 3:
			startAtNum = 3;
			break;
		case 4:
			startAtNum = 6;
			break;
		case 5:
			startAtNum = 9;
			break;
	}
	for (var i = startAtNum; i < 12; i++) {
			blocks[i].innerHTML = "";
	}
	for (var i = startAtNum; i < i + focusChain.length; i++) {
	 	 	blocks[i].innerHTML = focusChain[count].code;
	 	 	count ++;
	}
}

//this function should eventually reside in courses.js
function generatePrerequisites() {
	for (var i = 0; i < courseData.length; i++) { //focus on each course
		var course = courseData[i];
		course.prereq = [];
		for (var j = 0; j < courseData.length; j++) { //seek focus in other courses' options
			if (courseData[j].options.indexOf(course.code) > -1) {
				course.prereq.push(courseData[j].code);
			}
		}
		if (course.isContainerCourse || false) {
			if (course.code == "MAELECTIVES") {
				course.prereqText = function (focus) {
					return focus.name + " ("+focus.code+")" + " requires completion of Math&nbsp;3 or higher.";
				}
			} else if (course.code == "MASEMINARS") {
				course.prereqExtra = ["MA504", "MA521", "MA530"];
				course.prereqText = function (focus) {
					return focus.name + " ("+focus.code+")" + " requires completion of a calculus course and one other 500&nbsp;level, year-long mathematics course.";
				}
			} else if (course.code == "MASENIORS_FROM_MATH3") {
				course.prereqWarn = ["MA301"];
				course.prereqText = function (focus) {
					return "Only Fifth Formers may take " + focus.name + " ("+focus.code+")" + " using Math 3 as a prerequisite.";
				}
			} else {
				course.prereqText = function (focus) {
					return focus.name + " ("+focus.code+")" + " requires additional prerequisites. See course description for details.";
				}
			}
		} else {
			course.prereqText = function (focus) { //for courses w/no shell, submit focusChain[0]
				if (focus == undefined) {
					return "Please select the course you are currently taking or the one that is closest in content to your current math course.";
				} else {
					return "Mouse over a course to see its description and the course options that follow it. Click on a course to add it to your sequence; click on it again to deselect it.";
				}
			}
		}
	}
}
function reportExceptions(focus) {
	var chain = focusChain;
	if (focus.shell == "") {
		issueInstruction(focus.prereqText(chain[0]));
	} else {
		var shell = course[focus.shell];
		var hasPrereq = (shell.prereq.length == 0);
		var hasPrereqExtra = (shell.prereqExtra.length == 0); 
		var hasPrereqWarn = (shell.prereqWarn.length == 0);
		for (var i in chain) {
			if (shell.prereq.indexOf(chain[i].code) > -1) {
				hasPrereq = true; 
			} else if (shell.prereqExtra.indexOf(chain[i].code) > -1) {
				hasPrereqExtra = true;
			}
			//if (shell.prereqWarn.indexOf(chain[i].code) > -1) { //change this to only check final element
			if (shell.prereqWarn.indexOf(chain[chain.length-1].code) > -1) {
				hasPrereqWarn = true;
			}
		}
		//console.log(hasPrereq+":"+hasPrereqExtra+":"+hasPrereqWarn);
		if (hasPrereq && hasPrereqExtra && (!hasPrereqWarn || shell.prereqWarn.length == 0)) {
			issueInstruction(focus.prereqText(chain[0]));
			//
		} else {
			issueWarning(shell.prereqText(focus));
		}
	}
}
// function reportExceptions(self) {
// 	if (self != undefined) {
// 		if (focusChain.length > 0 && focusChain[focusChain.length-1].code == "MA301" 
// 			&& ["MA411", "MA431", "MA511", "MA555"].indexOf(self.code) > -1) {
// 			issueWarning("Only Fifth Formers may take " + self.name + " ("+self.code+")" + " using Math 3 as a prerequisite.");
// 		} else if (isElective(self)) {
// 			var shell = course[self.shell];
// 			if (!isElectiveValid(self)) {
// 				if (shell.code == "MAELECTIVES") {
// 		 			issueWarning(self.name + " ("+self.code+")" + " requires completion of Math&nbsp;3 or higher.");
// 				} else if (shell.code == "MASEMINARS") {
// 			 		issueWarning(self.name + " ("+self.code+")" + " requires completion of a calculus course and one other 500&nbsp;level, year-long mathematics course.");
// 				} else {
// 		 			issueWarning(self.name + " ("+self.code+")" + " requires additional prerequisites. See course description for details.");
// 				}
// 			}
// 		} 
// 	} else if (focusChain.length == 0) {
// 		issueInstruction("Please select the course you are currently taking or the one that is closest in content to your current math course.");		
// 	} else {
// 		issueInstruction("Mouse over a course to see its description and the course options that follow it. Click on a course to add it to your sequence; click on it again to deselect it.");
// 	}
// }

function issueWarning(warningText) {
	$('#instructionBody').removeClass('instruction').addClass('warning').html(warningText);
	$('#instructionHead').removeClass('instruction').addClass('warning').html('WARNING');
}
function issueInstruction(instructionText) {
	$('#instructionBody').removeClass('warning').addClass('instruction').html(instructionText);
	$('#instructionHead').removeClass('warning').addClass('instruction').html('Instructions');
}

function isElectiveValid(elective) {
	var shell = course[elective.shell];
	isValidElective = false;
	for (var a in focusChain) { 
		if (focusChain[a].options.indexOf(shell.code) > -1) isValidElective = true; //check if shell is option of ANY course in chain
		if (focusChain[a].options.indexOf(elective.code) > -1) isValidElective = true; //used when shell has no prerequisites
	}
	if (shell.code == "MAELECTIVES") {
		return isValidElective;
	} else if (shell.code == "MASEMINARS") { 
		var isValidSeminar = false;
		for (var b in focusChain) {
			//check whether focusChain also includes a calculus course
			if (["MA504", "MA521", "MA530"].indexOf(focusChain[b].code) > -1) isValidSeminar = true;
		}
		return (isValidElective && isValidSeminar);
	}
	return isValidElective; //useful for shell type not addressed specifially above
}

function buildChainElectives(self) {
	var chain = focusChainElectives;
	var chainLink = chain.indexOf(self);
	var chainLength = chain.length;
	if (chainLink < 0) { //if self is not in chain
		if (isOptionValid(self, self)) {
			chain.push(self); //add link to chain
		}
	} else {
		chain.splice(chain.indexOf(self), 1); //elective might not be last
	}
}
function cleanUpElectives() {
	var newArray = [];
	for (var a in focusChainElectives) {
		var exception = focusChainElectives[a];
		var isInChain = false;
		var shell = course[exception.shell];
		for (var b in focusChain) {
			//check whether the shell course prerequisites are present
			if (focusChain[b].options.indexOf(shell.code) > -1) {
				isInChain = true;
			}
		}
		if (isInChain) newArray[a] = exception;
	}
	focusChainElectives = newArray;
}

function buildChain(self) {
	var chain = focusChain;
	var chainLink = chain.indexOf(self);
	var chainLength = chain.length;
	if (chainLink < 0) { //if self is not in chain
		if (chainLength === 0 || isOptionValid(chain[chainLength - 1], self)) {
			chain.push(self); //add link to chain
		}
	} else {
		chain.length = chainLink; //remove clicked link and all downstream links
		cleanUpElectives();
	}
	console.log("focusChain: " + chain.map(function(obj) {return obj.name}));
}

function isOptionValid(focus, option) {
	var validity = (focus.options.indexOf(option.code) > -1);
	if (isElective(option)) {
		validity = isElectiveValid(option);
	}
	return validity;
}

function isElective(elective) {
	if (elective.shell != "" && course[elective.shell].prereq.length > 0) {
		return true;
	} else {
		return false;
	}
}

//show all options available from self
function lightDivsFrom(self, color) {
	var color;
	for (var a in self.options) {
		var thisOption = course[self.options[a]];
		if (focusChain.indexOf(thisOption) < 0) {
			thisOption.div.style.background = color.option;
		}
	}
}

function lightDivChain() {
	//reset EVERY div
	for (var a in course) {
		course[a].div.style.backgroundColor = colorMouseOut.base;
	}
	//set first div in chain
	if (focusChain.length > 0) {
		focusChain[0].div.style.backgroundColor = colorMouseClick.first;	
	}
	//set focusChain divs (possibly update self)
	for (var b = 1; b < focusChain.length; b++) {
		focusChain[b].div.style.background = colorMouseClick.base;
	}
	//set focusChainElectives divs (possibly update self)
	for (var c in focusChainElectives) {
		focusChainElectives[c].div.style.background = colorMouseClick.base;
	}
	//set options from last link in chain
	if (isChainOn() == true) {
		var lastLink = focusChain[focusChain.length-1];
		lightDivsFrom(lastLink, colorMouseClick);
	}
	var shell = course["MAELECTIVES"];	//***hard-coded: YUCK!!!***
	if (isOptionValid(shell, shell)) {
		shell.div.style.background = colorMouseClick.option;
	}
}

function lightWireBetween(wireFrom, wireTo, color, thickness) {
	if (wireTo.code == "MAELECTIVES") return; //***hard-coded: YUCK!!!***
	ctx.strokeStyle = color.base;
	ctx.fillStyle = color.base;
	ctx.lineWidth = thickness.base;
	var isSeniorOption = (wireFrom.optionsSeniorsOnly.indexOf(wireTo.code) > -1);
	if (isSeniorOption) {
		ctx.strokeStyle = color.seniors;
		ctx.fillStyle = color.seniors;
		ctx.lineWidth = thickness.seniors;
	}
	var wireLength = gridSpacing / 4;
	var arrowSize = wireLength * 0.7;
	var boxWidthFrom = parseInt(wireFrom.div.style.width, 10) + margin * 2 + padding * 2;
	var boxHeightFrom = parseInt(wireFrom.div.style.height, 10) + margin * 2 + padding * 2;
	var boxWidthTo = parseInt(wireTo.div.style.width, 10) + margin * 2 + padding * 2;
	var boxHeightTo = parseInt(wireTo.div.style.height, 10) + margin * 2 + padding * 2;
	//default assumes horizontal flow
	var wireFromX = parseInt(wireFrom.div.style.left, 10) + boxWidthFrom - margin;
	var wireFromY = parseInt(wireFrom.div.style.top, 10) + boxHeightFrom / 2;
	var wireToX = parseInt(wireTo.div.style.left, 10) + margin;
	var wireToY = parseInt(wireTo.div.style.top, 10) + boxHeightTo / 2;
	//check for vertical flow
	var isVerticalWire = (wireFrom.gridLocation.column >= wireTo.gridLocation.column);
	if (isVerticalWire) {
		wireFromX = parseInt(wireFrom.div.style.left, 10) + boxWidthFrom / 2;
		wireFromY = parseInt(wireFrom.div.style.top, 10) + boxHeightFrom - margin;
		wireToX = parseInt(wireTo.div.style.left, 10) + boxWidthTo / 2;
		wireToY = parseInt(wireTo.div.style.top, 10) + margin;
		if (wireFrom.gridLocation.row < wireTo.gridLocation.row) {
			//pointing down (default)
			wireFromX = parseInt(wireFrom.div.style.left, 10) + boxWidthFrom / 2;
			wireFromY = parseInt(wireFrom.div.style.top, 10) + boxHeightFrom - margin;
			wireToX = parseInt(wireTo.div.style.left, 10) + boxWidthTo / 2;
			wireToY = parseInt(wireTo.div.style.top, 10) + margin;
		} else {
			//pointing up
			wireFromX = parseInt(wireFrom.div.style.left, 10) + boxWidthFrom / 2;
			wireFromY = parseInt(wireFrom.div.style.top, 10) + margin;
			wireToX = parseInt(wireTo.div.style.left, 10) + boxWidthTo / 2;
			wireToY = parseInt(wireTo.div.style.top, 10) + boxHeightTo - margin;        
		}
		wireLength = 0; //remove stem
	}
	//draw wire path
	ctx.beginPath();
	ctx.moveTo(wireFromX, wireFromY);
	ctx.lineTo(wireFromX + wireLength, wireFromY); //stem
	ctx.lineTo(wireToX - wireLength, wireToY);
	ctx.lineTo(wireToX, wireToY); //stem
	ctx.stroke();
	//draw arrow head
	ctx.beginPath();
	ctx.moveTo(wireToX, wireToY);
	if (!isVerticalWire) {
		ctx.lineTo(wireToX - arrowSize, wireToY - arrowSize / 2);
		ctx.lineTo(wireToX - arrowSize, wireToY + arrowSize / 2);
	} else {
		if (wireFrom.gridLocation.row < wireTo.gridLocation.row) {
			//arrow pointing down
			ctx.lineTo(wireToX - arrowSize / 2, wireToY - arrowSize);
			ctx.lineTo(wireToX + arrowSize / 2, wireToY - arrowSize);
		} else {
			//arrow point up
			ctx.lineTo(wireToX - arrowSize / 2, wireToY + arrowSize);
			ctx.lineTo(wireToX + arrowSize / 2, wireToY + arrowSize);
		}
	}
	ctx.fill();
}

function lightWiresFrom(wireFrom, color, thickness) {
	for (var i in wireFrom.options) {
		var wireTo = course[wireFrom.options[i]];
		lightWireBetween(wireFrom, wireTo, color, thickness);
	}
}

function lightAllWires(wireFrom) {
	if (wireFrom.lit) return;
	wireFrom.lit = true;
	for (var i in wireFrom.options) {
		lightWireBetween(wireFrom, course[wireFrom.options[i]], colorWireTest, wireThicknessTest); //replace this line as desired
		lightAllWires(course[wireFrom.options[i]]);
		//course[wireFrom.options[i]].lit = true;
	}
}
function clearAllWires() {
	for (var i in course) {
		course[i].lit = false;
	}
}

function lightWireChain(chain, color, thickness) {
	//draw chain up to final link
	if (chain.length > 1) {
		for (var i = 0; i < chain.length - 1; i++) {
			lightWireBetween(chain[i], chain[i + 1], color, thickness);
		}
	}
	//show options from final link
	if (chain.length > 0) {
		lightWiresFrom(chain[chain.length - 1], colorWireActive, wireThicknessActive);
	}
}

function lightEntireTree() {
	canvas.width = canvas.width; //clear canvas
	for (var j in course) {
		var wireFrom = course[j];
		for (var i in wireFrom.options) {
			var wireTo = course[wireFrom.options[i]];
			lightWireBetween(wireFrom, wireTo, colorWirePassive, wireThicknessPassive);
		}
	}
	lightWireChain(focusChain, colorWireActive, wireThicknessActive);
}