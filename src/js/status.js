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
      'https://old.aidxn.fun/ping.html',
      'https://kantor.aidxn.fun/ping',
  ];

  const pingResults = await Promise.all(
      urls.map(async (url) => {
          const time = await ping(url);
          if (url === 'https://old.aidxn.fun/ping.html') {
              const website = document.getElementById("website");
              website.textContent = `[ONLINE - ${time} ms]`
          }
          if (url === 'https://kantor.aidxn.fun/ping') {
              const status1 = document.getElementById("status1");
              status1.textContent = `[ONLINE - ${time} ms]`
              status1.className = 'text-green-500 font-bold';
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
  if (fastestServer === 'https://old.aidxn.fun/ping.html') {
      oldText = website.textContent;
      website.textContent = oldText + ' [FASTEST]';
  }
  if (fastestServer === 'https://kantor.aidxn.fun/ping') {
      oldText = status1.textContent;
      status1.textContent = oldText + ' [FASTEST]';
  }
}

window.onload = () => {
  testPing();
};