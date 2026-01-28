"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";

const Page = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const projects = useQuery(
    api.projects.get,
    isAuthenticated ? {} : "skip"
  );

  const createProject = useMutation(api.projects.create);

  const debug = useMutation(api.projects.debugAuth);


  const handleCreate = async () => {
  await debug();
    if (!isAuthenticated) return;
    await createProject({ name: "New Project" });
  };

  if (isLoading) return <div>Loading auth...</div>;

  return (
    <SignedIn>
      <Button onClick={handleCreate}>
        ADD new
      </Button>

      {projects?.map((project) => (
        <div key={project._id}>{project.name}</div>
      ))}
    </SignedIn>
  );
};

export default Page;