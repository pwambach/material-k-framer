var fullWidth = window.innerWidth + 1,
	fullHeight = window.innerHeight,
	COLOR_BLUE = '#2B8AE0',
	COLOR_LIGHTGRAY = '#f8f8f8',
	COLOR_GRAY = '#999',
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


var scrollLayer = new Layer({
	x: 0,
	y: 0,
	width: fullWidth,
	height: fullHeight,
	backgroundColor: '#eee'
});
scrollLayer.scroll = true;
headerLayer.placeBefore(scrollLayer);


//generate listLayers
for(var i = 0; i < 9; i++){
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
			y: 80 + (i * 115),
			x: 20,
			width: fullWidth - 40,
			height: 100,
			opacity: 1
		},
		big: {
			height: 140,
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
			height: 140,
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
	listSubLayerText.html = Math.floor((Math.random() * 100) + 80) + ' x';
	listSubLayerText.style = {
		'padding-left': '140px',
		'font-size': '50px',
		'padding-top': '35px',
		'padding-right': '60px',
		'color': '#cdcdcd',
		'text-align': 'right',
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

	scrollLayer.addSubLayer(listLayer);
	listLayers.push(listLayer);
};



var fab = new Layer({
	x: fullWidth + 6,
	y: 100,
	width: FAB_SIZE,
	height: FAB_SIZE,
	rotationZ: 160,
});
fab.style = {
	'border-radius': FAB_SIZE/2 + 'px',
	'background-color': COLOR_GREEN,
	'text-align': 'center',
	'color': '#fff',
	'font-size': '32px',
	'padding-top': '25px',
	'box-shadow': '1px 2px 4px rgba(0,0,0,0.2)'
};
fab.states.add({
	list: {
		rotationZ: 160,
		x: fullWidth + 6
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
fab.html = '<i class="fa fa-check"></i>'


var menuIcon = new Layer({
	width: 30,
	height: 30,
	x: 20,
	y: 13,
	backgroundColor: 'transparent'
});
menuIcon.style = {
	'color': 'white',
	'font-size': '30px',
	'font-weight': 'normal',
	'padding': '1px'
};
menuIcon.html = '<i class="fa fa-bars"></i>';
menuIcon.states.add({
	hidden: {y: -40},
	visible: {y: 13}
});
menuIcon.states.animationOptions = {
	curve: 'spring(100,20,10)'
};

var backIcon = new Layer({
	width: 25,
	height: 25,
	x: 20,
	y: -40,
	opacity: 0,
	backgroundColor: 'transparent'
});
backIcon.style = {
	'color': 'white',
	'font-size': '25px',
	'padding': '1px'
};
backIcon.html = '<i class="fa fa-arrow-left"></i>';
backIcon.states.add({
	hidden: {
		y: -40,
		opacity: 0
	},
	visible: {
		y: 13,
		opacity: 1
	}
});
backIcon.states.animationOptions = {
	curve: 'spring(100,20,10)'
};

var buildBox = function(y, faicon, height){
	var _height = height || 120
	var layer = new Layer({
		width: fullWidth - 40,
		height: _height,
		backgroundColor: 'transparent',
		x: 20,
		y: y,
		opacity: 0
	});
	layer.style = {'border-bottom': '1px solid #ddd'};
	var icon = new Layer({
		width: 50,
		height: 50,
		x: 10,
		y: 37,
		backgroundColor: 'white'
	});
	icon.style = {
		'box-shadow': '1px 2px 4px rgba(0,0,0,0.2)',
		'border-radius': '50%',
		'color': COLOR_GRAY,
		'font-size': '26px',
		'padding': '11px'
	};
	icon.html = '<i class="fa fa-' + faicon + '"></i>';
	layer.addSubLayer(icon);
	layer.states.add({
		hidden: {y: y+80, opacity: 0},
		visible: {y: y, opacity: 1}
	});
	var content = new Layer({
	width: fullWidth - 130,
	height: 120,
	x: 90
	});
	layer.addSubLayer(content);
	return layer;
};

var timeBox = buildBox(180, 'rocket');
timeBox.subLayers[1].html = '- &nbsp;<span style="color: #aaa">123</span>&nbsp; +';
timeBox.subLayers[1].backgroundColor = 'transparent';
timeBox.subLayers[1].style = {
	'text-align': 'center',
	'padding': '46px 0 0 0',
	'font-size': '50px',
	'color': '#cdcdcd'
};

var weightBox = buildBox(300, 'times');
weightBox.subLayers[1].html = '- <span style="color: #aaa">&nbsp;90 s&nbsp;</span> +';
weightBox.subLayers[1].backgroundColor = 'transparent';
weightBox.subLayers[1].style = {
	'text-align': 'center',
	'padding': '46px 0 0 0',
	'font-size': '50px',
	'color': '#cdcdcd'
};

var settingsBox = buildBox(420, 'car', 140);
settingsBox.subLayers[1].html = 'aksdhdakjsdh: <span style="float:right">2</span><br/>jsdkhasd: <span style="float:right">53</span></br>dasdasdhkj: <span style="float:right">10</span></br>kkjjkjsnh: <span style="float:right">2</span>';
settingsBox.subLayers[1].backgroundColor = 'transparent';
settingsBox.subLayers[1].height = 140;
settingsBox.subLayers[1].style = {
	'border-bottom': 'none',
	'color': '#aaa',
	'font-size': '15px',
	'padding': '30px 0 0 0'
}
settingsBox.style = {'border-bottom': 'none'};


var timeBoxAnimationOptionsIn = {
	curve: 'spring(100,20,10)',
	delay: 0.1
};
var weightBoxAnimationOptionsIn = {
	curve: 'spring(100,20,10)',
	delay: 0.15
};
var settingsBoxAnimationOptionsIn = {
	curve: 'spring(100,20,10)',
	delay: 0.2	
}

var timeBoxAnimationOptionsOut = {
	curve: 'linear',
	time: 0
};
var weightBoxAnimationOptionsOut = {
	curve: 'linear',
	time: 0
};
var settingsBoxAnimationOptionsOut = {
	curve: 'linear',
	time: 0
};

weightBox.states.animationOptions = weightBoxAnimationOptionsIn;
timeBox.states.animationOptions = timeBoxAnimationOptionsIn;
settingsBox.states.animationOptions = settingsBoxAnimationOptionsIn;



var handleHeaderDrag = function(){
	if(headerLayer.y < -200){
		headerLayer.states.switch('small');
		headerLayer.draggable.enabled = false;
		headerLayer.off(Events.DragEnd, handleHeaderDrag);
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
}
headerLayer.on(Events.DragEnd, handleHeaderDrag);

var scrollOffset;

listLayers.forEach(function(listLayer){
	listLayer.on('click', function(){

		var state = listLayer.states.current;

		if(state === 'list'){
			headerLayer.states.switch('gone');
			listLayer.states.animationOptions.delay = 0;
			
			scrollOffset = scrollLayer.scrollY;
			scrollLayer.removeSubLayer(listLayer);
			listLayer.y = listLayer.y - scrollOffset;
			
			fab.bringToFront();
			listLayer.states.switch('big');
			hideOtherListLayers(listLayer);	
		}
		if(state === 'big'){
			headerLayer.states.switch('small');
			scrollLayer.addSubLayer(listLayer);
			listLayers.forEach(function(layer){
				layer.states.switch('list');
			});
		}
		
	});
	listLayer.states.on(Events.StateWillSwitch, function(oldState, newState){
		if(newState === 'big'){
			listLayer.subLayers[0].states.switch('big');
			listLayer.subLayers[0].style = {'padding-top': '90px'};
			listLayer.subLayers[1].states.switch('big');
			fab.states.switch('big');
			menuIcon.states.switch('hidden');
			backIcon.states.switch('visible');
			backIcon.bringToFront();

			timeBox.states.switch('visible');
			weightBox.states.switch('visible');
			settingsBox.states.switch('visible');
		}
		if(newState === 'list'){
			listLayer.subLayers[0].states.switch('list');
			listLayer.subLayers[0].style = {'padding-top': '35px'};
			listLayer.subLayers[1].states.switch('list');
			fab.states.switch('list', {curve: 'linear', time: 0.1});
			menuIcon.states.switch('visible');
			backIcon.states.switch('hidden');

			weightBox.states.animationOptions = weightBoxAnimationOptionsOut;
			timeBox.states.animationOptions = timeBoxAnimationOptionsOut;
			settingsBox.states.animationOptions = settingsBoxAnimationOptionsOut;
			timeBox.states.switch('hidden');
			weightBox.states.switch('hidden');
			settingsBox.states.switch('hidden');
			timeBox.states.animationOptions = timeBoxAnimationOptionsIn;
			weightBox.states.animationOptions = weightBoxAnimationOptionsIn;
			settingsBox.states.animationOptions = settingsBoxAnimationOptionsIn;
		}
	});
});


var hideOtherListLayers = function(bigListLayer){
	var origOptions = bigListLayer.states.animationOptions;

	

	listLayers.forEach(function(listLayer){

		if(listLayer !== bigListLayer){
			var origOptions = listLayer.states.animationOptions;
			listLayer.states.animationOptions = {
				curve: 'linear',
				time: 0
			}
			listLayer.states.switch('hidden');
			listLayer.states.animationOptions = origOptions;
		}
	});

};



