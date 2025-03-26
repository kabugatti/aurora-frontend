import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { successStories } from "@/data/mock-data-community"

export const SuccessStories = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Success Stories with Aurora AI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Aurora AI is transforming the way people learn English with real stories from students who have
            significantly improved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">English Student • {story.location}</p>
                  <p className="text-gray-600 italic">&quot;{story.testimonial}&quot;</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="bg-white">
            View More Stories
          </Button>
        </div>
      </div>
    </div>
  )
}

