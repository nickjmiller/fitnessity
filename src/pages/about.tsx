import React from "react";
import {
    Heading, Text, Flex,
} from "rebass";
import Bio, { Contributor } from "../components/Bio";

const CONTRIBUTORS: Contributor[] = [
    {
        name: "Jeremy Andrews",
        title: "Doctor of Physical Therapy",
        bio: "Jeremy graduated from California State University, Sacramento with a degree in Kinesiology with an emphasis in Exercise Science. Jeremy received his Doctorate of Physical Therapy from Samuel Merritt University. Jeremy has interest in preventative medicine as well as utilization of technology to improve acute and chronic conditions.",
        image: "https://i.imgur.com/LTM0quq.png",
    },
    {
        name: "Nick Miller",
        title: "Masters of Computer Science",
        bio: "Nick graduated from UCLA with a degree in linguistics and went on to pursue higher education in computer science at California State University, Long Beach. Nick brings experience in current industry standards and full stack development. Through his passion for exercise and fitness, Nick has led the charge with creation and development of Fitnessity.",
        image: "https://i.imgur.com/BBO435D.png",
    },
    {
        name: "Alex Corpuz",
        title: "Computer Science Student",
        bio: "Alex is currently a student at University of California, Irvine. Alex is currently pursuing a bachelors degree in computer science. Alex is interested in using his knowledge to help improve the lives of as many people as he can.",
        image: "https://i.imgur.com/BAPD97F.png",
    },
    {
        name: "Devon Johnson",
        title: "UC Davis, School of Medicine",
        bio: "Prior to medical school at UC Davis, Devon graduated from UC Berkeley with degrees in Integrative Biology and Psychology. After medical school, Devon plans to open a private practice utilizing technology such as virtual reality to further treatment plans.",
        image: "https://i.imgur.com/ocLaGrq.png",
    },
];

export default () => (
    <Flex flexDirection="column" justifyContent="space-between">
        <Heading
            fontSize={[28, 33, 48]}
            color="primary"
        >
            About Us
        </Heading>
        <Heading py={3} fontSize={[20, 24, 30]}>Mission Statement</Heading>
        <Text
            sx={{
                fontSize: [12, 17, 20],
                backgroundColor: "primary",
                color: "white",
                borderRadius: 10,
                overflow: "hidden",
                p: 3,
            }}
        >
            Our goal is to provide high quality information, backed by scientific investigation,
            to encourage a happier and healthier life through the application of physical activity.
        </Text>
        <Heading py={3} fontSize={[20, 24, 30]}>Our Story</Heading>
        <Text
            sx={{
                fontSize: [12, 17, 20],
                backgroundColor: "primary",
                color: "white",
                borderRadius: 10,
                overflow: "hidden",
                p: 3,
            }}
        >
            Fitnessity has origins dating back to 2016, when the founders explored the idea
            of providing quality workout information through digital means. Since the beginning,
            the team at Fitnessity knew how important it was for people to have access to
            information that could simplify the journey to a healthier lifestyle.
            What we strive to offer is information that can help individuals properly
            execute a workout movement, backed by science, in order to improve their life
            through physical activity and exercise.
        </Text>
        <Heading py={3} fontSize={[20, 24, 30]}>The Team</Heading>
        {CONTRIBUTORS.map(
            (contributor, index) => (
                <Bio
                    pictureFirst={!(index % 2)}
                    key={contributor.name}
                    contributor={contributor}
                />
            ),
        )}
    </Flex>
);
