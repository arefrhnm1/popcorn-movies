import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import FollowUs from "./FollowUs";
import HeaderSlider from "./HeaderSlider";

export default function Header() {

    return (
        <header
            className="py-6 md:py-12 px-8"
            style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 80%),rgb(0 0 0 / 0)), url("/backgroundImage.jpg")`,
            }}
        >
            <div className="container mx-auto">
                <Navigation />
                <SearchBox />
                <FollowUs />
                <HeaderSlider/>
            </div>
        </header>
    );
}
