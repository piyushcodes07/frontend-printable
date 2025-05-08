"use client";
import React, { useEffect, useState } from "react";
import SignProvider from "../useSign";
import { Input } from "@/components/ui/input";
// import UseStorage from "@/hooks/useStorage";
// interface Props {
//   children: React.ReactNode;
//   searchParams?: { id?: string };
// }

function Layout(
  { children }: { children: React.ReactNode } /*searchParams = {} }: Props*/
) {
  // const [file, setFile] = useState<File[] | null>(null);
  // const [fileId, setFileId] = useState("");
  // const { uploadFile } = UseStorage();
  // useEffect(() => {
  //   const { id } = searchParams;
  //   if (id) setFileId(id);
  // }, [searchParams]);
  // const handleFileUpload = (e) => {
  //   const selected = e.target.files;
  //   if (selected) setFile(Array.from(selected));
  // };

  return (
    <>
      <SignProvider>{children}</SignProvider>
    </>
  );
}

export default Layout;
