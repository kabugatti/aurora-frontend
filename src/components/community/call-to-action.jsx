import { Button } from "@/components/ui/button"

export const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey with Aurora AI</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of students who are revolutionizing their way of learning English with our advanced artificial
          intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-[#3b82f6] hover:bg-blue-50">Start Free</Button>
          <Button variant="outline" className="border-white text-white hover:bg-blue-600">
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  )
}

