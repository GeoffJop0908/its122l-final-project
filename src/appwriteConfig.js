import { Account, Client } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67d9383a0020f27033b6');

export const account = new Account(client);

export default client;
