"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PromoStrip } from "@/components/promo-strip";
import { CategoryTabs } from "@/components/category-tabs";
import { MenuCard } from "@/components/menu-card";
import { ReservationModal } from "@/components/reservation-modal";

const menuData = {
  Breakfast: [
    {
      name: "Truffle Scramble",
      desc: "Soft eggs, chives, shaved black truffle",
      tags: ["GF"],
      price: "$24",
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
    {
      name: "Açaí & Gold Granola",
      desc: "Seasonal berries, honeycomb, toasted coconut",
      tags: ["V"],
      price: "$18",
      img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=100&h=100&fit=crop&crop=center",
    },
  ],
  Starters: [
    {
      name: "Lobster Bisque",
      desc: "Cognac cream, chive oil",
      tags: [],
      price: "$22",
      img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
    {
      name: "Burrata & Heirloom Tomatoes",
      desc: "Basil oil, aged balsamic",
      tags: ["V", "GF"],
      price: "$19",
      img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=100&h=100&fit=crop&crop=center",
    },
  ],
  Mains: [
    {
      name: "Wagyu Striploin (8oz)",
      desc: "Smoked salt, pommes purée, jus",
      tags: ["GF"],
      price: "$68",
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
    {
      name: "Chilean Sea Bass",
      desc: "Champagne beurre blanc, asparagus",
      tags: ["GF"],
      price: "$52",
      img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=100&h=100&fit=crop&crop=center",
    },
  ],
  "Chef's Specials": [
    {
      name: "Saffron Lobster Risotto",
      desc: "Carneroli rice, citrus zest",
      tags: ["GF"],
      price: "$58",
      img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
  ],
  Desserts: [
    {
      name: "Valrhona Lava Cake",
      desc: "Espresso gelato",
      tags: [],
      price: "$16",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Pistachio Panna Cotta",
      desc: "Rosewater, pistachio brittle",
      tags: ["GF"],
      price: "$14",
      img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
  ],
  Beverages: [
    {
      name: "Single-Origin Pour Over",
      desc: "Roasted in-house",
      tags: [],
      price: "$8",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Matcha Latte",
      desc: "Ceremonial grade",
      tags: [],
      price: "$9",
      img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=100&h=100&fit=crop&crop=center",
    },
  ],
  "Wine & Cocktails": [
    {
      name: "Atha Gold Martini",
      desc: "Vodka, dry vermouth, citrus oils, edible gold",
      tags: [],
      price: "$22",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=100&h=100&fit=crop&crop=center",
      isChefsPick: true,
    },
    {
      name: "Barrel-Aged Negroni",
      desc: "Gin, vermouth, Campari",
      tags: [],
      price: "$20",
      img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=100&h=100&fit=crop&crop=center",
    },
  ],
};

const dietaryTags = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-Free",
  DF: "Dairy-Free",
  N: "Contains Nuts",
};

export default function AthaResortMenu() {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const categories = Object.keys(menuData);

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories
        .map((category) =>
          document.getElementById(category.toLowerCase().replace(/\s+/g, "-"))
        )
        .filter(Boolean);

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/elephant-logo-1.png"
              alt="Atha Resort Elephant Logo"
              width={50}
              height={50}
              className="rounded-full border border-primary/50"
            />
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary">
                Atha Resort
              </h1>
              <p className="text-sm text-muted-foreground">Restaurant Menu</p>
            </div>
          </div>
          <ReservationModal />
        </div>
      </header>

      {/* Hero Section with Elephant Background */}
      <section className="relative py-16 text-center animate-fade-in overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sigiriya-elephant.png"
            alt="Sigiriya Elephant Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <Image
            src="/images/elephant-logo-1.png"
            alt="Atha Resort Elephant Logo"
            width={120}
            height={120}
            className="mx-auto mb-6 rounded-full border-2 border-primary/50"
          />
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4">
            Atha Resort
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Restaurant Menu</p>
          <p className="text-lg text-foreground/80">
            Fine dining in the heart of Atha Resort
          </p>
        </div>
      </section>

      {/* PromoStrip below hero section and above category tabs */}
      <PromoStrip />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Menu Sections */}
      <main className="container mx-auto px-4 py-8">
        {categories.map((category, categoryIndex) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="mb-16"
          >
            <div
              className={`relative ${
                categoryIndex % 3 === 1 ? "elephant-section" : ""
              }`}
            >
              {categoryIndex % 3 === 1 && (
                <>
                  <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
                    <Image
                      src={
                        categoryIndex % 6 === 1
                          ? "/images/sigiriya-elephant.png"
                          : "/images/sunset-elephants.png"
                      }
                      alt="Elephant Background"
                      fill
                      className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
                  </div>
                  <div className="relative z-10 p-8">
                    <h2 className="font-serif text-3xl font-bold text-primary mb-8 tracking-wide animate-slide-up">
                      {category}
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      {menuData[category as keyof typeof menuData].map(
                        (item, index) => (
                          <MenuCard
                            key={index}
                            name={item.name}
                            desc={item.desc}
                            tags={item.tags}
                            price={item.price}
                            img={item.img}
                            isChefsPick={item.isChefsPick}
                          />
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
              {categoryIndex % 3 !== 1 && (
                <>
                  <h2 className="font-serif text-3xl font-bold text-primary mb-8 tracking-wide animate-slide-up">
                    {category}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {menuData[category as keyof typeof menuData].map(
                      (item, index) => (
                        <MenuCard
                          key={index}
                          name={item.name}
                          desc={item.desc}
                          tags={item.tags}
                          price={item.price}
                          img={item.img}
                          isChefsPick={item.isChefsPick}
                        />
                      )
                    )}
                  </div>
                </>
              )}
            </div>
            {category !== categories[categories.length - 1] && (
              <div className="section-divider" />
            )}
          </section>
        ))}
        {/* Dietary Information */}
        <section className="mt-16 p-6 bg-card/50 rounded-lg border border-primary/20 animate-slide-up">
          <h3 className="font-serif text-xl font-semibold text-primary mb-4">
            Dietary Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(dietaryTags).map(([tag, description]) => (
              <div key={tag} className="flex items-center gap-2">
                <Badge variant="outline" className="dietary-tag">
                  {tag}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer with Elephant Background */}
      <footer className="relative border-t border-primary/20 bg-card/30 py-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sunset-elephants.png"
            alt="Sunset Elephants Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay: solid black at top → transparent below */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              Atha Resort Restaurant
            </h3>
            <p className="text-muted-foreground">
              Fine dining in the heart of Atha Resort
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Address</h4>
              <p className="text-muted-foreground">
                123 Resort Boulevard
                <br />
                Paradise Valley, PV 12345
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Hours</h4>
              <p className="text-muted-foreground">
                Breakfast: 7:00 AM - 11:00 AM
                <br />
                Dinner: 6:00 PM - 10:00 PM
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contact</h4>
              <p className="text-muted-foreground">
                Phone: (555) 123-4567
                <br />
                Email: dining@atharesort.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary/20">
            <p className="text-muted-foreground text-xs">
              © 2024 Atha Resort Restaurant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
