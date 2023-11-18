function getCurrentDateString() {
    var currentDate = new Date(+new Date()+8*3600*1000);
    var currentDateString = currentDate.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return currentDateString;
}

module.exports = {
    getCurrentDateString
};