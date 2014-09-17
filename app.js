var fullWidth = window.innerWidth,
	fullHeight = window.innerHeight,
	COLOR_BLUE = '#29ABE2',
	COLOR_LIGHTGRAY = '#f8f8f8',
	COLOR_GREEN = '#00dc61',
	listLayers = [],
	FAB_SIZE = 80;


//headerLayer
var headerLayer = new Layer({
	x: 0,
	y: 0,
	width: fullWidth,
	height: fullHeight - (fullHeight/5)
});
headerLayer.pixelAlign();
headerLayer.style = {
	'background-color': COLOR_BLUE,
	'box-shadow': '0px 4px 8px rgba(0,0,0,0.2)'
};
headerLayer.states.animationOptions = {
	curve: "spring(300,30,5)"
};

headerLayer.states.add({
	start: {
		y: 0,
		height: fullHeight - (fullHeight/5)
	},
	small: {
		y: 0,
		height: 60
	},
	gone: {
		height: 0
	}
});
headerLayer.draggable.enabled = true;
headerLayer.draggable.speedX = 0;


//generate listLayers
for(var i = 0; i < 5; i++){
	var listLayer = new Layer({
		x: 20,
		y: 800,
		width: fullWidth - 40,
		height: 100
	});
	listLayer.style = {
		'background-color': COLOR_LIGHTGRAY,
		'box-shadow': '1px 2px 8px rgba(0,0,0,0.2)'
	};
	listLayer.states.add({
		list: {
			y: 80 + (i * 110),
			x: 20,
			width: fullWidth - 40,
			height: 100,
			opacity: 1
		},
		big: {
			height: 160,
			width: fullWidth,
			y: 0,
			x: 0,
			opacity: 1
		},
		hidden: {
			opacity: 0
		}
	});

	var listSubLayer = new Layer({
		x: 0,
		y: 0,
		width: 100,
		height: 100
	});
	listSubLayer.states.add({
		big: {
			height: 160,
			width: fullWidth,
			y: 0,
			x: 0
		},
		list: {
			x: 0,
			y: 0,
			width: 100,
			height: 100
		}
	}),
	listSubLayer.html = 'A' + (i+1);
	listSubLayer.style = {
		'color': 'white',
		'background-color': COLOR_BLUE,
		'font-size': '50px',
		'text-align': 'left',
		'padding-left': '20px',
		'padding-top': '35px'
	};

	var listSubLayerText = new Layer({
		width: fullWidth - 40,
		height: 100
	});
	listSubLayerText.html = Math.floor((Math.random() * 100) + 80) + ' kg';
	listSubLayerText.style = {
		'padding-left': '140px',
		'font-size': '50px',
		'padding-top': '35px',
		'color': '#cdcdcd',
		'text-align': 'left',
		'font-weight': 'bold',
		'background-color': 'transparent'

	};
	listSubLayerText.states.add({
		list: {
			opacity: 1
		},
		big: {
			opacity: 0
		}
	});
	listSubLayerText.states.animationOptions = listSubLayer.states.animationOptions = {
		curve: 'linear',
		time: 0
	};

	listLayer.states.animationOptions = listSubLayer.states.animationOptions = {
		curve: 'spring(130,20,10)',
		delay: i * 0.1
	};

	
	listLayer.addSubLayer(listSubLayer);
	listLayer.addSubLayer(listSubLayerText);

	listSubLayer.placeBefore(listLayer);
	listSubLayerText.placeBefore(listLayer);

	listLayers.push(listLayer);
};



var fab = new Layer({
	x: fullWidth,
	y: 120,
	width: FAB_SIZE,
	height: FAB_SIZE,
	rotationZ: 160,
});
fab.style = {
	'border-radius': FAB_SIZE/2 + 'px',
	'background-color': COLOR_GREEN,
	'text-align': 'center',
	'color': '#fff',
	'padding-top': '25px',
	'box-shadow': '1px 2px 4px rgba(0,0,0,0.2)'
};
fab.states.add({
	list: {
		rotationZ: 160,
		x: fullWidth
	},
	big: {
		rotationZ: 0,
		x: fullWidth - 110
	}
});
fab.states.animationOptions = {
	curve: 'spring(170,20,10)',
	delay: 0.15
};
fab.html = 'A'






headerLayer.on(Events.DragEnd, function() {
	if(headerLayer.y < -200){
		headerLayer.states.switch('small');
		headerLayer.draggable.enabled = false;
		listLayers.forEach(function(listLayer, index){
			listLayer.states.switch('list');
			if(index > 0){
				listLayer.states.animationOptions.delay = 0;
				listLayer.subLayers[0].states.animationOptions.delay = 0;
			}
			
		});
	} else {
		headerLayer.states.switch('start');
	}
});


listLayers.forEach(function(listLayer){
	listLayer.on(Events.Click, function(){

		var state = listLayer.states.current;

		if(state === 'list'){
			headerLayer.states.switch('gone');
			listLayer.states.animationOptions.delay = 0;
			listLayer.states.switch('big');
			hideOtherListLayers(listLayer);	
		}
		if(state === 'big'){
			headerLayer.states.switch('small');
			listLayers.forEach(function(layer){
				layer.states.switch('list');
			});
		}
		
	});
	listLayer.states.on(Events.StateWillSwitch, function(oldState, newState){
		if(newState === 'big'){
			listLayer.subLayers[0].states.switch('big');
			listLayer.subLayers[1].states.switch('big');
			fab.states.switch('big');
		}
		if(newState === 'list'){
			listLayer.subLayers[0].states.switch('list');
			listLayer.subLayers[1].states.switch('list');
			fab.states.switch('list', {curve: 'linear', time: 0.1});
		}
	});
});


var hideOtherListLayers = function(bigListLayer){
	listLayers.forEach(function(listLayer){
		if(listLayer !== bigListLayer){
			listLayer.states.switch('hidden');
		}
	});
};



