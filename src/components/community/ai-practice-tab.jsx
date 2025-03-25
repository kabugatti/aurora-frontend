import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { aiPracticeTools, aiFeatures } from "@/data/mock-data-community"
import {
  TrendingUp,
  Clock,
  ChevronRight,
  MessageSquare,
  Mic,
  PenTool,
  Bot,
  Laptop,
  Brain,
  Sparkles,
  Zap,
} from "lucide-react"

export const AIPracticeTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Aurora AI Practice Tools</h2>
          <Button variant="link" className="text-[#3b82f6]">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiPracticeTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full">
                      {/* Dynamically render the icon based on the tool.icon string */}
                      {tool.icon === "Bot" && <Bot className="h-6 w-6 text-blue-500" />}
                      {tool.icon === "Mic" && <Mic className="h-6 w-6 text-purple-500" />}
                      {tool.icon === "PenTool" && <PenTool className="h-6 w-6 text-green-500" />}
                      {tool.icon === "Laptop" && <Laptop className="h-6 w-6 text-amber-500" />}
                    </div>
                    <CardTitle>{tool.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    {tool.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-gray-600 mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {tool.popularity}% popularity
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {tool.lastUsed}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full bg-[#3b82f6]">Start Practice</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6]">Explore More Tools</Button>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Aurora AI Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  {/* Dynamically render the icon based on the feature.icon string */}
                  {feature.icon === "Mic" && <Mic className="h-5 w-5 text-blue-600" />}
                  {feature.icon === "Brain" && <Brain className="h-5 w-5 text-purple-600" />}
                  {feature.icon === "Sparkles" && <Sparkles className="h-5 w-5 text-green-600" />}
                  {feature.icon === "Zap" && <Zap className="h-5 w-5 text-amber-600" />}
                </div>
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Capabilities
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Travel conversation</h4>
                  <p className="text-xs text-gray-500">2 hours ago • 15 minutes</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Mic className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Pronunciation practice</h4>
                  <p className="text-xs text-gray-500">Yesterday • 10 minutes</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <PenTool className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Writing correction</h4>
                  <p className="text-xs text-gray-500">2 days ago • 20 minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

