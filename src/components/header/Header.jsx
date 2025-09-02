import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBox from "./searchbox/SearchBox";
import FollowUs from "./FollowUs";
import HeaderSlider from "./HeaderSlider";
import { useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();
	const [bg, setBg] = useState("/backgroundImage.jpg");
	const [hoverBg, setHoverBg] = useState(null); // تصویر هنگام هاور
	const [blurLevel, setBlurLevel] = useState(0); // blur دینامیک
	const [brightness, setBrightness] = useState(70); // روشنایی اولیه
	const [overlayOpacity, setOverlayOpacity] = useState(50); // opacity overlay

	const handleHover = (newBg) => {
		setHoverBg(newBg);
		setBlurLevel(1);
		setBrightness(100);
		setOverlayOpacity(60);
	};

	const handleLeave = () => {
		setHoverBg(null);
		setBlurLevel(1);
		setBrightness(70);
		setOverlayOpacity(50);
	};
	return (
		<header
			className={`relative overflow-hidden py-6 md:py-12 px-8 ${location.pathname !== "/" ? "h-[50vh]" : ""}`}
		>
			<img
				src={bg}
				alt="header background"
				className="absolute inset-0 w-full h-full object-cover filter blur-sm transition-opacity duration-1000 ease-in-out"
				style={{
					filter: `blur(${blurLevel}px) brightness(${brightness}%)`,
				}}
			/>
			{hoverBg && (
				<img
					src={hoverBg}
					alt="hover background"
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
					style={{ opacity: 1 }}
					onTransitionEnd={() => {
						if (!hoverBg) setBg("/backgroundImage.jpg");
						else setBg(hoverBg);
					}}
				/>
			)}
			<div
				className="absolute inset-0 bg-black transition-all duration-900"
				style={{opacity: overlayOpacity /100}}
			></div>
			<div className="relative z-10 flex flex-col h-full container mx-auto">
				<Navigation />
				<SearchBox />
				<div className={`${location.pathname !== "/" && "hidden"}`}>
					<FollowUs />
					<HeaderSlider setBg={handleHover} resetBg={handleLeave} />
				</div>
			</div>
		</header>
	);
}
