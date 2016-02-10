module.exports = function( b9 ){

  // define public property
  b9.users = [];

  // define public method
  b9.user = function( key ){
    var found;
    b9.users.every(function( user ){
      if ( user.id === key || user.name === key ){
        found = user;
      }
      return !found;
    });
    return found;
  };

  // initialize the users list
  b9.on('rtm.start', function( arg ){
    b9.users = arg.users;
  });

  // update the users list
  // https://api.slack.com/events/user_change
  b9.on('user_change',function( msg ){
    b9.users.every(function( user ){
      if ( user.id === msg.user.id ){
        Object.keys( msg.user ).forEach(function( key ){
          user[ key ] = msg.user[ key ];
        });
        return false; // break
      }
      return true; // continue
    });
  });

  // update the users list
  // https://api.slack.com/events/presence_change
  b9.on('presence_change',function( msg ){
    b9.users.every(function( user ){
      if ( user.id === msg.user ){
        user.presence = msg.presence;
        return false; // break
      }
      return true; // continue
    });
  });

  // https://api.slack.com/events/manual_presence_change

  // add a new user...
  // https://api.slack.com/events/team_join
  b9.on('team_join',function( msg ){
    b9.users.push( msg.user );
  });
};
