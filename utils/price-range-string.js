module.exports = {
  getPriceRangeString: function(priceParameter) {
    let priceString = "";
    switch (parseInt(priceParameter)) {
      case 0:
        priceString = "Free Events";
        break;
      case 1:
        priceString = "Events Less Than $10";
        break;
      case 2:
        priceString = "Events $10 and Up";
        break;
      case 3:
        priceString = "Events $100 and Up";
        break;
    }
    return priceString;
  }
}
