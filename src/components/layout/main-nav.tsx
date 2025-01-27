import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/lib/constants/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold text-xl">{siteConfig.name}</span>
      </Link>
      <nav className="flex gap-6">
        {siteConfig.mainNav?.map(
          (item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium text-neutral-600 hover:text-[#FF6B6B]",
              )}
            >
              {item.title}
            </Link>
          )
        )}
        <Button asChild variant="default" size="sm">
          <Link href="/create-song">Create Song</Link>
        </Button>
      </nav>
    </div>
  )
}
