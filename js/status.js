const pings = [];

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
        if (url === 'https://aidxn.fun/ping') {
            const website = document.getElementById("website");
            website.textContent = `[ONLINE - ${time} ms]`
        }
        if (url === 'https://kantor.aidxn.fun/ping') {
            const status1 = document.getElementById("status1");
            status1.textContent = `[ONLINE - ${time} ms]`
            status1.style = 'color: green;';
        }
        if (url === 'https://api.aidxn.fun/ping') {
            const api = document.getElementById("api");
            api.textContent = `[ONLINE - ${time} ms]`
            api.style = 'color: green;';
        }
        return { url, time };
      })
    );
  
    pingResults.sort((a, b) => a.time - b.time);
  
    console.log('Fastest server:', pingResults[0].url);
    pingResults.forEach(result => {
      console.log(`${result.url}: ${result.time.toFixed(2)} ms`);
    });
    const fastestServer = pingResults[0].url;
    if (fastestServer === 'https://aidxn.fun/ping') {
        oldText = website.textContent;
        website.textContent = oldText + ' [FASTEST]';
    }
    if (fastestServer === 'https://kantor.aidxn.fun/ping') {
        oldText = status1.textContent;
        status1.textContent = oldText + ' [FASTEST]';
    }
    if (fastestServer === 'https://api.aidxn.fun/ping') {
        oldText = api.textContent;
        api.textContent = oldText + ' [FASTEST]';
    }
}

window.onload = () => {
    
    testPing();
};