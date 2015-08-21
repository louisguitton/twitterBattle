// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1468594523444290', // app ID
        'clientSecret'  : '05c5b9e0fc15389881fe0f77509aeef7', // app Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'gYfmcYGg39zFKlrO3ecupDHL6',
        'consumerSecret'    : 'uTo7lAmT1hAypwJVvYTVzVJXwAXgftwvUUwCTNSggSD25fja3u',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '137503365573-e42m6vh3i6u4gh8ocb6o7d75f20r0mta.apps.googleusercontent.com',
        'clientSecret'  : '9PD902Q_KOp6_-w9aG0_WPXl',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};