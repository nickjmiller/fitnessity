/** @jsx jsx */
import { Link } from "@reach/router";
import { jsx } from "theme-ui";
import { Flex, Button } from "rebass";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import ButtonModal from "./ButtonModal";
import Leaderboard from "./modal/Leaderboard";
import Welcome from "./modal/Welcome";
import ButtonLink from "./ButtonLink";

export default () => {
    const { user } = useSelector((state: RootState) => state.user);
    return (
        <header
            sx={{
                display: "grid",
                maxWidth: 768,
                width: "50vw",
                minWidth: 250,
                mx: "auto",
                pt: 2,
                flexShrink: 0,
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
                    justifyContent: "space-evenly",
                }}
            >
                <ButtonModal View={Leaderboard} text="Stats" />
                <ButtonLink href="/exercises" text="Exercises" />
            </div>
            <div
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    order: 2,
                }}
            >
                <ButtonLink href="/about" text="About" />
                {user
                    ? (
                        <Button onClick={() => Auth.signOut()} px={1} fontSize={[12, 14, 16]}>
                            Sign out
                        </Button>
                    )
                    : <ButtonModal View={Welcome} text="Sign In" />}
            </div>
        </header>
    );
};
