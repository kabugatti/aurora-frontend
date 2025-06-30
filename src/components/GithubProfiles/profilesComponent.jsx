import { Github } from 'lucide-react';
import gitHubProfiles from './profiles';
import { Link } from 'react-router-dom';
let profiles = await gitHubProfiles;

const GitHubProfiles = () => {

return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-20 px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Our Team
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Everything you need to know about our talented developers and their amazing GitHub projects
        </p>
      </div>

      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="text-center"
              >

                <div className="mb-6 flex justify-center">
                  <div 
                    className="w-48 h-48 rounded-full p-2"
                    style={{ backgroundColor: '#00b8d4' }}
                  >
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover bg-gray-200"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-black">
                  {profile.name}
                </h3>
                              
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  {profile.bio}
                </p>
                
                <div className="flex justify-center">
                  <Link to={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 text-white font-medium transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#00b8d4' }}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfiles;