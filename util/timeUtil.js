function getCurrentDateString() {
    var currentDate = new Date(+new Date()+8*3600*1000);
    currentDate = currentDate.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return currentDate;
}

module.exports = {
    getCurrentDateString
};