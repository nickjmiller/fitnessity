import React from "react";
import {
    Heading, Text, Image, Flex,
} from "rebass";

export default () => (
    <Flex flexDirection="column">
        <Heading
            fontSize={[28, 33, 48]}
            color="primary"
        >
            About Us
        </Heading>
        <Heading py={3}>Mission Statement</Heading>
        <Text>
            Our goal is to provide high quality information, backed by scientific investigation,
            to encourage a happier and healthier life through the application of physical activity.
        </Text>
        <Heading py={3}>Our Story</Heading>
        <Text>
            Fitnessity has origins dating back to 2016, when the founders explored the idea
            of providing quality workout information through digital means. Since the beginning,
            the team at Fitnessity knew how important it was for people to have access to
            information that could simplify the journey to a healthier lifestyle.
            What we strive to offer is information that can help individuals properly
            execute a workout movement, backed by science, in order to improve their life
            through physical activity and exercise.
        </Text>
        <Heading py={3}>The Team</Heading>
        <Flex py={4} justifyContent="space-around">
            <Image src="https://i.imgur.com/LTM0quq.png" width="30vh" height="27vh" />
            <Text width={1 / 2}>
                <Text><strong>Jeremy Andrews: </strong></Text>
                <Text><i>Doctor of Physical Therapy</i></Text>
                Jeremy graduated from California State University, Sacramento with a degree in
                Kinesiology with an emphasis in Exercise Science. Jeremy received his Doctorate
                of Physical Therapy from Samuel Merritt University. Jeremy has interest in
                preventative medicine as well as utilization of technology to improve acute and
                chronic conditions.
            </Text>
        </Flex>
        <Flex py={4} justifyContent="space-around">
            <Text width={1 / 2}>
                <Text><strong>Nick Miller: </strong></Text>
                <Text><i>Masters of Computer Science</i></Text>
                Nick graduated from UCLA with a degree in linguistics and went on to pursue higher
                education in computer science at California State University, Long Beach. Nick
                brings experience in current industry standards and full stack development.
                Through his passion for exercise and fitness, Nick has led the charge with
                creation and development of Fitnessity.
            </Text>
            <Image src="https://i.imgur.com/BBO435D.png" width="30vh" height="27vh" />
        </Flex>
        <Flex py={4} justifyContent="space-around">
            <Image src="https://i.imgur.com/BAPD97F.png" width="30vh" height="27vh" />
            <Text width={1 / 2}>
                <Text><strong>Alex Corpuz: </strong></Text>
                <Text><i>Computer Science Student</i></Text>
                Alex is currently a student at University of California, Irvine. Alex is currently
                pursuing a bachelors degree in computer science. Alex is interested in using his
                knowledge to help improve the lives of as many people as he can.
            </Text>
        </Flex>
        <Flex py={4} justifyContent="space-around">
            <Text width={1 / 2}>
                <Text><strong>Devon Johnson: </strong></Text>
                <Text><i>UC Davis, School of Medicine</i></Text>
                Prior to medical school at UC Davis, Devon graduated from UC Berkeley with degrees
                in Integrative Biology and Psychology. After medical school, Devon plans to open a
                private practice utilizing technology such as virtual reality to further treatment
                plans.
            </Text>
            <Image src="https://i.imgur.com/ocLaGrq.png" width="30vh" height="27vh" />
        </Flex>
    </Flex>
);
