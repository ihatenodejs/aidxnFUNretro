const alblabel = document.getElementById("albLabel");
const albumart = document.getElementById("album-art");
const song = document.getElementById("song");
const artist = document.getElementById("artist");
const album = document.getElementById("album");

async function getLatestSong() {
    const api = "https://lastfm-last-played.biancarosa.com.br/aidxn_/latest-song";
    try {
        const lsResponse = await fetch(api);
        if (lsResponse.ok) {
            const latestSongJSON = await lsResponse.json();
            if (!latestSongJSON.track["@attr"]) {
                alblabel.textContent = "Last Listen:";
            } else if (latestSongJSON.track["@attr"].nowplaying) {
                alblabel.textContent = "Now Playing:";
            } else {
                console.log("[WARN] Invalid value in now playing status, or something else messed up");
                alblabel.textContent = "Last Listen:";
            }
            albumart.src = latestSongJSON.track.image[1]["#text"];
            song.textContent = latestSongJSON.track.name;
            artist.textContent = latestSongJSON.track.artist["#text"];
            album.textContent = latestSongJSON.track.album["#text"];
        } else throw new Error(`Error, response status: ${lsResponse.status}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

getLatestSong();