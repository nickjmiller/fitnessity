import React from "react";
import {
    Box, Heading, Text,
} from "rebass";

type ExerciseInfoProps = {
    title: string;
    description: string;
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({ title, description }) => (
    <Box>
        <Heading
            fontSize={[50, 50, 50]}
            color="primary"
        >
            {title}
        </Heading>
        <Text
            fontSize={[30, 30, 30]}
            color="secondary"
        >
            {description}
        </Text>
    </Box>
);

export default ExerciseInfo;
