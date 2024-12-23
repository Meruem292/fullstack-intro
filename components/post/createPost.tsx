import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { ProfileForm } from "./postForm";

export const CreatePost = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Create Post</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <ProfileForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
