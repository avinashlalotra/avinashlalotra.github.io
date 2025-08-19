#!/usr/bin/env node

/**
 * Blog Post Generator
 * 
 * Usage: node src/scripts/generate-post.js "Your Post Title"
 * 
 * This script generates a new blog post template with proper frontmatter
 * and adds it to the blog posts registry.
 */

const fs = require('fs')
const path = require('path')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function generatePost(title) {
  if (!title) {
    console.error('❌ Please provide a post title')
    console.log('Usage: node src/scripts/generate-post.js "Your Post Title"')
    process.exit(1)
  }

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]
  const postsDir = path.join(__dirname, '../content/posts')
  const postPath = path.join(postsDir, `${slug}.md`)

  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  // Check if post already exists
  if (fs.existsSync(postPath)) {
    console.error(`❌ Post "${slug}.md" already exists`)
    process.exit(1)
  }

  const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "Brief description of your post goes here..."
tags: ["tag1", "tag2", "tag3"]
category: "tutorials"
author: "Abinash Singh"
published: false
featured: false
---

# ${title}

Your blog post content goes here. Write in markdown format.

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

Add your detailed content here with:

- Code examples
- Images
- Step-by-step instructions
- Technical details

\`\`\`c
// Example code block
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

## Conclusion

Wrap up your post with key takeaways and next steps.

---

*Remember to update the frontmatter metadata before publishing!*
`

  try {
    fs.writeFileSync(postPath, frontmatter)
    console.log(`✅ Generated new blog post: ${postPath}`)
    console.log(`📝 Edit the file and update the frontmatter before publishing`)
    console.log(`🔗 URL will be: /posts/${slug}`)
    
    // Instructions for next steps
    console.log(`
📋 Next steps:
1. Edit ${slug}.md and add your content
2. Update the frontmatter metadata (tags, category, excerpt)
3. Set published: true when ready to publish
4. Add the post to src/utils/blog.ts if using static data
`)
  } catch (error) {
    console.error('❌ Error generating post:', error.message)
    process.exit(1)
  }
}

// Get title from command line arguments
const title = process.argv.slice(2).join(' ')
generatePost(title)