# Redis Pub/Sub Model Demo

This demonstration will guide you through setting up a basic Redis Pub/Sub model using Docker and Node.js. Ensure you have Docker and Node.js installed on your machine before proceeding.

## Prerequisites

- Docker
- Node.js

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine by running:

```bash
git clone [Repository URL]
```

Navigate into the cloned directory:

```bash
cd [Repository Directory]
```

### Step 2: Run Redis Server

Start the Redis server using Docker with the following command:

```bash
docker run --name some-redis -d -p 6379:6379 redis
```

### Step 3: Subscribe to a Channel

Open a terminal window and start the subscriber tool:

```bash
node subscriber.js
```

When prompted, enter the name of the channel you wish to subscribe to.

You can open multiple terminal windows and repeat this step to subscribe to various channels or multiple instances of the same channel.

### Step 4: Publish Messages

In a new terminal window, run the publisher script:

```bash
node publisher.js
```

You will be prompted to enter the name of the channel you wish to publish to. After entering the channel name, you can type a message to publish. The message will be sent to all clients subscribed to that channel.

## Demonstration

This setup will allow you to demonstrate the functionality of publishing messages to different or multiple channels and how subscribers receive messages in real-time.

---

Make sure to replace `[Repository URL]` and `[Repository Directory]` with the actual URL and directory name where your code is stored. This README provides clear step-by-step instructions to help users easily set up and run the demonstration.
