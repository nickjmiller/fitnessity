/** @jsx jsx */
import { Link } from "@reach/router";
import { jsx } from "theme-ui";
import { Flex, Button } from "rebass";
import ExerciseListModal from "./ExerciseListModal";

export default () => (
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
            <ExerciseListModal />
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
