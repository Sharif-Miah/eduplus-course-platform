"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Loader2, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Lock 
} from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { createSSLCommerzSession } from "@/app/actions/sslcommerz";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function EnrollCourse({ asLink, courseId, coursePrice = 99, courseTitle = "Course" }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("sslcommerz"); // Default to local payment
  const [loading, setLoading] = useState(false);

  // Price formatting
  const priceNum = typeof coursePrice === "number" ? coursePrice : parseFloat(coursePrice) || 99;
  const priceUsd = priceNum.toFixed(2);
  const priceBdt = Math.round(priceNum * 120).toLocaleString("en-BD");

  const handleOpenModal = () => {
    if (!session?.user) {
      toast.info("Please log in to enroll in this course.");
      router.push(`/login?callbackUrl=/courses/${courseId}`);
      return;
    }
    setIsOpen(true);
  };

  const handleProceedPayment = async () => {
    setLoading(true);

    try {
      if (selectedMethod === "stripe") {
        const formData = new FormData();
        formData.append("courseId", courseId);

        const response = await createCheckoutSession(formData);
        if (response?.url) {
          window.location.assign(response.url);
        } else if (response?.loginRequired) {
          router.push(`/login?callbackUrl=/courses/${courseId}`);
        } else {
          toast.error("Failed to initiate Stripe checkout session.");
          setLoading(false);
        }
      } else if (selectedMethod === "sslcommerz") {
        const formData = new FormData();
        formData.append("courseId", courseId);

        const response = await createSSLCommerzSession(formData);
        if (response?.url) {
          window.location.assign(response.url);
        } else if (response?.loginRequired) {
          router.push(`/login?callbackUrl=/courses/${courseId}`);
        } else {
          toast.error(response?.error || "Failed to initiate SSLCommerz payment session.");
          setLoading(false);
        }
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error(err.message || "Payment initiation failed.");
      setLoading(false);
    }
  };

  return (
    <>
      {asLink ? (
        <Button
          type="button"
          onClick={handleOpenModal}
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1 hover:text-[#4A3AFF]"
        >
          <span>Enroll</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      ) : (
        <button
          type="button"
          onClick={handleOpenModal}
          className="w-full bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-sm sm:text-base font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* ======================================================== */}
      {/* MULTI-GATEWAY PAYMENT SELECTOR MODAL */}
      {/* ======================================================== */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
          <DialogHeader className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-[#4A3AFF] dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Checkout</span>
            </div>
            <DialogTitle className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Select Payment Method
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Choose your preferred payment gateway to unlock lifetime access to {courseTitle}.
            </DialogDescription>
          </DialogHeader>

          {/* Gateway Options */}
          <div className="space-y-3 pt-2">
            
            {/* OPTION 1: SSLCommerz Sandbox (bKash / Nagad / Rocket / Local Cards) */}
            <div
              onClick={() => setSelectedMethod("sslcommerz")}
              className={cn(
                "relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2.5",
                selectedMethod === "sslcommerz"
                  ? "border-[#4A3AFF] bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md ring-2 ring-[#4A3AFF]/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        bKash, Nagad & Local
                      </h4>
                      <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-amber-300/40">
                        🧪 Sandbox Test
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      SSLCommerz (bKash, Nagad, Rocket, Upay, Cards)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#4A3AFF]">
                    ৳{priceBdt}
                  </div>
                  <div className="text-[10px] text-slate-400">BDT</div>
                </div>
              </div>

              {/* Badges of supported local methods */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 pl-13">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900">
                  bKash
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900">
                  Nagad
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
                  Rocket
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  Local Cards
                </span>
              </div>
            </div>

            {/* OPTION 2: Stripe (International Cards) */}
            <div
              onClick={() => setSelectedMethod("stripe")}
              className={cn(
                "relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2.5",
                selectedMethod === "stripe"
                  ? "border-[#4A3AFF] bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md ring-2 ring-[#4A3AFF]/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-md">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        International Card (Stripe)
                      </h4>
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Global
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Visa, MasterCard, American Express
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#4A3AFF]">
                    ${priceUsd}
                  </div>
                  <div className="text-[10px] text-slate-400">USD</div>
                </div>
              </div>

              {/* Badges of supported card types */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 pl-13">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Visa
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  MasterCard
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Amex
                </span>
              </div>
            </div>

          </div>

          {/* Guarantee info */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted 256-Bit SSL Checkout • Instant Access</span>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleProceedPayment}
              disabled={loading}
              className="w-full bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-sm font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Gateway...</span>
                </>
              ) : (
                <>
                  <span>
                    Proceed with {selectedMethod === "sslcommerz" ? "SSLCommerz (bKash/Nagad)" : "Stripe Card"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EnrollCourse;
