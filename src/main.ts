import { fetchInput } from './utils/FetchInput';

(async () => {
  const day = parseInt(process.argv[2] || '1', 10); // Pass day as an argument
  const modulePath = `./solutions/day${day.toString().padStart(2, '0')}`;

  try {
    const { solve } = await import(modulePath);
    const input = await fetchInput(day);
    console.log(`Day ${day} Solution:`);
    console.log(solve(input));
  } catch (e) {
    console.log('error: ', e)
    console.error(`Error running solution for Day ${day}:`);
  }
})();
