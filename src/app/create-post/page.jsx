import CreatePostForm from "@/components/createPostForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <CreatePostForm />
    </div>
  );
};
export default CreatePostPage;
