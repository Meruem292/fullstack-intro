import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog";

  
  export const UpdatePost = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button>Update</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdatePost;
  