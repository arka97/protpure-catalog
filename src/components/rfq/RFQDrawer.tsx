import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useRFQ } from "@/context/RFQContext";
import { EnquiryForm } from "./EnquiryForm";
import { QuoteList } from "./QuoteList";

/** The quote list as a side panel, reachable from every page. */
export function RFQDrawer() {
  const { items, count, isOpen, setOpen, clear, restoreFocus } = useRFQ();
  const [done, setDone] = useState(false);

  // A fresh panel each time it is opened after a successful request.
  useEffect(() => {
    if (!isOpen) setDone(false);
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l-0 p-0 outline-none sm:max-w-[34rem]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement).focus();
        }}
        onCloseAutoFocus={restoreFocus}
      >
        <div className="shrink-0 border-b border-rule px-5 pb-5 pt-6 sm:px-8">
          <p className="label text-ink-3">Request a quote</p>
          <SheetTitle className="heading-4 mt-2">
            {done ? "Request sent" : count ? `Your quote list (${count})` : "Tell us what you need"}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review the items on your quote list, add your contact details and send the request to ProtPure.
          </SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
          {!done && count > 0 && (
            <>
              <QuoteList />
              <div className="mt-3 flex items-center justify-between text-[0.8125rem]">
                <button
                  type="button"
                  onClick={clear}
                  className="font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
                >
                  Clear the list
                </button>
                <Link
                  to="/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 font-medium text-ink-2 underline underline-offset-4 hover:text-foreground"
                >
                  Open as a full page
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
              <h3 className="mt-9 text-lg font-semibold tracking-tight">Where should we send the quotation?</h3>
            </>
          )}

          {!done && count === 0 && (
            <div className="mb-8 rounded-lg bg-paper-2 p-5">
              <p className="font-semibold">Your quote list is empty.</p>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                Add pack sizes from any product page and they collect here. Or describe what you need below and we will
                take it from there.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" asChild>
                  <Link to="/products" onClick={() => setOpen(false)}>
                    Browse products
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/applications#finder" onClick={() => setOpen(false)}>
                    Find a resin
                  </Link>
                </Button>
              </div>
            </div>
          )}

          <EnquiryForm
            className={!done && count > 0 ? "mt-5" : undefined}
            items={items}
            onSent={() => {
              setDone(true);
              clear();
            }}
            doneAction={
              <Button variant="outline" onClick={() => setOpen(false)}>
                Continue browsing
              </Button>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
