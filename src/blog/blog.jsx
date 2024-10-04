// Blog
import { createRoot } from "react-dom/client";
import Post1 from "./post-1.mdx";

const root = createRoot(document.querySelector("#root"));

const Index = () => (
  <main className="max-w-2xl font-mono m-auto mb-10 text-sm">
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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <li>
        <a href={``}>
          <span
            className={`flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]
              `}>
            <span
              className={`py-3 flex grow items-center ${
                !firstOfYear ? "ml-14" : ""
              }`}>
              {firstOfYear && (
                <span className="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                  {year}
                </span>
              )}

              <span className="grow dark:text-gray-100">{post.title}</span>

              <span className="text-gray-500 dark:text-gray-500 text-xs">
                {post.viewsFormatted}
              </span>
            </span>
          </span>
        </a>
      </li>
    </div>
  </main>
);

root.render(<Index />);
