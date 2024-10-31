'use client'

import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces";
import { RiAddCircleFill } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import WorkspaceAvatar from "@/features/workspaces/components/WorkspaceAvatar";
export const WorkspaceSwitcher = () => {
  const {data: workspaces} = useGetWorkspaces();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="text-neutral-500 size-5 cursor-pointer hover:opacity-70" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center gap-2 justify-start font-medium">
                <WorkspaceAvatar image={workspace.imageUrl} name={workspace.name} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}