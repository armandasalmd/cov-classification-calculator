const SAVE_KEY_PREFIX = "saved-";

const saveUtils = (function(){
	function _getSaveKey(courseKey) {
		return SAVE_KEY_PREFIX + courseKey;
	}

	return {
		save: function (stateObj, courseKey) {
			localStorage.setItem(_getSaveKey(courseKey), JSON.stringify(stateObj));
		},
		load: function (courseKey) {
			return JSON.parse(localStorage.getItem(_getSaveKey(courseKey)));
		}
	};
})();

export default saveUtils;