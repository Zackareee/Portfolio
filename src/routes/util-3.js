export async function getReadme(full_name) {
    try {
        const readmeResponse = await fetch(`https://raw.githubusercontent.com/${full_name}/main/README.md`, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });
        const text = await readmeResponse.text();
        console.log(text)
        return(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error so that Svelte's {#await} can catch it
    }
}

