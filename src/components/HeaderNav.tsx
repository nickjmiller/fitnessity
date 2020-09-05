/** @jsx jsx */
import { Link } from "@reach/router";
import { jsx } from "theme-ui";
import { Flex, Button } from "rebass";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import LeaderboardModal from "./LeaderboardModal";

export default () => {
    const { user } = useSelector((state: RootState) => state.user);
    return (
        <header
            sx={{
                display: "grid",
                maxWidth: 768,
                minWidth: "50vw",
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
                    justifyContent: "space-between",
                }}
            >
                <LeaderboardModal />
                <Link
                    to="/exercises"
                >
                    <Button variant="primary">Exercises</Button>
                </Link>
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
                    to="/about"
                >
                    <Button variant="primary" mr={2}>About</Button>
                </Link>
                {user ? <Button onClick={() => Auth.signOut()}>Sign out</Button>
                    : <Button onClick={() => Auth.federatedSignIn()}>Sign in</Button>}
            </div>
        </header>
    );
};
