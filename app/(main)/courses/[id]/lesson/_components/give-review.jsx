"use client";

import { useState } from "react";
import { ReviewModal } from "./review-modal";
import { Star, MessageSquare } from "lucide-react";

export const GiveReview = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsReviewModalOpen(true)}
        className="w-full rounded-2xl py-2.5 px-3 sm:px-3.5 text-xs font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer overflow-hidden"
      >
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
        <span className="truncate">Leave a Course Review</span>
      </button>
      <ReviewModal open={isReviewModalOpen} setOpen={setIsReviewModalOpen} />
    </>
  );
};