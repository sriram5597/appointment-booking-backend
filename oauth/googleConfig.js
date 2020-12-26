const { google } = require('googleapis');

const config = {
    client_id: '147751649402-16cobugjq44356oco95buekita193h4g.apps.googleusercontent.com',
    project_id: 'appointment-booking-298309',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'O9K0uUE5oveWPmby_wJhfvU4',
    redirect_uris: [
        'http://localhost:8080/auth/google/callback',
    ],
    javascript_origins: ['http://localhost:8080'],
};

const oAuthClient = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    config.redirect_uris[0],
);

const getConnectionUrl = (auth) => {
    const defaultScope = [
        'profile',
        'email',
    ];

    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope,
    });
};

exports.getUrl = () => getConnectionUrl(oAuthClient);

const getDetails = (tokens) => {
    oAuthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oAuthClient,
        version: 'v2',
    });

    return new Promise((resolve, reject) => {
        oauth2.userinfo.get((err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res.data);
        });
    });
};

exports.getCredentials = (code) => new Promise((resolve, reject) => {
    oAuthClient.getToken(code, async (err, tokens) => {
        if (err) {
            reject(err);
        }

        try {
            const details = await getDetails(tokens);

            resolve({
                details,
                tokens,
            });
        } catch (e) {
            reject(e);
        }
    });
});
