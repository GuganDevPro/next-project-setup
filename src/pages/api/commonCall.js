import Redis from 'ioredis';

const api_url = process.env.API_DOMAIN;
const redis = new Redis();

export default async function handler(req, res) {
    try {
        const token = await redis.get('loginToken');
        if (!token)
            return res.status(401).json({ code: 401, status: 'error', data: "Token Expired" });

        const data = await axios.post(api_url + req.body.slug, req.body.data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.status(200).send(data.data);
    } catch (error) {
        let errorRes = error.response.data;
        if (Array.isArray(error.response.data) || typeof error.response.data === 'object')
            return res.status(error.response.status).json(errorRes);
        else
            return res.status(error.response.status).json({ code: error.response.status, status: 'error', data: error.message });
    }
}

