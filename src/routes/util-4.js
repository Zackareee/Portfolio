export async function getBlogPosts() {
    try {
        const readmeResponse = await fetch('https://api.github.com/repos/Zackareee/Blog-Posts/git/trees/main?recursive=1', {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });
        const data = await readmeResponse.json();

        // Create an array of promises
        const fetchPromises = data.tree.map(async (obj) => {
            try {
                const readmeResponse = await fetch(`https://raw.githubusercontent.com/Zackareee/Blog-Posts/main/${obj.path}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw'
                    }
                });
                const text = await readmeResponse.text();
                return text;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // Throw the error so that Svelte's {#await} can catch it
            }
        });

        // Wait for all promises to resolve
        const filepaths = await Promise.all(fetchPromises);
        return filepaths;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error so that Svelte's {#await} can catch it
    }
}
