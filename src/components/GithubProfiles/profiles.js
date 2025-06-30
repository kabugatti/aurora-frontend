let users = [
    "zleypner",
    "Gerson2102",
    "ChrisFernandezVivas",
    "Josue19-08",
    "ManuelJG1999"
];

const fetchGitHubProfile = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERROR Fetching Github API:" + error);
        return null;
    }
};

const getGitHubProfiles = async () => {
    const profiles = await Promise.all(users.map(user => fetchGitHubProfile(user)));
    console.log(profiles);
    return profiles;
};

const gitHubProfiles = getGitHubProfiles();

export default gitHubProfiles;