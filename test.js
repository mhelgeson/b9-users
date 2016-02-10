var assert = require('assert');
var B9 = require('b9');

describe('src/index', function(){

  var bot = new B9({ package:false });
  bot.install( require('./index') );

  it('initializes users on `rtm.start`',function(){
    // simulate event
    bot.emit('rtm.start',{
      users: [
        { id: "U001", name: "George Washington" },
        { id: "U002", name: "John Adams" }
      ]
    });
    assert.equal( Array.isArray( bot.users ), true );
    assert.equal( bot.users.length, 2 );
    assert.equal( bot.users[0].name, 'George Washington' );
  });

  it('updates users on `user_change`',function(){
    assert.equal( bot.users[1].party, undefined );
    // simulate event
    bot.emit('user_change',{
      user: {
        id: "U002",
        email: "jadams@prez.gov",
        party: "Federalist"
      }
    });
    assert.equal( bot.users[1].email, 'jadams@prez.gov' );
    assert.equal( bot.users[1].party, 'Federalist' );
  });

  it('adds a new user on `team_join`',function(){
    assert.equal( bot.users[2], undefined );
    // simulate event
    bot.emit('team_join',{
      user: {
        id: "U003",
        name: "Thomas Jefferson",
        email: "tjefferson@prez.gov"
      }
    });
    assert.equal( bot.users[2].name, 'Thomas Jefferson' );
    assert.equal( bot.users[2].email, 'tjefferson@prez.gov' );
  });

  it('updates users on `presence_change`',function(){
    assert.equal( bot.users[2].presence, undefined );
    // simulate event
    bot.emit('presence_change',{
      user: "U003",
      presence: "away"
    });
    assert.equal( bot.users[2].name, 'Thomas Jefferson' );
    assert.equal( bot.users[2].presence, 'away' );
  });

});
