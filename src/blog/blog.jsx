// Blog
import { createRoot } from "react-dom/client";
import Post1 from "./post-1.mdx";

const root = createRoot(document.querySelector("#root"));

const posts = [
  {
    title: "Hello World",
    url: "/blog/post-1",
    views: 1000,
  },
];

const Index = () => (
  <main className="max-w-2xl font-mono m-auto mb-10 text-sm ">
    <header className="flex mb-5 md:mb-10 items-center">
      {/* <Logo /> */}

      <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
        {/* <ThemeToggle /> */}

        <a
          href="/"
          className="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]">
          About
        </a>
      </nav>
    </header>
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline mb-5">felix' writings</h1>
      <ul className="w-full">
        {posts.map((post) => (
          <li>
            <a href={post.url}>
              <span
                className={`flex transition-[background-color] hover:bg-gray-100 active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]
              `}>
                <span className={`py-3 flex grow items-center`}>
                  <span className="grow text-gray-400">{post.title}</span>

                  <span className="text-gray-500 dark:text-gray-500 text-xs">
                    {post.viewsFormatted}
                  </span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

root.render(<Index />);
