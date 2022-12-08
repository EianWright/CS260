const axios = require('axios');

/* const test1 = async () => {
    try {
        let response = await axios.post('http://localhost:3001/api/v4/user/george');
        console.log("Success");
        console.log(response.data);
    }
    catch(err) {
        console.log(err.message);
    }
}

test1();
*/

const test2 = async () => {
    try {
        /*let response = await axios.get('http://localhost:3001/api/v4/user/sally');
        console.log("Success");
        console.log(response.data);*/

        /*let tryingMeme = await axios.get('http://localhost:3001/api/v4/meme/random');
        console.log("Worked again.");
        console.log(tryingMeme.data);*/

        let url = 'http://localhost:3001/api/v4/meme/saved/' + '63717d6b30c36e1aef338265' + '/' + '6379522b01cfa430fa568612';
        console.log(url);
        let savedMeme = await axios.post(url);
        console.log("final worked");
        console.log(savedMeme.data);
        
    }
    catch(err) {
        console.log(err.message);
    }
}

test2();

/*const test3 = async () => {
    try {
        let response = await axios.get('http://localhost:3001/api/v4/user/none');
        console.log(response.data);
    }
    catch(err) {
        console.log("Error");
        console.log(err.message);
    }
}

test3();*/