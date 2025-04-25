import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { studyGroups } from "@/data/mock-data-community"
import { Users, TrendingUp, Bot, Sparkles, BookOpen, Mic, ChevronRight } from "lucide-react"

export const StudyGroupsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Study Groups</h2>
          <Button variant="link" className="text-[#3b82f6]">
            View all <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {studyGroups.map((group) => (
            <Card key={group.id} className="transition-shadow hover:shadow-md bg-dark-blue-5 border-neutral-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className='text-white'>{group.name}</CardTitle>
                  <Badge variant="outline" className="bg-blue-50">
                    {group.language}
                  </Badge>
                </div>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {group.members} members
                  </div>
                  <Badge variant="outline" className="bg-purple-50">
                    {group.level}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    {group.meetingFrequency}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full bg-[#3b82f6]">Join Group</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6]">Create New Group</Button>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Study Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Collaborative Learning</h4>
                <p className="text-sm text-gray-500">Learn with others and stay motivated</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Consistent Progress</h4>
                <p className="text-sm text-gray-500">Maintain a regular study rhythm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Shared AI Practice</h4>
                <p className="text-sm text-gray-500">Share techniques and tips for using Aurora</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Group Challenges</h4>
                <p className="text-sm text-gray-500">Participate in weekly challenges with Aurora AI</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Study Group Guide
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recommended Groups for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Tech Vocabulary</h4>
                    <p className="text-xs text-gray-500">87 members • English</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Mic className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Advanced Pronunciation</h4>
                    <p className="text-xs text-gray-500">64 members • English</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

