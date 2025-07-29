import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/context/ToastContext";
import {
  Award,
  Wallet,
  Download,
  Share2,
  ExternalLink,
  GraduationCap,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Shield,
  Eye,
  Copy,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import certificateService from "@/services/certificateService";

// Mock NFT data for demonstration (this will be replaced by the service)

const CertificateCard = ({ certificate, onDownload, onShare }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      onDownload(certificate);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        title: certificate.title,
        text: `Check out my ${certificate.level} English certification from Aurora!`,
        url: `${window.location.origin}/certificate/${certificate.tokenId}`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        // Toast notification is handled by the parent component
      }
      onShare(certificate);
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      A1: "bg-green-500",
      A2: "bg-blue-500",
      B1: "bg-yellow-500",
      B2: "bg-orange-500",
      C1: "bg-red-500",
      C2: "bg-purple-500",
    };
    return colors[level] || "bg-gray-500";
  };

  return (
    <Card className="bg-[#1f2937] border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full ${getLevelColor(
                certificate.level
              )} flex items-center justify-center`}
            >
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-xl">
                {certificate.title}
              </CardTitle>
              <Badge
                variant="outline"
                className="mt-1 border-blue-500 text-blue-400"
              >
                {certificate.level} Level
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
              className="text-gray-400 hover:text-white"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              disabled={isSharing}
              className="text-gray-400 hover:text-white"
            >
              {isSharing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Certificate Image */}
        <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">{certificate.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>
                Issued: {new Date(certificate.issueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Trophy className="w-4 h-4" />
              <span>Score: {certificate.metadata.score}%</span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-white font-medium text-sm">Skills Acquired:</h4>
            <div className="flex flex-wrap gap-2">
              {certificate.metadata.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="pt-3 border-t border-gray-600">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                Contract: {certificate.contractAddress.slice(0, 8)}...
                {certificate.contractAddress.slice(-8)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View on Explorer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NoCertificateState = () => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
        <Award className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        No Certificates Found
      </h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        You haven&apos;t earned any Aurora certification NFTs yet. Complete
        courses to start earning certificates and showcase your language
        learning achievements.
      </p>
      <div className="space-y-4">
        <Button
          onClick={() => (window.location.href = "/course-listing")}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <GraduationCap className="w-5 h-5 mr-2" />
          Explore Courses
        </Button>
        <div className="text-sm text-gray-500">
          <p>
            Ready to start learning?{" "}
            <a
              href="/course-listing"
              className="text-blue-400 hover:text-blue-300"
            >
              Browse available courses
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const CertificatePage = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();
  const { showToast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("certificates");

  // Fetch certificates from blockchain using service
  const fetchCertificates = async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    try {
      const certificates = await certificateService.fetchUserCertificates(
        walletAddress
      );
      setCertificates(certificates);

      // Fetch analytics data
      const analyticsData = await certificateService.getCertificateAnalytics(
        walletAddress
      );
      setAnalytics(analyticsData);

      showToast({
        title: "Certificates Loaded",
        description: `Found ${certificates.length} certificates in your wallet`,
        type: "success",
      });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      showToast({
        title: "Error",
        description: "Failed to load certificates. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchCertificates();
    }
  }, [walletAddress]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      showToast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        type: "error",
      });
    }
  };

  const handleDownload = async (certificate) => {
    try {
      await certificateService.downloadCertificate(certificate);
      showToast({
        title: "Download Complete",
        description: `${certificate.title} certificate downloaded successfully`,
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "Download Failed",
        description: "Failed to download certificate. Please try again.",
        type: "error",
      });
      console.error("Download failed:", error);
    }
  };

  const handleShare = async (certificate) => {
    try {
      const shareUrl = certificateService.generateShareableUrl(
        certificate.tokenId,
        walletAddress
      );
      await navigator.clipboard.writeText(shareUrl);
      showToast({
        title: "Certificate Shared",
        description: `Shareable link for ${certificate.title} copied to clipboard`,
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "Share Failed",
        description: "Failed to generate shareable link. Please try again.",
        type: "error",
      });
      console.error("Share failed:", error);
    }
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      showToast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
        type: "success",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                My Certificates
              </h1>
              <p className="text-gray-400 mt-2">
                View and manage your Aurora English certification NFTs
              </p>
            </div>

            {walletAddress && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-mono text-sm">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </p>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={disconnectWallet}
                  className="text-white"
                >
                  Disconnect
                </Button>
              </div>
            )}
          </div>

          {/* Wallet Connection Prompt - Only show if no wallet is connected */}
          {!walletAddress && (
            <div className="flex items-center justify-center py-16">
              <div className="max-w-md w-full">
                <Card className="bg-[#1f2937] border-gray-700 shadow-lg">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Welcome to Certificate Verification
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Connect your wallet to view your English certification
                      NFTs issued by Aurora. Verify your achievements and
                      showcase your language learning progress.
                    </p>

                    {/* Connect Button */}
                    <Button
                      onClick={handleConnectWallet}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Wallet to Continue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Only show when wallet is connected */}
        {walletAddress ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-[#1f2937] border-gray-700">
              <TabsTrigger
                value="certificates"
                className="data-[state=active]:bg-blue-600"
              >
                <Award className="w-4 h-4 mr-2" />
                Certificates ({certificates.length})
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-blue-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="space-y-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Loading your certificates...
                    </p>
                  </div>
                </div>
              ) : certificates.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {certificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      onDownload={handleDownload}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              ) : (
                <NoCertificateState />
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1f2937] border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">
                          Total Certificates
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {certificates.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1f2937] border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Average Score</p>
                        <p className="text-2xl font-bold text-white">
                          {analytics?.averageScore || 0}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1f2937] border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Highest Level</p>
                        <p className="text-2xl font-bold text-white">
                          {analytics?.highestLevel || "None"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Analytics */}
              {certificates.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#1f2937] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Skills Acquired
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analytics?.skillsAcquired?.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        )) || []}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#1f2937] border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Certificates by Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analytics?.certificatesByLevel &&
                          Object.entries(analytics.certificatesByLevel).map(
                            ([level, count]) => (
                              <div
                                key={level}
                                className="flex justify-between items-center"
                              >
                                <span className="text-gray-300">{level}</span>
                                <Badge
                                  variant="outline"
                                  className="text-blue-400"
                                >
                                  {count}
                                </Badge>
                              </div>
                            )
                          )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : null}
      </div>
    </div>
  );
};

export default CertificatePage;
