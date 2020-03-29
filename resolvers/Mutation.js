require('dotenv').config();
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

const httpsAgent =  { agent: new HttpsProxyAgent(`http://${process.env.HTTP_PROXY}`) };

const requestGithubToken = credentials =>
    fetch(
	'https://github.com/login/oauth/access_token',
	{
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	    },
	    body: JSON.stringify(credentials),
	    ...httpsAgent
	}
    ).then(res => res.json())
     .catch(error => {
	 throw new Error(JSON.stringify(error))
     });


const requestGithubUserAccount = token =>
    fetch(`https://api.github.com/user?access_token=${token}`, httpsAgent)

	.then(res =>  res.json() )
	.catch(error => {
	    throw new Error(JSON.stringify(error))
	});


async function authorizeWithGithub(credentials) {
    const { access_token } = await requestGithubToken(credentials);
    const githubUser = await requestGithubUserAccount(access_token);
    return { ...githubUser, access_token };
}

module.exports = {
    postPhoto(parent, args) {

	var newPhoto = {
	    id: _id++,
	    ...args.input,
	    created: new Date()
	}
	
	photos.push(newPhoto);
	return newPhoto;
    },
    async githubAuth(parent, { code }, { db }) {
	let {
	    message,
	    access_token,
	    avatar_url,
	    login,
	    name
	} = await authorizeWithGithub({
	    client_id: process.env.GITHUB_CLIENT_ID,
	    client_secret: process.env.GITHUB_CLIENT_SECRET,
	    code
	});

	if (message) {
	    throw new Error(message);
	}

	let latestUserInfo = {
	    name,
	    githubLogin: login,
	    githubToken: access_token,
	    avatar: avatar_url
	};

	const { ops:[user] } = await db
	    .collection('users')
	    .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

	return { user, token: access_token };

    }
}
