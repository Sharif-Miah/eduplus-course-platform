"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { SidebarLessons } from "./sidebar-lessons";
import { useSearchParams } from "next/navigation";
import { Layers } from "lucide-react";

export const SidebarModules = ({ courseId, modules }) => {
  const searchParams = useSearchParams();
  const allModules = [...replaceMongoIdInArray(modules || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  const query = searchParams?.get("name");

  const expandModule = allModules.find((module) => {
    return (module.lessonIds || []).find((lesson) => {
      return lesson.slug === query;
    });
  });

  const expandModuleId = expandModule?.id ?? allModules[0]?.id;

  if (allModules.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 font-medium">
        No modules published for this course yet.
      </div>
    );
  }

  return (
    <Accordion
      defaultValue={expandModuleId}
      type="single"
      collapsible
      className="w-full px-4 space-y-3"
    >
      {allModules.map((module, idx) => {
        const totalModuleLessons = module?.lessonIds?.length || 0;
        const completedLessons = (module?.lessonIds || []).filter((l) => l.state === "completed").length;
        const isModuleAllCompleted = totalModuleLessons > 0 && completedLessons === totalModuleLessons;

        return (
          <AccordionItem
            key={module.id || idx}
            value={module.id || `module-${idx}`}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100/90 dark:border-slate-800 shadow-xs overflow-hidden transition-all duration-200 data-[state=open]:border-indigo-100 dark:data-[state=open]:border-slate-700 data-[state=open]:ring-2 data-[state=open]:ring-[#4A3AFF]/10"
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline text-left group cursor-pointer">
              <div className="flex items-center gap-3 pr-2 w-full">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4A3AFF] dark:text-indigo-300 text-xs font-black flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {idx + 1}
                </span>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#4A3AFF] transition-colors truncate">
                    {module.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                    {completedLessons} / {totalModuleLessons} Completed
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <SidebarLessons
              courseId={courseId}
              lessons={module.lessonIds}
              module={module.slug}
            />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
