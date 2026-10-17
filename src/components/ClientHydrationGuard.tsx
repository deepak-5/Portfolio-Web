"use client";

import React, { useEffect, useState } from "react";

export default function ClientHydrationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main
        suppressHydrationWarning
        className="min-h-screen w-full bg-[#FAF9F6] dark:bg-[#090A0F]"
      />
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="relative z-10 min-h-screen w-full overflow-x-hidden"
    >
      {children}
    </div>
  );
}
