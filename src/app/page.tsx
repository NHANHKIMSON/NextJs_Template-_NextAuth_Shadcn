"use client"
import {Button} from "@/components/ui/button";
import {toast} from "react-hot-toast";


export default function Home() {
  return (
      <>
        index | Page
          <Button onClick={()=> toast.success("OK Well done.")}>Click</Button>
      </>
  );
}
