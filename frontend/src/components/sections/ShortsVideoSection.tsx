import { Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { shortVideos } from "../../data/content";

interface VideoCardProps {
  id: number;
  videoUrl: string;
  thumbnail: string;
  title: string;
  variants: Variants;
  isMuted: boolean;
  onToggleAudio: (id: number) => void;
}

const VideoCard = ({
  id,
  videoUrl,
  thumbnail,
  title,
  variants,
  isMuted,
  onToggleAudio,
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Play when 50% visible
    triggerOnce: false, // Re-trigger when scrolling back
  });

  // Synced mute state with prop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Performance Optimization: Only play when in view
  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      className="relative aspect-9/16 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-stone-900 border border-white/10"
      role="region"
      aria-label={`Short video: ${title}`}
      onClick={() => onToggleAudio(id)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        loop
        muted={isMuted} /* Controlled by parent */
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Title */}
      <div className="absolute bottom-6 left-0 w-full text-center z-20 px-4">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest drop-shadow-md">
          {title}
        </h3>
      </div>

      {/* Audio Control */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleAudio(id);
          }}
          className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all transform active:scale-95 border border-white/20"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

export const ShortsVideoSection = () => {
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null);

  const handleToggleAudio = (id: number) => {
    // If clicking the currently active (unmuted) video, mute it (set active to null)
    // If clicking a muted video, set it as active (unmute it, others will auto-mute)
    setActiveAudioId((prev) => (prev === id ? null : id));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Limit to first 4 videos
  const displayVideos = shortVideos.slice(0, 4);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-12 md:py-24 bg-wedding-slate overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-secondary mb-3 font-bold"
          >
            <span className="block w-8 h-px bg-secondary" />
            Field Videos
            <span className="block w-8 h-px bg-secondary" />
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display text-white mb-3"
          >
            Short videos of our work
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Watch real moments from our visits, student achievements, and volunteer experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              videoUrl={video.videoUrl}
              thumbnail={video.thumbnail}
              title={video.title}
              variants={itemVariants}
              isMuted={activeAudioId !== video.id}
              onToggleAudio={handleToggleAudio}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
