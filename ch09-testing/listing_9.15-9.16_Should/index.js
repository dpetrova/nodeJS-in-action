/*  Splitting a bill amound friends calculator */

//increases each number in array by a given percentage
exports.addPercentageToEach = (prices, percentage) => {
  return prices.map((total) => {
    total = parseFloat(total);
    return total + (total * percentage);
  });
};

//calculates the sum of array elements
exports.sum = (prices) => {
  return prices.reduce((currentSum, currentValue) => {
    return parseFloat(currentSum) + parseFloat(currentValue);
  });
};

//formats a percentage for display
exports.percentFormat = (percentage) => {
  return parseFloat(percentage) * 100 + '%';
};

//formats dollar value for display
exports.dollarFormat = (number) => {
  return `$${parseFloat(number).toFixed(2)}`;
};
