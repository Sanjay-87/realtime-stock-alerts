import kafka from "kafka-node";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(
    client,
    [{ topic: "stock_price_feed", partition: 0 }],
    { autoCommit: true}
)

// Hardcoded thresholds for now
const alertThreshold = {
    AAPL: 150,
    TSLA: 200,
    GOOGL: 180
}

consumer.on("message", (message) => {
    const data = JSON.parse(message.value);
    const threshold = alertThreshold[data.symbol];

    if (threshold && data.price >= threshold) {
        console.log(`Alert: ${data.symbol} has reached ${data.price}`);
        socket.emit('stockAlert', data);
    }
});

consumer.on("error", (err) => console.error("Consumer error", err));
