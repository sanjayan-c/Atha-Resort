import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

interface MenuItemProps {
  name: string
  desc: string
  tags: string[]
  price: string
  img?: string
  isChefsPick?: boolean
}

export function MenuCard({ name, desc, tags, price, img, isChefsPick }: MenuItemProps) {
  return (
    <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 animate-slide-up relative group">
      {isChefsPick && (
        <div className="chefs-pick-badge">
          <Star className="h-3 w-3 inline mr-1" />
          Chef's Pick
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex gap-4">
          {img && (
            <Image
              src={img || "/placeholder.svg"}
              alt={name}
              width={80}
              height={80}
              className="menu-item-image flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {name}
              </h3>
              <span className="font-sans text-lg font-bold text-primary ml-4 flex-shrink-0">{price}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{desc}</p>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="dietary-tag">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
