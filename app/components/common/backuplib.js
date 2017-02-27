module.exports = {
	serverUrl: 'http://localhost:8080/',
	feedbackDuration: 5000,
	assetRoot: '/dist/assets/',
	feedbackMesg: function (comp, type, mesg) {
		
		comp.setState ({
			feedback: {
				type: type,
				message: mesg
			}
		});
		window.setTimeout(function(){
			comp.setState ({
				feedback: {
					type: `${type} faded`,
					message: mesg
				}
			});
		}, 10 );

		window.setTimeout(function(){
			comp.setState ({
				feedback: null
			});
		}, this.feedbackDuration );
	},
	feedbackMesgObject: function (comp, type, mesg, key, obj) {
		var newState = {};
		obj.feedback = {
			type: type,
			message: mesg
		};
		newState[key] = comp.state[key];
		comp.setState (newState);

		window.setTimeout(function(){
			newState = {};
			obj.feedback = {
				type:  `${type} faded`,
				message: mesg
			};
			newState[key] = comp.state[key];
			
		}, 10 );

		window.setTimeout(function(){
			newState = {};
			obj.feedback = null;
			comp.setState(newState);
		}, this.feedbackDuration );
	},

	splitFilePath: function(filePath) {
		filePath = filePath || '';
		filePath = filePath.replace('\\','/');
		filePath = filePath.replace('/', '');
		if (filePath) {
			var fileNames = filePath.split('/');
			var fileName = fileNames.splice(fileNames.length - 1, 1)[0];
			var relativePath = fileNames.join('/') ;
		}
		return {
			fileName: fileName || '',
			relativePath: relativePath || ''
		};
	},

	removeAppName: function(filePath){
		var i,count = 0,index = -1;
		for(i=0; i< filePath.length; i++){
			if(filePath[i]=="/"){
					count++;
					if(count == 2){
						index = i;
					}
			}
		}
		if(index == -1 || count == 1){
			return '';
		}
		else if(count > 1){
			filePath = filePath.substring(index,filePath.length);
			return `${filePath}`;
		}

	},

	removeAppName2: function(filePath){
		// filePath = filePath.replace('\\','/')
		var i,count = 0,index = -1;
		for(i=0; i< filePath.length; i++){
			if(filePath[i]=="/"){
					count++;
					if(count == 1){
						index = i;
					}
			}
		}
		if(index == -1 || index == 0){
			return '';
		}
		else if(count > 0){
			// console.log(index);
			filePath = filePath.substring(index,filePath.length);
			return `${filePath}`;
		}

	},

	getName: function(filePath){
		console.log(filePath);
		// extract cffiddle basepath, then application id, then filePath
		filePath = filePath.replace('/','\\');
		var file
		if (filePath) {
			var fileNames = filePath.split('\\');
			return fileNames[fileNames.length-1];
		}

	}
	,
	getPath: function(path, appid, getEntirePath){
		path = path.replace('/','\\');
		var fileNames = path.split('\\');
		var index = -1;
		for(var i=0; i < fileNames.length; i++){
			if(fileNames[i] == appid){
				index = i;
			}
		}
		if(getEntirePath == true){
			var sliced = fileNames.slice(index+1,fileNames.length);
			return sliced.join('/');
		}
		else{
			var sliced = fileNames.slice(index+1,fileNames.length - 1);
			if(sliced.length == 0){
				return '';
			}
			else{
				return sliced.join('/');
			}
		}
	}
};