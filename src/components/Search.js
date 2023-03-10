import { Input } from "@material-tailwind/react";
 
export default function Search() {
  return (
    <div className="flex flex-col w-72 gap-6">
      <Input variant="static" label="Static" placeholder="Static" />
      <Input variant="standard" label="Standard" />
    </div>
  );
}