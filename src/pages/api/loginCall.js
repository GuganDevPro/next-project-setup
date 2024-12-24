import Redis from 'ioredis';
import axios from 'axios';
import { minutesToSeconds } from '@/utils/common';
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: '',
});
const api_url = process.env.API_DOMAIN;
const redisExpTime = minutesToSeconds(process.env.REDIS_EXPIRY_TIME);
console.log("🚀 ~ redisExpTime:", redisExpTime)

export default async function login(req, res) {
    try {
        const data = await axios.post(api_url + req.body.slug, req.body.data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await redis.set('loginToken', data.data.token, 'EX', redisExpTime);
        console.log('tysetet', data)
        return res.status(200).send(data.data);
    } catch (error) {
        let errorRes = error.response.data;
        if (Array.isArray(error.response.data) || typeof error.response.data === 'object')
            return res.status(error.response.status).json(errorRes);
        else
            return res.status(error.response.status).json({ code: error.response.status, status: 'error', data: error.message });
    }
}