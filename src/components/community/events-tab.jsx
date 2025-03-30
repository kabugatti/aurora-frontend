import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { upcomingEvents } from "@/data/mock-data-community"
import { Users, Calendar, Share2, ChevronRight, Video, Bot, MessageSquare } from "lucide-react"

export const EventsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Button variant="link" className="text-[#3b82f6]">
            View calendar <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {event.date} • {event.time}
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="bg-[#3b82f6]">
                    {event.type === "online" ? "Online" : "In-person"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50">
                    {event.language}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50">
                    {event.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {event.participants} participants
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Add to calendar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <Button className="bg-[#3b82f6]" size="sm">
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6]">View All Events</Button>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Video className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Learning Webinars</h4>
                <p className="text-sm text-gray-600">Learn advanced techniques with experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Bot className="h-5 w-5 text-purple-600" />
              <div>
                <h4 className="font-medium">AI Demonstrations</h4>
                <p className="text-sm text-gray-600">Discover Aurora&apos;s new features</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium">Group Practice Sessions</h4>
                <p className="text-sm text-gray-600">Practice with other students and AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-amber-600" />
              <div>
                <h4 className="font-medium">Q&A Sessions</h4>
                <p className="text-sm text-gray-600">Resolve your doubts about using Aurora AI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Featured Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3 text-center min-w-16">
                  <div className="text-sm">JUN</div>
                  <div className="text-xl font-bold">15</div>
                </div>
                <div>
                  <h4 className="font-medium">Aurora AI Summit 2023</h4>
                  <p className="text-sm text-gray-500">Virtual conference on the future of AI learning</p>
                  <Badge variant="outline" className="mt-1 bg-blue-50">
                    Main event
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg p-3 text-center min-w-16">
                  <div className="text-sm">JUL</div>
                  <div className="text-xl font-bold">08</div>
                </div>
                <div>
                  <h4 className="font-medium">AI Practice Marathon</h4>
                  <p className="text-sm text-gray-500">12 hours of intensive practice with Aurora</p>
                  <Badge variant="outline" className="mt-1 bg-blue-50">
                    All levels
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

