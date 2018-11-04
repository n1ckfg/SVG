// create multiple canvases
let views = [
	SVG.View(window.innerWidth, window.innerHeight / 3),
	SVG.View(window.innerWidth, window.innerHeight / 3),
	SVG.View(window.innerWidth, window.innerHeight / 3)
];
let colors = ["#F80", "#9CF", "#5C3"];

views.forEach((view, i) => {
	view.drawingLayer = SVG.group(undefined, "drawing");
	view.svg.appendChild(view.drawingLayer);

	view.onMouseEnter = function(mouse){
		view.brushPoly = SVG.polygon();
		SVG.setAttribute(view.brushPoly, "style", "stroke:black;fill:" + colors[i]);
		view.drawingLayer.appendChild(view.brushPoly);
		view.points = [];
		view.prev = mouse;
	}

	view.onMouseMove = function(mouse){
		let vector = [mouse.x - view.prev.x, mouse.y - view.prev.y];
		var sideA = [mouse.x + -vector[1]*1, mouse.y + vector[0]*1];
		var sideB = [mouse.x + vector[1]*1, mouse.y + -vector[0]*1];

		view.points.unshift(sideA);
		view.points.push(sideB);
		SVG.setPoints(view.brushPoly, view.points);

		view.prev = mouse;
	}
})