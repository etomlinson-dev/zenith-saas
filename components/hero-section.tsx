import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { ParticleTextEffect } from "./particle-text-effect"
import { InfiniteSlider } from "./ui/infinite-slider"
import { ProgressiveBlur } from "./ui/progressive-blur"

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex items-start justify-center pt-20">
        <ParticleTextEffect />
      </div>

      <div className="container mx-auto text-center relative z-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-balance">
            Elevate your business to <span className="text-gray-300">new heights</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white hover:bg-gray-200 text-black group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 mb-8">
            <div className="group relative m-auto max-w-6xl">
              <div className="flex flex-col items-center md:flex-row">
                <div className="md:max-w-44 md:border-r md:border-gray-600 md:pr-6 mb-4 md:mb-0">
                  <p className="text-end text-sm text-gray-400">Powering the best teams</p>
                </div>
                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                  <InfiniteSlider durationOnHover={20} duration={40} gap={112}>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/nvidia(1).svg"
                        alt="Nvidia Logo"
                        height="20"
                        width="auto"
                      />
                    </div>

                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/column(1).svg"
                        alt="Column Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/github(1).svg"
                        alt="GitHub Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/nike(1).svg"
                        alt="Nike Logo"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/lemonsqueezy(1).svg"
                        alt="Lemon Squeezy Logo"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/laravel(1).svg"
                        alt="Laravel Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-7 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/lilly(1).svg"
                        alt="Lilly Logo"
                        height="28"
                        width="auto"
                      />
                    </div>

                    <div className="flex">
                      <img
                        className="mx-auto h-6 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                        src="/images/design-mode/openai(1).svg"
                        alt="OpenAI Logo"
                        height="24"
                        width="auto"
                      />
                    </div>
                  </InfiniteSlider>

                  <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                    direction="left"
                    blurIntensity={1}
                  />
                  <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                    direction="right"
                    blurIntensity={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
