function g(a){return document.getElementById(a)}
function arrayRemove(n,h){if(inArray(n,h))h.splice(h.indexOf(n),1)}
function inArray(n,h){return!!~h.indexOf(n)}
function isArray(a){return Object.prototype.toString.call(a)==='[object Array]'}
function make(desc) {
	if (!isArray(desc))return make.call(this, Array.prototype.slice.call(arguments));
	var name = desc[0], attributes = desc[1], el = document.createElement(name), start = 1;
	if (typeof attributes === 'object' && attributes !== null && !isArray(attributes)) {
		for (var attr in attributes) {
			if(attr.indexOf('data-')==0)el.dataset[attr.substr(5)]=attributes[attr];
			else if(attr=='addEventListener'){
				for(var i=0;i<attributes[attr].length/2;i++)
				if(isArray(attributes[attr][i*2]))for(var j=0;j<attributes[attr][i*2].length;j++)el[attr](attributes[attr][i*2][j],attributes[attr][i*2+1],false);
				else el[attr](attributes[attr][i*2],attributes[attr][i*2+1],false);
			}else if(attr=='elementReference'){
				attributes[attr][0][attributes[attr][1]]=el
			}else if(attr=='elementReference2'){
				(function(a){
					console.log(attributes[attr][1]);
					console.log(eval(attributes[attr][1]));
					console.log(el);
					eval(attributes[attr][1]+'=el')
				}).apply(attributes[attr][0])
			}else if(attr=='style'){
				for(var i in attributes[attr])if(attributes[attr].hasOwnProperty(i))el.style[i]=attributes[attr][i];
			}
			else el[attr] = attributes[attr];
		}
		start = 2;
	}
	for (var i = start; i < desc.length; i++) {
		if (isArray(desc[i])){
			(function recur(d){
				if (isArray(d[0]))for (var i = 0; i < d.length; i++)recur(d[i]);
				else el.appendChild(make(d));
			})(desc[i]);
		}else{
			if(typeof desc[i] == 'number')el.appendChild(document.createTextNode(desc[i]));
			else if(desc[i]){
				var j, lines=desc[i].split('\n');
				el.appendChild(document.createTextNode(lines[0]));
				if(lines.length>1){
					for (j = 1; j < lines.length; j++){
						el.appendChild((document.createElement('br')));
						el.appendChild(document.createTextNode(lines[j]));
					}
				}
			}
		}
	}
	return el;
}
function empty(a){while(a.firstChild)a.removeChild(a.firstChild);};
