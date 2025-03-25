import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { popularDiscussions, communityAchievements } from "@/data/mock-data-community"
import { MessageCircle, Heart, Share2, ChevronRight } from "lucide-react"

export const ForumsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Discussions</h2>
          <Button variant="link" className="text-[#3b82f6]">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {popularDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{discussion.title}</CardTitle>
                      <CardDescription>
                        By {discussion.author} • {discussion.timeAgo}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    {discussion.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="pt-2 flex justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {discussion.replies} replies
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {discussion.likes} likes
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6]">Start New Discussion</Button>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Progress with Aurora AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityAchievements.map((achievement) => {
              // Dynamically import the icon
              const IconComponent = achievement.icon

              return (
                <div key={achievement.id} className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    {/* Render the icon dynamically */}
                    {IconComponent && <IconComponent className="h-6 w-6 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <span className="text-sm text-gray-500">{achievement.progress}%</span>
                    </div>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-[#3b82f6] h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Achievements
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-50">
                #AuroraAI
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #AdaptiveLearning
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #PerfectPronunciation
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #EnglishWithAI
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #SimulatedConversation
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #MemorizationTechniques
              </Badge>
              <Badge variant="secondary" className="bg-blue-50">
                #DailyPractice
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

