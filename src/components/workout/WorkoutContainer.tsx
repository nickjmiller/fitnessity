import React from "react";
import {
    Box, Button, Flex, Text,
} from "rebass";
import { Slider, Label } from "@rebass/forms";
import ExerciseInfo from "./ExerciseInfo";

type WorkoutContainerProps = {
}

type WorkoutContainerState = {
    currentActivity: "set" | "rest" | "none";
    currentTimer: number;
    defaultSetTime: number;
    defaultRestTime: number;
    paused: boolean;
}

export default class WorkoutContainer extends
    React.Component<WorkoutContainerProps, WorkoutContainerState> {
    private interval: any;

    constructor(props: WorkoutContainerProps) {
        super(props);
        this.state = {
            currentActivity: "none",
            currentTimer: 0,
            defaultSetTime: 60,
            defaultRestTime: 60,
            paused: false,
        };
    }

    countDownTimer = (startTime: number) => new Promise((resolve) => {
        this.setState({
            currentTimer: startTime,
        });
        this.interval = setInterval(() => {
            const { currentTimer, paused } = this.state;
            if (paused) {
                return;
            }
            if (currentTimer > 0) {
                this.setState({
                    currentTimer: currentTimer - 1,
                });
            } else {
                clearInterval(this.interval);
                resolve();
            }
        }, 1000);
    });

    pausePress = () => {
        const { paused } = this.state;
        this.setState({
            paused: !paused,
        });
    }

    skipPress = () => {
        this.setState({
            currentTimer: 0,
        });
    }

    startTimer = async () => {
        const { defaultRestTime, defaultSetTime } = this.state;
        this.setState({
            currentActivity: "set",
        });
        await this.countDownTimer(defaultSetTime);
        this.setState({
            currentActivity: "rest",
        });
        await this.countDownTimer(defaultRestTime);
        this.setState({
            currentActivity: "none",
        });
    }

    setDefaultTimer = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            defaultSetTime: parseInt(event.target.value, 10),
        });
    }

    setDefaultRest = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            defaultRestTime: parseInt(event.target.value, 10),
        });
    }

    render(): JSX.Element {
        const {
            currentActivity, currentTimer, defaultSetTime, defaultRestTime, paused,
        } = this.state;
        return (
            <Box>
                <ExerciseInfo title="Test title" description="Test description" />
                <Flex justifyContent="space-between">
                    <Box width={1 / 6}>
                        <Label>
                            Default Set:
                            {` ${defaultSetTime}s`}
                        </Label>
                        <Slider
                            name="Set Length"
                            defaultValue={defaultSetTime}
                            onChange={this.setDefaultTimer}
                            min="5"
                            max="120"
                        />
                        <Label>
                            Default Rest:
                            {` ${defaultRestTime}s`}
                        </Label>
                        <Slider
                            name="Rest Length"
                            defaultValue={defaultRestTime}
                            onChange={this.setDefaultRest}
                            min="5"
                            max="120"
                        />
                    </Box>
                    <Box
                        sx={{
                            maxWidth: "60vw",
                        }}
                        width={3 / 6}
                    >
                        <iframe
                            title="Workouts"
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/AqzDJHxynwo?controls=0&showinfo=0&rel=0&loop=1&autoplay=1&mute=1&origin=https://integrum.nickmiller.dev"
                            frameBorder="0"
                        />
                    </Box>
                    <Flex
                        width={1 / 6}
                        justifyContent="space-around"
                        flexDirection="column"
                        minHeight="200px"
                    >
                        <Button disabled={currentActivity !== "none"} variant="primary" onClick={this.startTimer}>Go!</Button>
                        <Button disabled={!currentTimer} variant="outline" onClick={this.skipPress}>Skip</Button>
                        <Button disabled={!(paused || currentTimer)} variant="outline" onClick={this.pausePress}>{paused ? "Resume" : "Pause"}</Button>
                    </Flex>
                </Flex>
                <Box>
                    <Text>{currentTimer ? ` ${currentActivity === "set" ? "Timer: " : "Rest: "}${currentTimer}` : ""}</Text>
                </Box>
            </Box>
        );
    }
}
