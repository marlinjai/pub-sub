const { createClient } = require("redis");
const readline = require("readline");

async function startPublisher() {
  const publisher = createClient({
    socket: {
      host: "localhost",
      port: 6379,
    },
  });

  publisher.on("error", (err) => console.error("Redis Publisher Error:", err));
  publisher.on("connect", () => console.log("Publisher connected to Redis"));

  try {
    await publisher.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    process.exit(1); // Exit if cannot connect to Redis
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function promptForChannel() {
    rl.question("Please select a channel: ", (channel) => {
      if (!channel.trim()) {
        console.log("Channel name cannot be empty.");
        promptForChannel();
      } else {
        selectedChannel = channel.trim();
        console.log(`Channel selected: ${selectedChannel}`);
        promptForMessage();
      }
    });
  }

  function promptForMessage() {
    rl.question(
      "Please enter the message to publish (or 'change' to switch channels): ",
      async (input) => {
        if (input.trim().toLowerCase() === "change") {
          selectedChannel = null;
          promptForChannel();
        } else if (!input.trim()) {
          console.log("Message cannot be empty.");
          promptForMessage();
        } else {
          try {
            await publisher.publish(selectedChannel, input.trim());
            console.log(
              `Message published to ${selectedChannel}:`,
              input.trim()
            );
            promptForMessage();
          } catch (error) {
            console.error("Failed to publish message:", error);
          }
        }
      }
    );
  }

  let selectedChannel = null;
  promptForChannel();

  // Graceful shutdown
  rl.on("close", async () => {
    await publisher.disconnect();
    console.log("Publisher disconnected and program exited.");
  });

  process.on("SIGINT", function () {
    rl.close(); // This triggers the 'close' event on readline
  });
}

startPublisher();
