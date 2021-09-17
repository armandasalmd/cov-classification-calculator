const globalUtils = {
  deepClone: function (object) {
    if (typeof object === "object") {
      return JSON.parse(JSON.stringify(object));
    } else {
      return object;
    }
  },
  roundFloat: function (value, decimals) {
    return parseFloat(value.toFixed(decimals));
  },
  sum: function (numbers, key = null) {
    if (key === null) {
      return numbers.reduce(function (total, item) {
        return total + item;
      }, 0);
    } else {
      return numbers.reduce(function (total, item) {
        return total + item[key];
      }, 0);
    }
  },
};

export default globalUtils;
