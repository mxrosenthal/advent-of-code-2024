import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const SESSION_COOKIE = process.env.AOC_SESSION_COOKIE;
const INPUT_DIR = path.resolve(__dirname, '../../inputs');

export const fetchInput = async (day: number): Promise<string> => {
  const inputFilePath = path.join(INPUT_DIR, `day${day.toString().padStart(2, '0')}.txt`);
//   console.log("session cookie: ", SESSION_COOKIE)
  if (fs.existsSync(inputFilePath)) {
    return fs.readFileSync(inputFilePath, 'utf-8');
  }

  if (!SESSION_COOKIE) {
    throw new Error('Advent of Code session cookie is missing.');
  }

  const response = await axios.get(`https://adventofcode.com/2024/day/${day}/input`, {
    headers: { Cookie: `session=${SESSION_COOKIE}` },
  });

  fs.mkdirSync(INPUT_DIR, { recursive: true });
  fs.writeFileSync(inputFilePath, response.data.trim());

  return response.data.trim();
};