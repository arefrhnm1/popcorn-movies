import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-16 mb-15">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Popcorn Movie</h2>
          <p className="mt-3 text-sm opacity-70">
            Browse and discover movies & TV shows powered by TMDB API
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              support@popcornmovie.com
            </li>
            <li>Los Angeles, CA</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-yellow-400 hover:text-yellow-300"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded bg-zinc-800 text-sm text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-black py-2 rounded text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-800 py-5 text-center text-xs text-gray-500">
        © 2025 <span className="text-yellow-400">Popcorn Movie</span> — All rights reserved | Data provided by TMDB API
      </div>
    </footer>
  );
}
