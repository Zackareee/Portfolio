 
export async function getReadmes() {
    let repo_urls = new Set();
    let readmes = [];
    let repo_names = new Set();

    try {
        const response = await fetch('https://api.github.com/users/zackareee/events');
        const data = await response.json();

        if (data.length > 0) {
            for (const event of data) {
                let str = event.repo.url;
                if (str.startsWith("https://api.github.com/repos/Zackareee")) {
                    repo_urls.add(event.repo.url);
                    repo_names.add(event.repo.name);
                }
            }
        } else {
            console.log('No recent activity found.');
            return "No recent activity found.";
        }

        let count = 0;
        for (const value of repo_names) {
            if (count >= 2) break;
            count++;

            const readmeResponse = await fetch(`https://raw.githubusercontent.com/${value}/main/README.md`, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });

            const text = await readmeResponse.text();
            readmes.push(text);
        }
        console.log(readmes)
        return readmes.slice(0,2); // Return the first README content
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error so that Svelte's {#await} can catch it
    }
}

