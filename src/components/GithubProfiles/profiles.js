let users = [
    {name:"zleypner", role:"FullsTack Developer"},
    {name:"Gerson2102", role:"Bckend & Blockchain Developer"},
    {name:"ChrisFernandezVivas", role:"Backend & Blockchain Developer"},
    {name:"Josue19-08", role:"Fullstack Developer"},
    {name:"ManuelJG1999", role:"Frontend Developer"}
];


const fetchGitHubProfile = async (user) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user.name}`);
        if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const interfaceUser = {
            id:data.id,
            avatar: data.avatar_url,
            name: data.name,
            role: user.role,
            url: data.html_url
        }
        return interfaceUser;
    } catch (error) {
        console.log("ERROR Fetching Github API:" + error);
        return null;
    }
};

const getGitHubProfiles = async () => {
    const profiles = await Promise.all(users.map(user => fetchGitHubProfile(user)));
    return profiles;
};

const gitHubProfiles = getGitHubProfiles();

export default gitHubProfiles;