const globalUtils = {
	deepClone: function(object) {
		if (typeof object === "object") {
			return JSON.parse(JSON.stringify(object));
		} else {
			return object;
		}
	}
};

export default globalUtils;