import React from "react";

export default function SearchBox() {
    return (
        <section className="container mt-12 mx-auto relative">
            <input
                type="text"
                className="w-full text-xl text-blue-900 placeholder:text-sm placeholder:text-blue-900 placeholder:opacity-70 bg-blue-200 px-4 py-2 outline-none rounded-md"
                placeholder="Search for movie ..."
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 absolute text-blue-900 right-3 top-1/2 -translate-y-1/2"
            >
                <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                />
            </svg>
        </section>
    );
}
