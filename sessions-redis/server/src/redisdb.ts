import Redis from 'ioredis';

const redis = new Redis({
  'port': 8085,
  'host': '127.0.0.1'
});

export default redis;