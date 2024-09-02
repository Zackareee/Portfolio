export async function getReadme(full_name) {
  // I made the choice to only check the main branch for its readme, not master. 
  // By convention I use main branches instead of master branch.
  const URL = `https://raw.githubusercontent.com/${full_name}/main/README.md`
  try {
    const readmeResponse = await fetch(URL,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    );
    return await readmeResponse.text();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

