import React from "react";
import {
    Box, Flex, Image, Text,
} from "rebass";

type BioProps = {
    pictureFirst: boolean;
    contributor: Contributor;
}

export type Contributor = {
    image: string;
    name: string;
    title: string;
    bio: string;
}

const Bio = ({
    contributor, pictureFirst,
}: BioProps) => (
    <Flex
        sx={{
            borderRadius: 20,
            py: 10,
            backgroundColor: "primary",
            justifyContent: "space-around",
            my: 3,
            px: 2,
            flexWrap: "wrap",
            alignItems: "center",
        }}
    >
        <Box
            sx={{
                p: 2,
                bg: "white",
                borderRadius: 5,
                height: "fit-content",
                maxWidth: 300,
                minWidth: "10em",
                mx: 4,
                order: pictureFirst ? 1 : 3,
            }}
        >
            <Image src={contributor.image} width="100%" />
        </Box>
        <Text order={2} flex={1} minWidth="20em" color="white" alignSelf="center" fontSize={[14, 17, 20]}>
            <Text fontWeight="bold">{contributor.name}:</Text>
            <Text fontStyle="italic">{contributor.title}</Text>
            {contributor.bio}
        </Text>
    </Flex>
);

export default Bio;
