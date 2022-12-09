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

        ///api/v4/meme/saved/:userid/:numbermemes/:sortorder/:firstmemeid

        let response = await axios.get('http://localhost:3001/api/v4/user/John');
        let user = response.data.user;

        let url = 'http://localhost:3001/api/v4/meme/saved/' + user.id + '/6/NEWEST/NONE';
        let savedMeme = await axios.get(url);
        let memes = savedMeme.data.memes;
        let hasMore = savedMeme.data.hasMore;
        console.log(memes);
        console.log(hasMore);
        console.log('\n\n');

        /*
        url = 'http://localhost:3001/api/v4/meme/saved/' + user.id + '/2/NEWEST/NONE';
        savedMeme = await axios.get(url);
        memes = savedMeme.data;
        console.log(memes);
        console.log('\n\n');
        url = 'http://localhost:3001/api/v4/meme/saved/' + user.id + '/2/NEWEST/' + memes[(memes.length - 1)].id;
        savedMeme = await axios.get(url);
        console.log(savedMeme.data);
        console.log('\n\n');
        memes = savedMeme.data;
        url = 'http://localhost:3001/api/v4/meme/saved/' + user.id + '/2/NEWEST/' + memes[(memes.length - 1)].id;
        savedMeme = await axios.get(url);
        console.log(savedMeme.data);
        memes = savedMeme.data;
        url = 'http://localhost:3001/api/v4/meme/saved/' + user.id + '/2/NEWEST/' + memes[(memes.length - 1)].id;
        savedMeme = await axios.get(url);
        console.log(savedMeme.data);
        //console.log(savedMeme.data);*/
        
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