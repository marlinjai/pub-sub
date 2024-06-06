This is a demo of Redis Pub Sub Model

Please clone the repo and run

docker run --name some-redis -d -p 6379:6379 redis

in your terminal. - you need to ahve Docker installed on your machine.

Then you can user ther commanloine tool by typing node subscriber.js in one terminal. You`ll be prompted to enter the name of the channel that you wanna subscibe to.

Then you can do that for multiple instances to showcase the functionality of publishing to different or multiple chanels.

After you run node publisher.js and your promplet to endter the channel name that you wanna publish to. After you can enter a message to publish in the channel and it will be send to all clinets that are sibcribed to that channel.
