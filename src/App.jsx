import Header from "./components/Header";
import Post from "./components/Post";
import ScrollTop from "./components/ScrollTop";
import Sidebar from "./components/Sidebar";
import WritePost from "./components/WritePost";
import { PuffLoader } from "react-spinners";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMessages } from "./api";
import { useEffect, useRef } from "react";
import { CircleCheckBig } from "lucide-react";

export default function App() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    retry: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextKey : undefined,
  });

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-primary text-light flex px-12">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="px-8 flex flex-col gap-1">
          <WritePost />

          {isLoading ? (
            <div className="flex items-center justify-center mb-6">
              <PuffLoader color={"#03a9f4"} size={50} />
            </div>
          ) : (
            <>
              {posts?.pages.map((page) =>
                page.items.map((item) => (
                  <Post
                    key={item.id}
                    content={item.content}
                    user={item.user_id}
                    date={item.timestamp_utc_iso8601}
                  />
                ))
              )}

              <div ref={loaderRef} className="flex justify-center p-4">
                {isFetchingNextPage ? (
                  <PuffLoader color={"#03a9f4"} size={40} />
                ) : hasNextPage ? (
                  <PuffLoader color={"#03a9f4"} size={40} />
                ) : (
                  <CircleCheckBig className="text-accent" size={40} />
                )}
              </div>
            </>
          )}
        </main>

        <ScrollTop />
      </div>
    </div>
  );
}
