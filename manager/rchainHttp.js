// fetch('http://localhost:40413/api/blocks')	
//   .then(response => response.json())
//   .then(data => console.log(data));

// var depth = 3;
// fetch(`http://localhost:40413/api/blocks/${depth}`)	
//   .then(response => response.json())
//   .then(data => console.log(data));

async function postData(httpUrl, data) {
    var res = await fetch(httpUrl, {
        method: 'POST',
        body: data
    });
    var resData = await res.json();
    return new Promise((resolve) => {
        resolve(resData);
    });
}

async function exploreDeploy(readOnlyHost, port, term) {
    // input: `localhost`, 40413`, `new return in {return!(1+1)}`
    // output: response data as a map
    const httpUrl = `http://` + readOnlyHost + `:${port}/api/explore-deploy`;
    var resData = await postData(httpUrl, term);
    // console.log(resData);
    return new Promise((resolve) => {
        resolve(resData);
    })
}

module.exports = {
    exploreDeploy
}