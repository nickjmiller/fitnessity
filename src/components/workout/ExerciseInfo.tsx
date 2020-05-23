import React from "react";
import {
    Box, Heading, Text,
} from "rebass";
import YouTube from "react-youtube";

type ExerciseInfoProps = {
    title: string;
    description: string;
    videoId: string;
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({ title, description, videoId }) => (
    <Box>
        <Heading
            fontSize={[28, 33, 48]}
            color="primary"
        >
            {title}
        </Heading>
        <Text
            fontSize={[12, 17, 22]}
            color="secondary"
        >
            {description}
        </Text>
        <Box sx={{
            height: "45vh",
            ".video": {
                height: "100%",
            },
        }}
        >
            <YouTube
                videoId={videoId}
                containerClassName="video"
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        controls: 0,
                        rel: 0,
                        playlist: videoId,
                        loop: 1,
                        origin: window.location.href,
                        playsinline: 1,
                        showinfo: 0,
                        mute: 1,
                    },
                }}
            />
        </Box>
    </Box>
);

export default ExerciseInfo;
