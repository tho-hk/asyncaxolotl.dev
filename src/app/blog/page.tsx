import { getAllPosts } from "@/lib/posts"

export default function BlogPage() {
    // testing debug function

    const posts = getAllPosts();

    return (
        <div>
            <h1>Test Post Here</h1>
            <p>ready to write?</p>


            <p>Check console for debug output!</p>
        </div>
    );
}