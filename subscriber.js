const { createClient } = require("redis");
const readline = require("readline");

async function startSubscriber() {
  const subscriber = createClient({
    socket: {
      host: "localhost",
      port: 6379,
    },
  });

  subscriber.on("error", (err) =>
    console.error("Redis Subscriber Error:", err)
  );
  subscriber.on("connect", () => console.log("Subscriber connected to Redis"));

  await subscriber.connect();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Please enter the channel name: ", async (ch) => {
    subscriber.subscribe(ch, (message, channel) => {
      console.log("Received:", message, "from channel:", channel);
    });
  });
}

startSubscriber();
