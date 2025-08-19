# Low-Level Quest Blog

A scalable, maintainable technical blog focused on low-level programming, kernel development, and hardware design.

## Features

- 🚀 **Scalable Architecture**: Add new posts easily without code changes
- 🔍 **Advanced Search**: Full-text search across all posts
- 🏷️ **Smart Filtering**: Filter by categories, tags, and more
- 📄 **Pagination**: Handle large numbers of posts efficiently
- 📱 **Responsive Design**: Beautiful on all devices
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🎨 **Modern UI**: Dark theme with terminal-inspired design
- 📝 **Markdown Support**: Write posts in markdown with frontmatter
- 🧪 **Fully Tested**: Comprehensive test suite

## Quick Start

### Adding a New Blog Post

1. **Using the generator** (recommended):
   ```bash
   node src/scripts/generate-post.js "Your Post Title"
   ```

2. **Manual approach**:
   - Add post data to `src/utils/blog.ts` in the `blogPosts` array
   - Create corresponding route if needed

### Post Structure

Each post should have:

```typescript
{
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tags: string[]
  category: string
  author: string
  published: boolean
  featured: boolean
}
```

### Categories

- `tutorials` - Step-by-step guides
- `kernel` - Linux kernel development
- `hardware` - FPGA, RTL, embedded systems

### Folder Structure

```
src/
├── components/
│   ├── BlogGrid.tsx          # Post grid display
│   ├── BlogFilters.tsx       # Search and filtering
│   ├── BlogPagination.tsx    # Pagination controls
│   ├── BlogSection.tsx       # Main blog component
│   └── BlogTemplate.tsx      # Individual post template
├── pages/
│   ├── BlogPost.tsx          # Dynamic post page
│   └── Posts.tsx             # Posts listing page
├── types/
│   └── blog.ts               # TypeScript interfaces
├── utils/
│   └── blog.ts               # Blog data and utilities
└── scripts/
    └── generate-post.js      # Post generator utility
```

## Development

### Running the Project

```bash
npm install
npm run dev
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

## Architecture

### Scalable Design

The blog is designed to be easily maintainable:

1. **Dynamic Content Loading**: Posts are loaded dynamically from data
2. **Automatic Routing**: Routes are generated automatically for all posts
3. **Component Reusability**: Modular components for different layouts
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Performance**: Optimized for large numbers of posts

### Components

- **BlogSection**: Main component with configurable features
- **BlogGrid**: Responsive grid layout for posts
- **BlogFilters**: Advanced search and filtering
- **BlogPagination**: Handle large post collections
- **BlogTemplate**: Individual post layout

### Utilities

- **Post Management**: CRUD operations for posts
- **Search & Filter**: Advanced querying capabilities
- **Pagination**: Efficient data splitting
- **Related Posts**: Smart post recommendations

## Customization

### Adding New Features

1. **New Post Types**: Extend the `BlogPost` interface in `src/types/blog.ts`
2. **Custom Filters**: Add new filter types in `BlogFilters.tsx`
3. **Layout Options**: Create new templates in `components/`
4. **Metadata**: Extend frontmatter support in utilities

### Styling

The project uses:
- **Tailwind CSS**: Utility-first styling
- **Semantic Tokens**: Consistent design system
- **Dark Theme**: Terminal-inspired color scheme
- **Responsive Design**: Mobile-first approach

## Future Enhancements

- [ ] Markdown file parsing with frontmatter
- [ ] Static site generation
- [ ] RSS feed generation
- [ ] Comment system
- [ ] Social sharing
- [ ] Analytics integration
- [ ] Search engine optimization
- [ ] Multi-author support
- [ ] Draft post management
- [ ] Content management system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Write tests for new features
5. Submit a pull request

## License

MIT License - feel free to use this project as a template for your own blog!