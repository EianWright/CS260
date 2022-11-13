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
    }
    catch(err) {
        console.log(err.message);
    }
}

test2();

const test3 = async () => {
    try {
        let response = await axios.get('http://localhost:3001/api/v4/user/none');
        console.log(response.data);
    }
    catch(err) {
        console.log("Error");
        console.log(err.message);
    }
}

test3();