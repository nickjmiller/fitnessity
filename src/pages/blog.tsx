import React from "react";
import { useRouteData } from "react-static";
import { Link } from "@reach/router";

// TODO: Export to shared types
interface Post {
    body: string;
    id: number;
    title: string;
}

export default () => {
    const { posts }: { posts: Post[] } = useRouteData();

    return (
        <div>
            <h1>Blog.</h1>
            <br />
            All Posts:
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
