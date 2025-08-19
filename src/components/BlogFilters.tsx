import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'
import { getAllCategories, getAllTags } from '@/utils/blog'

interface BlogFiltersProps {
  searchQuery: string
  selectedCategory: string
  selectedTag: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onTagChange: (tag: string) => void
  onClearFilters: () => void
}

const BlogFilters = ({
  searchQuery,
  selectedCategory,
  selectedTag,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onClearFilters
}: BlogFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false)
  const categories = getAllCategories()
  const tags = getAllTags()

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 font-mono"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onCategoryChange('')}
              />
            </Badge>
          )}
          {selectedTag && (
            <Badge variant="secondary" className="gap-1">
              Tag: {selectedTag}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onTagChange('')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Filter Controls */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tag</label>
            <Select value={selectedTag} onValueChange={onTagChange}>
              <SelectTrigger>
                <SelectValue placeholder="All tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All tags</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogFilters