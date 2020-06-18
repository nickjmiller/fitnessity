/** @jsx jsx */
import { Link } from "@reach/router";
import { jsx } from "theme-ui";
import { Flex, Button, Text } from "rebass";
import { useState } from "react";
// eslint-disable-next-line import/named
import { Exercise } from "../data/exercises";

export default ({ workout }: { workout: Exercise[] }) => {
    const [hide, setHide] = useState(true);
    return (
        <header
            sx={{
                display: "grid",
                maxWidth: 768,
                maxHeight: "25vh",
                mx: "auto",
                px: 3,
                py: 3,
                gridAutoFlow: "row",
                gridTemplateColumns: [
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                ],
                variant: "styles.header",
            }}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                sx={{
                    gridColumnStart: [1, 2],
                    gridColumnEnd: [3, 3],
                    order: [0, 1],
                }}
            >
                <Link to="/" title="Home">
                    <img
                        height="60px"
                        alt="UI Logo"
                        src="/logo.png"
                    />
                    <span
                        sx={{
                            position: "absolute",
                            width: 1,
                            height: 1,
                            overflow: "hidden",
                            top: -9999,
                        }}
                    >
                        Home
                    </span>
                </Link>
            </Flex>
            <div
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >

                <Button variant="primary" onClick={() => setHide(!hide)}>{hide ? "Show Workout" : "Hide"}</Button>
                <Text px={4}>
                    {!hide ? workout.map((exercise) => exercise.title).join(", ") : null}
                </Text>
            </div>
            <div
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    order: 2,
                }}
            >
                <Link
                    to="/exercises"
                >
                    <Button variant="primary" mr={2}>Exercises</Button>
                </Link>
                <Link
                    to="/about"
                >
                    <Button variant="primary" mr={2}>About</Button>
                </Link>
            </div>
        </header>
    );
};
