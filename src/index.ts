import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import axios from "axios";

import { TOKEN_DOGMA, TOKEN_DRONE } from './config.json';

const dogmaClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const droneClient = new Client({ intents: [GatewayIntentBits.Guilds] });

const dogmaUrl = "https://droneapi.mirmglobal.com/token/detail/dogma";
const droneUrl = "https://droneapi.mirmglobal.com/token/detail/drone";

async function setTokenPrice(client: Client<boolean>, tokenUrl: string, tokenName: string, messageChannel?: TextChannel) {
  const { data } = await axios.get(tokenUrl)
  const price = data.data.price.toFixed(4) as number
  const formattedPrice = `$${price}`
  client.user?.setActivity(formattedPrice)
}

const interval = 15000 * 1;

dogmaClient.once('ready', async () => {
  console.log(`Logged in as ${dogmaClient.user!.tag}!`);

  await setTokenPrice(dogmaClient, dogmaUrl, "DOGMA");
  setInterval(async () => await setTokenPrice(dogmaClient, dogmaUrl, "DOGMA"), interval);
});

droneClient.once('ready', async () => {
  console.log(`Logged in as ${droneClient.user!.tag}!`);

  await setTokenPrice(droneClient, droneUrl, "DRONE");
  setInterval(async () => await setTokenPrice(droneClient, droneUrl, "DRONE"), interval);
});

dogmaClient.login(TOKEN_DOGMA);
droneClient.login(TOKEN_DRONE);
