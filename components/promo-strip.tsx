"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const promos = [
  {
    title: "Chef's Tasting Menu",
    desc: "7-course culinary journey featuring seasonal ingredients",
    highlight: "Available Tonight",
    price: "$125/person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&crop=center",
    cta: "Reserve Now",
  },
  {
    title: "Wine Pairing Special",
    desc: "Premium wine selections perfectly matched to our signature dishes",
    highlight: "Limited Time",
    price: "20% off",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop&crop=center",
    cta: "Explore Wines",
  },
  {
    title: "Weekend Brunch",
    desc: "Elevated brunch experience with live jazz performances",
    highlight: "New Menu",
    price: "Sat-Sun 10AM-3PM",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop&crop=center",
    cta: "Book Table",
  },
  {
    title: "Private Dining",
    desc: "Intimate culinary experiences in our exclusive dining room",
    highlight: "Up to 12 guests",
    price: "Custom menus",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&crop=center",
    cta: "Inquire Now",
  },
]

export function PromoStrip() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextPromo = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length)
  }

  const prevPromo = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length)
  }

  return (
    <div className="py-6">
      <div
        className="promo-strip py-8 overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-2">Special Experiences</h2>
            <p className="text-primary-foreground/80 text-lg">
              Discover our curated dining experiences and seasonal offerings
            </p>
          </div>

          <div className="relative">
            {/* Desktop: Show multiple cards side by side */}
            <div className="hidden md:block">
              <div className="promo-cards-container">
                {promos.map((promo, index) => (
                  <div
                    key={index}
                    className={`promo-card-item animate-fade-slide ${
                      index === currentIndex ? "ring-2 ring-primary-foreground/50" : ""
                    }`}
                  >
                    <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                      <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                          {promo.highlight}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">{promo.title}</h3>
                    <p className="text-primary-foreground/90 text-sm mb-3 leading-relaxed">{promo.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-foreground font-semibold">{promo.price}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30"
                      >
                        {promo.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Horizontal swipe carousel */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevPromo}
                  className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex gap-2">
                  {promos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentIndex ? "bg-primary-foreground" : "bg-primary-foreground/40"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextPromo}
                  className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="promo-cards-container">
                {promos.map((promo, index) => (
                  <div
                    key={index}
                    className={`promo-card-item transition-transform duration-300 ${
                      index === currentIndex ? "scale-105" : "scale-95 opacity-70"
                    }`}
                    style={{
                      transform: `translateX(${(index - currentIndex) * 100}%)`,
                    }}
                  >
                    <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                      <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                          {promo.highlight}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">{promo.title}</h3>
                    <p className="text-primary-foreground/90 text-sm mb-3 leading-relaxed">{promo.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-foreground font-semibold">{promo.price}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30"
                      >
                        {promo.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
