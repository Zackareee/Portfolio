 
export async function getRepos() {
    let repo_urls = new Set();
    let readmes = [];
    let repo_names = new Set();

    try {
        const response = await fetch('https://api.github.com/users/zackareee/repos');
        const data = await response.json();

        if (data.length > 0) {
            for (const event of data) {
                console.log(event)
            }
        } else {
            console.log('No recent activity found.');
            return "No recent activity found.";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error so that Svelte's {#await} can catch it
    }
}

