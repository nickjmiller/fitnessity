import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Text, Flex } from "rebass";
import { API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { setLeaderboard, User } from "../features/user/userSlice";
import { RootState } from "../app/rootReducer";

const getCurrentLeaderboard = async (dispatch: any, setLoading: any) => {
    setLoading(true);
    try {
        const response: { data: User[] } = await API.get("fitnessityApi", "/users", { headers: {} });
        dispatch(setLeaderboard(response.data.sort((a, b) => b.logins - a.logins)));
    } catch {
        // TODO: Show error to users
    }
    setLoading(false);
};

export default withAuthenticator(() => {
    const { user, leaderboard } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        getCurrentLeaderboard(dispatch, setLoading);
    }, []);
    return (
        <Flex flexDirection="column" minWidth={350} width="50vw">
            <Flex flexDirection="row" justifyContent="space-between">
                <Text fontWeight="bold" fontSize={[14, 17, 20]}>Leaderboard</Text>
                <Button
                    variant="secondary"
                    disabled={loading || !user}
                    onClick={
                        () => getCurrentLeaderboard(dispatch, setLoading)
                    }
                >{loading ? "Loading" : "Refresh"}
                </Button>
            </Flex>
            {user ? null : <Text>You need to be logged in to view the leaderboard.</Text>}
            <Flex flexDirection="row">
                <Text
                    p={1}
                    fontWeight="bold"
                    flex={1}
                >
                    User
                </Text>
                <Text
                    p={1}
                    fontWeight="bold"
                    flex={1}
                >
                    Logins
                </Text>
                <Text
                    p={1}
                    fontWeight="bold"
                    flex={1}
                >
                    Last Login
                </Text>
            </Flex>
            {leaderboard.map((item) => (
                <Flex px={2} flexDirection="row" key={item.user} color={item.user === user ? "green" : null}>
                    <Text
                        p={1}
                        flex={1}
                    >
                        {item.user}
                    </Text>
                    <Text
                        p={1}
                        flex={1}
                    >
                        {item.logins}
                    </Text>
                    <Text
                        p={1}
                        flex={1}
                    >
                        {item.lastLogin}
                    </Text>
                </Flex>
            ))}
        </Flex>
    );
});
