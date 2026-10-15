import { ApifyClient } from 'apify-client';
import 'dotenv/config';

if (!process.env.APIFY_TOKEN) {
    throw new Error('Set APIFY_TOKEN in .env before running this example.');
}

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
    keywords: ['running shoes', 'trail running shoes', 'running shoes for flat feet'],
    country: 'us',
    maxItems: 3,
};

const run = await client.actor('piotrv1001/google-keyword-volume-scraper').call(input);

console.log('Results from dataset');
console.log(`Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => console.dir(item));

// API client docs: https://docs.apify.com/api/client/js/docs
