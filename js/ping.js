async function ping(url) {
    const start = performance.now();
    try {
      await fetch(url);
      const end = performance.now();
      return end - start;
    } catch (error) {
      console.error(`Error pinging ${url}:`, error);
      return Infinity;
    }
}
  
async function testPing() {
    const urls = [
      'https://aidxn.fun/ping',
      'https://kantor.aidxn.fun/ping',
      'https://api.aidxn.fun/ping'
    ];
  
    const pingResults = await Promise.all(
      urls.map(async (url) => {
        const time = await ping(url);
        return { url, time };
      })
    );
  
    pingResults.sort((a, b) => a.time - b.time);
  
    console.log('Fastest server:', pingResults[0].url);
    pingResults.forEach(result => {
      console.log(`${result.url}: ${result.time.toFixed(2)} ms`);
    });
}

window.onload = () => {
    testPing();
};