import * as XMPP from "stanza";
export default class XmppClient {
  private static xmppClient: XmppClient;
  private listenCallback: any;
  private client: any;
  private constructor() {
    console.log("xmppClient construct");
    this.client = XMPP.createClient({
      jid: "maodi@mxt.westone.com",
      password: "4697932dc27e660cc4f2c1db419b9559",
      resource: "sim",
      // If you have a .well-known/host-meta.json file for your
      // domain, the connection transport config can be skipped.
      transports: {
        websocket: "ws://10.13.6.55:5290",
      },
    });

    this.client.on("session:started", () => {
      this.client.getRoster().then((result:any) => {
        console.log("roster result = " + result);
      });
      this.client.sendPresence();
    });

    this.client.on("connected", () => {
      console.log("connected");
    });

    this.client.on("disconnected", () => {
      console.log("disconnected");
    });

    this.client.on("chat", (msg:any) => {
      console.log("chat msg = " + msg);
      if (this.listenCallback) {
        this.listenCallback(msg);
      }
    });

    this.client.on("auth:failed", () => {
      console.log("auth:failed");
    });

    this.client.on("auth:success", () => {
      console.log("auth:success");
    });

    this.client.on("message:error", (msg:any) => {
      console.log("message error msg = " + msg);
    });

    this.client.on("message:failed", (msg:any) => {
      console.log("message failed msg = " + msg);
    })

    this.client.connect();
  }

  public startListenMessage(callback: any) {
    this.listenCallback = callback;
  };

  public sendMessage = (toUser: any, msgbody: any, type: any) => {
    this.client.sendMessage({
      to: toUser,
      body: msgbody,
      type: "chat",
    });
  };

  public static getInstance(): XmppClient {
    if (this.xmppClient == null) {
      this.xmppClient = new XmppClient();
    }
    return this.xmppClient;
  }


  public test() {
    return "The name is xmppClient";
  }


}
