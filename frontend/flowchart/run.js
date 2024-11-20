let adjacencyList = [];
function prep(){
	for(let i=0; i<=properties.length; i++) {
		adjacencyList.push([]);
	}
	for(let [key, value] of connections) {
		
		for(let i of value){
			adjacencyList[key].push(i);
		}
	}
	let json = {
		properties: properties,
		adjacencyList: adjacencyList,
	};
	send(json)
}
function send(json){
	fetch('http://127.0.0.1:5000/api/data', {
	    method: 'POST',  // Use POST method
	    headers: {
	        'Content-Type': 'application/json'  // Specify content type
	    },
	    body: JSON.stringify(json)  // Convert the object to a JSON string
	})
	.then(response => {
		return response.json();
	})
}