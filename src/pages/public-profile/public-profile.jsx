import { useParams, Link } from 'react-router-dom';
import {
  Copy,
  Facebook,
  Linkedin,
  Twitter,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  Users,
  Globe,
  ExternalLink,
  Flame,
  Share2,
} from 'lucide-react';
import { getUserProfile } from '@/data/mock-user-profiles';
import { PiPulse } from 'react-icons/pi';


const StatCard = ({ icon: Icon, title, value, color = "#00C2CB" }) => (
  <div className={`p-6 rounded-lg bg-[#192436] shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold mb-2 flex items-center gap-2">
          <Icon className="w-4 h-4 opacity-80 mb-[2px]" style={{ color: color }} />
          <span className='text-white'>{title}</span>
        </p>
        <h3 className={`text-2xl font-bold`} style={{ color: color }}>
          {value}
        </h3>
      </div>

    </div>
  </div>
);

const AchievementCard = ({ achievement }) => {
  const rarityColors = {
    common: 'bg-[#212936] border-gray-700 text-gray-300',
    rare: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  };

  return (
    <div className={`p-4 rounded-lg border border-gray-800 bg-gray-850 transition-all duration-200 hover:scale-105`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div className="flex-1 overflow-hidden  ">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold overflow-hidden text-ellipsis truncate w-full">{achievement.title}</h4>
            <span className={` px-2.5 py-0.5 text-xs font-bold rounded-full border ${achievement.rarity === 'common' ? rarityColors.common : rarityColors.rare}`}>
              {achievement.rarity}
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
          <p className="text-xs text-light-blue-1 font-medium">Unlocked {achievement.unlockedDate}</p>
        </div>
      </div>
    </div>
  );
};

const ActivityChart = ({ data }) => {
  const maxPoints = Math.max(...data.map(d => d.points));

  return (
    <div className="space-y-4">
      {/* Points Chart */}
      <div>
        <div className="flex items-end gap-2 h-32">
          {data.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-light-blue-1"
                style={{ height: `${(day.points / maxPoints) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-xs text-gray-750 mt-1">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 text-center">
        <div>
          <div className="text-xl font-bold text-light-blue-1">755</div>
          <div className="text-sm text-gray-750">Total Points</div>
        </div>
        <div>
          <div className="text-xl font-bold text-light-blue-1">47</div>
          <div className="text-sm text-gray-750">Exercises</div>
        </div>
        <div>
          <div className="text-xl font-bold text-light-blue-1">4h</div>
          <div className="text-sm text-gray-750">Study Time</div>
        </div>
      </div>
    </div>
  );
};

const ShareProfile = ({ username }) => {
  const profileUrl = `${window.location.origin}/u/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    // You could add a toast notification here
  };

  const handleSocialShare = (platform) => {
    const message = `Check out my Aurora learning progress!`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-[#192436] p-6 rounded-lg border border-gray-700 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-light-blue-1" />
        Share Profile
      </h2>

      <p className="text-gray-750 mb-4">
        Share Aurora Student&apos;s learning progress with others!
      </p>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Profile Link</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="flex-1 px-4 py-3 rounded-lg border text-sm font-mono bg-gray-850 border border-gray-600 rounded-l text-white text-sm"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background bg-primary text-light-blue-1 h-11 rounded-md transition-all duration-200 hover:scale-105 px-6 hover:border-light-blue-1 border-2 border-light-blue-1 bg-gray-850"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-3">Share on Social Media</label>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleSocialShare('twitter')}
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#1DA1F1]"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => handleSocialShare('facebook')}
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#4267B2]"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
          <button
            onClick={() => handleSocialShare('linkedin')}
            className="transition-all duration-200 hover:scale-105  flex items-center justify-center gap-2 px-4 py-3 bg-gray-850 border-2 border-light-blue-1 hover:text-white rounded hover:border-white transition-colors text-[#0077B5]"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

const PublicProfile = () => {
  const { username } = useParams();
  const userProfile = getUserProfile(username);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-750 mb-6">The user profile &quot;@{username}&quot; doesn&apos;t exist.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="bg-[#1A2435] rounded-lg p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.displayName}
                  className="w-28 h-28 rounded-full border-4 border-light-blue-1"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-light-blue-1 bg-white flex items-center justify-center">
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{userProfile.displayName}</h1>
              <div className="flex flex-col sm:flex-row gap-4 text-gray-300 text-sm mb-4">
                <div className="flex items-center gap-1 text-gray-750">
                  <Globe className="w-4 h-4" />
                  {userProfile.country}
                </div>
                <div className="flex items-center gap-1 text-gray-750">
                  <Users className="w-4 h-4" />
                  {userProfile.community}
                </div>
                <div className="flex items-center gap-1 text-gray-750">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.joinDate}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-[#00b8d4]/20 text-light-blue-1 border-[#00b8d4]/30 text-sm px-3 py-1">
                  Level {userProfile.level}
                </span>
                <div className="text-right">
                  <div className="text-xl font-bold text-light-blue-1">#{userProfile.globalRank} Global</div>
                  <div className="text-sm text-gray-750">{userProfile.totalPoints.toLocaleString()} points</div>
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span className='text-white font-bold'>Overall Progress</span>
                  <span>{userProfile.overallProgress}%</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F172A] rounded-full transition-all duration-500"
                    style={{ width: `${userProfile.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Teacher Link */}
              {userProfile.isTeacher && (
                <Link
                  to={userProfile.teacherProfile}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <Award className="w-4 h-4" />
                  View Teacher Profile
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={BookOpen}
            title="Classes Completed"
            value={userProfile.stats.classesCompleted}
          />
          <StatCard
            icon={Clock}
            title="Study Hours"
            value={userProfile.stats.studyHours}
          />
          <StatCard
            icon={Target}
            title="Exercises Solved"
            value={userProfile.stats.exercisesSolved}
          />
          <StatCard
            icon={Flame}
            title="Current Streak"
            value={`${userProfile.stats.currentStreak} days`}
            color='#FF6B35'
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <div className="bg-[#192436] h-full p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-light-blue-1" />
                Achievements ({userProfile.achievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-[#192436] h-full p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <PiPulse className="w-5 h-5 text-light-blue-1" />
              Activity (Last 7 Days)
            </h2>
            <ActivityChart data={userProfile.activityData} />
          </div>
        </div>

        {/* Share Profile */}
        <ShareProfile username={username} />


      </div>
    </div>
  );
};

export default PublicProfile; 