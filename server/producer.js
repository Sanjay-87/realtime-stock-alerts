import { kafkaClient, Producer } from "kafka-node";

const client = new kafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(client);

const stocks = ["AAPL", "TSLA", "GOOGL"];

const getRandomPrice = () => +(Math.random() * 200 + 100).toFixed(2);

producer.on("ready", () => {
    console.log('Kafka Producer is ready')

    setInterval(() => {
        const stock = stocks[Math.floor(Math.random() * stocks.length)];
        const message = JSON.stringify({
            symbol: stock,
            price: getRandomPrice(),
            timestamp: new Date().toISOString()
        });

        producer.send(
            [{ topic: "stock_price_feed", messages: [message] }],
            (err, data) => {
                if (err) console.error("Error sending message", err);
                else console.log("Produced: ", message);
            }
        )
    }, 2000);
});

producer.on("error", (err) => console.error("Producer error", err));
