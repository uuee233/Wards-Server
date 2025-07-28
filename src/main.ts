import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { WebSocket } from 'ws';
import { User, users } from './user';

async function bootstrap() {
  const server = express();
  // 覆盖默认的 response.json 方法
  server.disable("etag");
  server.disable("x-powered-by");
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );
  await app.listen(5231);
}
bootstrap();

const wss = new WebSocket.Server({ port: 5232 });
export const clients: { [key: string]: { user: User, client } } = {};
wss.on("connection", async (ws, req) => {
  const user: User = JSON.parse(await users.get(req.headers["authorization"].slice(4)));
  //if (user.user_name != "device:Windows-891E7D5A46D5EB2751C50034A345D49E65" && user.user_name != "device:Android-344049DB1EC34EA2A7D5738740DB9F8E") ws.send(JSON.stringify({
  //  message: "停服更新",
  //  channel: "disconnect",
  //  context: null,
  //  timestamp: "",
  //  sender: "Server",
  //  receiver: null
  //}));
  clients[user.id] = { user, client: ws };
  ws.on("message", (m: Buffer) => {
    const msg: {
      match_id: string,
      message: string,
      channel: string,
      context: string,
      timestamp: Date,
      sender: number,
      receiver: string
    } = JSON.parse(m.toString());
    switch (msg.channel) {
      case "ping":
        ws.send(JSON.stringify({
          message: "pong",
          channel: "ping",
          context: "",
          timestamp: new Date(),
          sender: user.id,
          receiver: ""
        }));
        break;
      case "touchcard":
        clients[msg.receiver]?.client.send(JSON.stringify({
          message: msg.message,
          channel: "touchcard",
          context: msg.context,
          timestamp: new Date(),
          sender: user.id,
          receiver: msg.receiver
        }));
        break;
      case "emoji":
        clients[msg.receiver]?.client.send(JSON.stringify({
          message: msg.message,
          channel: "emoji",
          context: msg.context,
          timestamp: new Date(),
          sender: user.id,
          receiver: msg.receiver
        }));
        break;
      case "notification":
        if (msg.message == "websocketcheck") {
          clients[msg.receiver]?.client.send(JSON.stringify({
            message: "websocketcheck",
            channel: "notification",
            context: msg.context,
            timestamp: new Date(),
            sender: user.id,
            receiver: msg.receiver
          }));
        } else if (msg.message == "matchaction") {
          clients[msg.receiver]?.client.send(JSON.stringify({
            message: "matchaction",
            channel: "notification",
            context: msg.context,
            timestamp: new Date(),
            sender: user.id,
            receiver: msg.receiver
          }));
        } else if (msg.message == "im_here") {
          clients[msg.receiver]?.client.send(JSON.stringify({
            message: "im_here",
            channel: "notification",
            context: "",
            timestamp: new Date(),
            sender: user.id,
            receiver: msg.receiver
          }));
        }
        break;
    }
  })
  ws.on("close", () => {
    delete clients[user.id];
  })
});