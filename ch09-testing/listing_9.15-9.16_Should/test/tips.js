const tips = require('..');
const should = require('should');

//defines tax and tip rates
const tax = 0.12;
const tip = 0.15;
//defines bill items to test
const prices = [10, 20];

//add tax and tip to each bill of array
const pricesWithTipAndTax = tips.addPercentageToEach(prices, tip + tax);
//test tax and tip addition
pricesWithTipAndTax[0].should.equal(12.7);
pricesWithTipAndTax[1].should.equal(25.4);

//calculate total sum of bills
const totalAmount = tips.sum(pricesWithTipAndTax).toFixed(2);
//test bill totaling
totalAmount.should.equal('38.10');

//format total amount to display in dollars
const totalAmountAsCurrency = tips.dollarFormat(totalAmount);
//test dollar format
totalAmountAsCurrency.should.equal('$38.10');

//format tip to display in percents
const tipAsPercent = tips.percentFormat(tip);
//test percent format
tipAsPercent.should.equal('15%');
