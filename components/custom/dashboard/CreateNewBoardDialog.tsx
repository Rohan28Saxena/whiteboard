import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Loader, Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { projectInvalidateFileSystemCache } from 'next/dist/build/swc/generated-native'


  

  function CreateNewBoardDialog() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const[dialog,setDialog]=useState(true);
  const route=useRouter();

  const handleCreateBoard = async () => {
    if (workspaceName.trim() === "" || workspaceName?.length > 30) {
      toast.add({
        type: "Error",
        title: "Invalid Workspace Name",
        description: "Please enter a valid workspace name(1-30 characters)",
      });
      return;
    }

    setLoading(true);
    const projectId = crypto.randomUUID();

    try {
      const result = await axios.post('/api/projects', {
        projectName: workspaceName,
        projectId: projectId,
      });

      console.log(result?.data);
      toast.add({
        type: 'success',
        title: 'New Workspace Created',
      });
      
      setWorkspaceName("");
      setDialog(false);
      route.push('/workspace/' + projectId);
      
    } catch (error: any) { // Explicitly typed as any, or use type guards
      console.log("Failed to create workspace:", error);
      
      // Safely access error response data
      const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';

      toast.add({
        type: 'error',
        title: 'Creation Failed',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog  onOpenChange={setDialog}>
  <DialogTrigger>
    <Button className="w-full">
        <Plus/>Create New Board
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-lg font-bold">Whiteboard Workspace Name</DialogTitle>
      
    </DialogHeader>
    <div>
        <label>Enter Whiteboard Workspace Name</label>
        <Input placeholder='Workspace name'
        onChange={(e)=>setWorkspaceName(e.target.value)}
        />

    </div>

    <DialogFooter>
      <DialogClose>
        <Button variant='outline'>Cancel</Button>
      </DialogClose>
      <Button
      disabled={workspaceName.length==0 || loading} 
      onClick={handleCreateBoard}>
        {loading&&<Loader2 className='animate-spin'/>}
        Create</Button>

    </DialogFooter>
  </DialogContent>

</Dialog>
  )
}
  

export default CreateNewBoardDialog
