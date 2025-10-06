// src/components/media/VideosSection.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosSection({ videos = [], onClose }) {
	if (!videos?.length) return null;

	// فقط تریلرهای YouTube
	const youtubeVideos = videos.filter(
		(v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
	);
	const trailer = youtubeVideos[0];

	// برای بستن با کلید ESC
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose?.();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
				onClick={onClose} // کلیک بیرون از ویدیو => بستن
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={(e) => e.stopPropagation()} // جلوگیری از بسته‌شدن با کلیک داخل ویدیو
					className="relative bg-black rounded-xl overflow-hidden w-[95%] md:w-[70%] lg:w-[60%] shadow-lg border border-yellow-500/20"
				>
					{/* دکمه بستن */}
					<button
						onClick={onClose}
						className="absolute top-3 right-3 bg-zinc-900/70 hover:bg-yellow-500/80 hover:text-black transition text-white rounded-full w-9 h-9 flex items-center justify-center"
					>
						✕
					</button>

					{/* ویدیو */}
					<div className="aspect-video w-full">
						<iframe
							className="w-full h-full"
							src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
							title={trailer.name || "Trailer"}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>

					{/* توضیحات ویدیو */}
					<div className="p-4 text-white">
						<h3 className="text-lg font-semibold">{trailer.name}</h3>
						<p className="text-sm text-gray-400 mt-1">
							Type: {trailer.type} • Site: {trailer.site}
						</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
