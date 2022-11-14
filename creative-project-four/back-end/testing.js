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
        let response = await axios.get('http://localhost:3001/api/v4/user/sally');
        console.log("Success");
        console.log(response.data);

        let tryingMeme = await axios.get('http://localhost:3001/api/v4/meme/random');
        console.log("Worked again.");
        console.log(tryingMeme.data);

        let url = 'http://localhost:3001/api/v4/meme/saved/' + tryingMeme.data.id + '/' + response.data.user.id;
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