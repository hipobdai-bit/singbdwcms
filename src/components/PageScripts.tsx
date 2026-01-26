"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // Small timeout to ensure DOM is updated by React before we run vanilla JS scripts
    const timer = setTimeout(() => {
      // Re-initialize AOS
      if ((window as any).AOS) {
        (window as any).AOS.refresh();
      }

      // Re-initialize Product Detail Modals if function exists
      if (typeof (window as any).initProductDetailModals === "function") {
        (window as any).initProductDetailModals();
      }
      
      // Re-initialize Lazy Loading images if applicable
      // Re-initialize other potential UI scripts
      if (typeof (window as any).initProductsPage === "function") {
          (window as any).initProductsPage();
      }

    }, 300); // 300ms delay to be safe

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
