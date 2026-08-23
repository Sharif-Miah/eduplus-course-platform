"use client";

import { useState, useEffect } from "react";

// import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as z from "zod";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }) => {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (file) {
      async function uploadFile() {
        try {
          const formData = new FormData();
          formData.append("files", file[0]);
          formData.append("destination", "./public/assets/images/courses");
          formData.append("courseId", courseId);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
          });
          const result = await response.text();
          console.log(result);
          if (response.status === 200) {
            initialData.imageUrl = `/assets/images/courses/${file[0].path}`;
            toast.success(result);
            toggleEdit();
            router.refresh();
          }
        } catch (e) {
          toast.error(e.message);
        }
      }

      uploadFile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs text-slate-900 dark:text-slate-100 transition-colors">
      <div className="font-bold text-sm flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit} className="dark:text-slate-200 dark:hover:bg-slate-800">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mt-3 border border-dashed border-slate-200 dark:border-slate-700">
            <ImageIcon className="h-10 w-10 text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-3 rounded-2xl overflow-hidden shadow-sm">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-2xl"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className="mt-3">
          <UploadDropzone onUpload={(file) => setFile(file)}/>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
