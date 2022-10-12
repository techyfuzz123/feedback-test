import React, { useEffect, useState } from "react";

export default function Header() {

  return (
    <>
      <div
        className="sticky top-0 w-full left-0 bg-slate-900  flex items-center justify-between p-4
      border-b border-solid border-white"
      >
        <h1 className="text-3xl select-none sm:text-6xl">Feedback</h1>
      </div>
    </>
  );
}
