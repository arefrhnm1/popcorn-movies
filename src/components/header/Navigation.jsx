import React from "react";

export default function Navigation() {
    return (
        <nav className="text-white items-baseline flex justify-between">
            <div className="flex gap-10 items-baseline">
                <h1 className="text-2xl"><a href="#"><span className="text-3xl text-yellow-600 font-bold">Popcorn</span> movies</a></h1>
                <ul className="flex gap-3">
                    <li>
                        <a href="#">Movies</a>
                    </li>
                    <li>
                        <a href="#">TV shows</a>
                    </li>
                    <li>
                        <a href="#">People</a>
                    </li>
                    <li>
                        <a href="#">More</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="flex gap-3">
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li>
                        <a href="#" className="bg-yellow-900 px-4 py-2 rounded-xl">
                            Sign up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
