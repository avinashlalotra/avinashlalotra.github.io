import BlogSection from '@/components/BlogSection'

const Posts = () => (
  <div className="h-full overflow-auto">
    <BlogSection 
      showTitle={true}
      showFilters={true}
      showPagination={true}
      postsPerPage={9}
    />
  </div>
)

export default Posts
