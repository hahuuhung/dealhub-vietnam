"use client";

import { useEffect, useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, ShoppingBag, Plus } from 'lucide-react';
import api from '@/lib/api';

export default function SocialFeed() {
  const [videos, setVideos] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch mock videos from backend
    api.get('/videos/feed').then(res => setVideos(res.data)).catch(console.error);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white h-screen overflow-hidden">
      {/* Navbar overlay */}
      <div className="absolute top-0 w-full z-50 flex justify-center py-6 px-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex gap-6 font-bold text-lg drop-shadow-md">
          <span className="text-white/60">Following</span>
          <span className="text-white border-b-2 border-white pb-1">For You</span>
        </div>
      </div>

      {/* Snap Container */}
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video) => (
          <VideoPlayer key={video.id} video={video} />
        ))}
        {videos.length === 0 && (
          <div className="h-screen flex items-center justify-center text-white/50">
            Loading videos...
          </div>
        )}
      </div>
    </div>
  );
}

function VideoPlayer({ video }: { video: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video._count?.likes || 0);

  useEffect(() => {
    // Intersection Observer to autoplay video when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    }, { threshold: 0.6 });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    // Silent API call
    api.post(`/videos/${video.id}/like`).catch(() => {});
  };

  return (
    <div className="relative h-screen w-full snap-start bg-neutral-900 shrink-0">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted // Muted by default to allow autoplay in browser
        onClick={togglePlay}
      />
      
      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-10">
        <div className="relative w-12 h-12">
          <img src={video.merchant?.user?.avatar_url || '/globe.svg'} alt="avatar" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>

        <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-active:scale-90 transition-transform">
            <Heart className={`w-7 h-7 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md">{likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-active:scale-90 transition-transform">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md">{video._count?.comments || 0}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-active:scale-90 transition-transform">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md">Share</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 z-10">
        <h3 className="text-white font-bold text-lg drop-shadow-md mb-2">@{video.merchant?.businessName || 'Merchant'}</h3>
        <p className="text-white/90 text-sm drop-shadow-md line-clamp-2 mb-4">
          {video.caption}
        </p>

        {/* Deal Card Overlay */}
        {video.deal && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl flex items-center gap-3 w-full max-w-sm">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{video.deal.title}</p>
              <p className="text-emerald-400 font-bold text-sm">{video.deal.dealPrice.toLocaleString('vi-VN')}đ</p>
            </div>
            <button className="bg-white text-black font-bold text-sm px-4 py-2 rounded-lg shrink-0 hover:bg-neutral-200 transition-colors">
              Mua Ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
