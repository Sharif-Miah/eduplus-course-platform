import { AccordionContent } from "@/components/ui/accordion";
import { SidebarLessonItem } from "./sidebar-lesson-items";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const SidebarLessons = ({ courseId, lessons, module }) => {
    const allLessons = [...replaceMongoIdInArray(lessons || [])].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
            {allLessons.map((lesson) => (
                <SidebarLessonItem
                    key={lesson.id}
                    courseId={courseId}
                    lesson={lesson}
                    module={module}/>
            ))}
            </div>
        </AccordionContent>
    );
};
