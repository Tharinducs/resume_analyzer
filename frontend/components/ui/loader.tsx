"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react"; // optional icon
import React from "react";
import { useSelector } from "react-redux";

function GlobalLoader(props: React.ComponentProps<"div"> ) {
  const { loading } = useSelector((state: RootState) => state.loader);
  return (
    <Dialog.Root open={loading}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-overlayShow z-[9999]"
        />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center z-[10000]"
        >
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
            <p className="text-white mt-3 text-lg font-medium">Loading...</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GlobalLoader;
