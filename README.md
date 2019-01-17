# Twitch Chat Component

Twitch chat is an integral part of Twitch.tv. It is a service that allows viewers to interact with each other and the streamer by displaying user’s messages. I have chosen to recreate this experience for educational purposes.

## Related Projects

  - https://github.com/RPT10-TACO-TUESDAY/george-categories-component
  - https://github.com/RPT10-TACO-TUESDAY/milena-menu-bar-component
  - https://github.com/RPT10-TACO-TUESDAY/faris-video-service-component

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)


## Requirements
- Node 6.13.0


## Development

MYSQL Database Creation Instructions

1) Go to db/index.js and update line 4 and change 'WallacePennyToby' to your mysql password (or remove if you don't have a password)
2) Type the following commands in your terminal:
  For those with passwords:
    1) mysql -u root -p < db/schema.sql
    1.5) type in your password when prompted
    2) npm run seed
  For those without passwords:
    1) mysql -u root < db/schema.sql
    2) npm run seed

### Installing Dependencies

From within the root directory:

-npm install
-npm build (to start webpack)
-npm start (to start the server)

# anna-chat-component
