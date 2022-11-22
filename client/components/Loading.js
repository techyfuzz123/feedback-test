import React from "react";

export default function Loading({light}) {
  return (
    <>

      <div className={`${light ? "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" : ""}`}></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          role="status"
          className="flex  flex-col items-center justify-center min-h-screen"
        >
          <div className=""></div>
          <span className="">Loading...</span>
        </div>
      </div>
    </>
  );
}
