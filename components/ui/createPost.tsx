import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { ProfileForm } from './profileForm';

export const CreatePost = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <button>Create Post</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new post.</DialogDescription>
                </DialogHeader>
                <ProfileForm />
            </DialogContent>
        </Dialog>
    );
}

export default CreatePost;
