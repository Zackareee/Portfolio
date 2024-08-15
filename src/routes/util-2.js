 
export async function getRepos() {

    let repo_data = [];

    try {
        const response = await fetch('https://api.github.com/users/zackareee/repos');
        const data = await response.json();

        if (data.length > 0) {
            for (const event of data) {

                if (event.fork == false) {
                    let full_name = event.full_name
                    let description = event.description
                    let language = event.language
                    let forks = event.forks
                    repo_data.push(
                        {
                            'full_name':full_name, 
                            "description":description, 
                            "language":language, 
                            "forks": forks,
                        }
                    )
                }
            }
            return repo_data
        } else {
            console.log('No recent activity found.');
            return "No recent activity found.";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error so that Svelte's {#await} can catch it
    }
}

