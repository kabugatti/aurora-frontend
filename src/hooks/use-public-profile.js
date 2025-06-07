import { useParams } from 'react-router-dom';
import { getUserProfile } from '@/data/mock-user-profiles';

export const usePublicProfile = () => {
  const { username } = useParams();
  const userProfile = getUserProfile(username);

  const profileUrl = `${window.location.origin}/u/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
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

  return {
    username,
    userProfile,
    profileUrl,
    displayName: userProfile?.displayName || username,
    handleCopy,
    handleSocialShare,
  };
}; 