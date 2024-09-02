
export async function getRepos() {
  const URL = "https://api.github.com/users/zackareee/repos";
  let repo_data = [];

  try {
    const response = await fetch(URL);
    const data = await response.json();
    // We need to catch when the response is a 403 from rate limiting, or other 
    // similar errors here.
    if (data.length > 0) {
      for (const event of data) {
        // I decided not to return repo's which are forks. This keeps the
        // portfolio page solely to my independant work. 
        if (event.fork == false) {
          let full_name = event.full_name
          let description = event.description
          let language = event.language
          let forks = event.forks
          repo_data.push(
            {
              "full_name": full_name,
              "description": description,
              "language": language,
              "forks": forks,
            }
          )
        }
      }
      return repo_data
    } else {
      // TODO: Provide a more meaningful response for different error codes. 
      console.log("No recent activity found.");
      return "No recent activity found.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // This will throw the error so that Svelte's {#await} can catch it, not 
    // kill the application.
    throw error;
    
  }
}

