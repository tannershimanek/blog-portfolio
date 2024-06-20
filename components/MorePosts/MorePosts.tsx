import Avatar from "@/app/avatar";
import DateComponent from "@/app/date";
import Link from "next/link";

export const MorePosts = ({ posts }: { posts: any[] }) => {
  console.log(posts);

  return (
    <div className="bg-white mb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            More stories
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col items-start justify-start"
            >
              <div className="relative w-full">
                <Link
                
                  href={`/blog/posts/${post.slug}`}
                  aria-label={post.coverImage.title}
                >
                  <img
                    src={post.coverImage.url}
                    alt={post.coverImage.description}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </Link>
              </div>
              <div className="max-w-xl">
                <div className="mt-8 mb-2 flex items-center gap-x-4 text-sm">
                  <DateComponent dateString={post.date} />
                  <Link
                    href={`/blog/categories/${post?.category.toLowerCase()}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 text-xs"
                  >
                    {post.category}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="text-2xl mb-3 leading-snug">
                    <Link className="hover:underline" href={`/posts/${post?.slug}`}>
                      <span className="absolute inset-0" />
                      {post?.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post?.description}
                  </p>
                </div>
                <div className="relative mt-2 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    {
                      <Avatar
                        name={post.author.name}
                        picture={post.author.picture}
                      />
                    }
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
