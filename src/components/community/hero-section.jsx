import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
    <div className="bg-[#3b82f6] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">AI Learning Community</h1>
          <p className="text-xl max-w-2xl mb-8">
            Connect with students from around the world, share experiences, and maximize your English learning with
            Aurora, our specialized AI.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-[#3b82f6] hover:bg-blue-50">Start Practicing</Button>
            <Button className="bg-white text-[#3b82f6] hover:bg-blue-50 border-white">Explore Tools</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

