import React from "react";
import {
    Box, Heading, Text,
} from "rebass";
import YouTube from "react-youtube";
import { Exercise } from "src/data/exercises";

type ExerciseInfoProps = {
    exercise: Exercise;
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({ exercise }) => {
    const {
        title, description, videoId, alternate,
    } = exercise;
    return (
        <Box>
            <Heading
                fontSize={[28, 33, 48]}
                color="primary"
            >
                {alternate ? "(Alternate) " : ""}{title}
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
                            origin: "https://integrum.nickmiller.dev",
                            playsinline: 1,
                            showinfo: 0,
                            mute: 1,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ExerciseInfo;
