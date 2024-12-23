import CreatePost from "@/components/post/createPost";
import PostTable from "@/components/post/postTable";

export default function Profile(){
    return(
        <main className="align-center justify-center flex flex-col h-screen space-y-4">
            <h1>Welcome to my site</h1>
            <CreatePost />
            <PostTable />
        </main>
    )
}