"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Youtube, PlayCircle, CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number; // 0-100
  locked: boolean;
  thumbnailUrl: string;
  videoUrl?: string; // In real app, URL to video
  dataAiHint: string;
}

const mockTrainingVideos: TrainingVideo[] = [
  { id: "VID001", title: "Introduction to Affiliate Marketing", description: "Learn the basics of affiliate marketing and how to get started with ProMillion.", duration: "15:30", progress: 100, locked: false, thumbnailUrl: "https://placehold.co/300x170.png", dataAiHint: "business presentation" },
  { id: "VID002", title: "Understanding Your Dashboard", description: "A comprehensive guide to navigating and utilizing all features of your affiliate dashboard.", duration: "22:10", progress: 75, locked: false, thumbnailUrl: "https://placehold.co/300x170.png", dataAiHint: "computer screen" },
  { id: "VID003", title: "Effective Promotion Strategies", description: "Discover proven techniques to maximize your reach and conversions.", duration: "35:00", progress: 20, locked: false, thumbnailUrl: "https://placehold.co/300x170.png", dataAiHint: "marketing strategy" },
  { id: "VID004", title: "Advanced SEO for Affiliates", description: "Dive deep into SEO tactics to boost your organic traffic and sales.", duration: "45:50", progress: 0, locked: true, thumbnailUrl: "https://placehold.co/300x170.png", dataAiHint: "seo analytics" },
  { id: "VID005", title: "Analyzing Your Performance", description: "Learn how to interpret your earnings reports and optimize your campaigns.", duration: "18:25", progress: 0, locked: true, thumbnailUrl: "https://placehold.co/300x170.png", dataAiHint: "charts data" },
];


export default function TrainingVideosPage() {
  const [selectedVideo, setSelectedVideo] = React.useState<TrainingVideo | null>(mockTrainingVideos[0]);
  const [videos, setVideos] = React.useState(mockTrainingVideos);

  const handleSelectVideo = (video: TrainingVideo) => {
    if (!video.locked) {
      setSelectedVideo(video);
    }
  };

  // Simulate progress update
  const markAsComplete = (videoId: string) => {
     setVideos(prevVideos => prevVideos.map(v => v.id === videoId ? {...v, progress: 100} : v));
     if(selectedVideo?.id === videoId) {
       setSelectedVideo(prev => prev ? {...prev, progress: 100} : null);
     }
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">Training Videos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Section */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            {selectedVideo ? (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedVideo.title}</CardTitle>
                  <CardDescription>{selectedVideo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                    {/* Placeholder for embedded video player */}
                    <Image src={selectedVideo.thumbnailUrl} alt={selectedVideo.title} layout="fill" objectFit="cover" data-ai-hint={selectedVideo.dataAiHint} />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                       <PlayCircle className="h-20 w-20 text-white/80 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress: {selectedVideo.progress}%</span>
                      <span className="text-sm text-muted-foreground">Duration: {selectedVideo.duration}</span>
                    </div>
                    <Progress value={selectedVideo.progress} aria-label={`${selectedVideo.title} progress`} />
                    {selectedVideo.progress < 100 && (
                       <Button onClick={() => markAsComplete(selectedVideo.id)} size="sm" className="mt-2">Mark as Complete</Button>
                    )}
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="p-8 text-center text-muted-foreground">Select a video to start learning.</div>
            )}
          </Card>
        </div>

        {/* Playlist Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Playlist</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto space-y-3 pr-2">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`p-3 rounded-md border flex items-start gap-3 transition-all cursor-pointer hover:bg-muted/50
                    ${selectedVideo?.id === video.id ? "bg-muted border-primary shadow-md" : ""}
                    ${video.locked ? "opacity-60 cursor-not-allowed hover:bg-transparent" : ""}`}
                >
                  <Image src={video.thumbnailUrl} alt={video.title} width={100} height={56} className="rounded object-cover aspect-video" data-ai-hint={video.dataAiHint.split(' ')[0]}/>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      {video.locked ? <Lock className="h-3 w-3 text-destructive" /> : video.progress === 100 ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Youtube className="h-3 w-3 text-primary/70" />}
                      <span className="text-xs text-muted-foreground">
                         {video.locked ? "Locked" : video.progress === 100 ? "Completed" : `${video.progress}% Watched`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
