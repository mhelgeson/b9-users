# b9-users
[![Build Status](https://travis-ci.org/mhelgeson/b9-users.svg?branch=master)](https://travis-ci.org/mhelgeson/b9-users)
[![Coverage Status](https://coveralls.io/repos/github/mhelgeson/b9-users/badge.svg?branch=master)](https://coveralls.io/github/mhelgeson/b9-users?branch=master)

- - -

A [b9](https://github.com/mhelgeson/b9) slack bot plugin, which provides and maintains an array of team users.

## Properties

#### `b9.users` *`{Array}`*
A list of user objects, one for every member of the team.
https://api.slack.com/types/user

## Listeners

#### `"rtm.start"`
Initializes the `users` list.
https://api.slack.com/methods/rtm.start

#### `"team_join"`
Adds a new user to the `users` list.
https://api.slack.com/events/team_join

#### `"user_change"`
Updates an item in the `users` list.
https://api.slack.com/events/user_change

#### `"presence_change"`
Updates an item in the `users` list.
https://api.slack.com/events/presence_change
