/* eslint-disable no-await-in-loop */
import React from "react";
import {
    Box, Button, Flex, Text,
} from "rebass";
import { Slider, Label } from "@rebass/forms";
import ExerciseInfo from "./ExerciseInfo";
// eslint-disable-next-line
import { Exercise } from "../../data/exercises";
let UIfx: any;

// document is not defined during react-static compilation
if (typeof document !== "undefined") {
    // eslint-disable-next-line global-require
    UIfx = require("uifx").default;
}

type WorkoutContainerProps = {
    workout: Exercise[]
}

type WorkoutContainerState = {
    currentActivity: "set" | "rest" | "none" | "countdown" | "complete";
    currentIndex: number;
    currentTimer: number;
    defaultSets: number;
    defaultSetTime: number;
    defaultRestTime: number;
    paused: boolean;
}

export default class WorkoutContainer extends
    React.Component<WorkoutContainerProps, WorkoutContainerState> {
    private countdown = UIfx ? new UIfx("sounds/countdown.mp3") : undefined;

    private interval: any;

    private sets: number;

    private activityTextMap: any = {
        countdown: {
            text: "Ready in:",
            color: "green",
        },
        set: {
            text: "Time Remaining:",
        },
        rest: {
            text: "Resting:",
        },
        none: {
            text: "",
            color: "black",
        },
        complete: {
            text: "Workout Complete!",
        },
    }

    constructor(props: WorkoutContainerProps) {
        super(props);
        this.state = {
            currentActivity: "none",
            currentIndex: 0,
            currentTimer: 0,
            defaultSets: 3,
            defaultSetTime: 40,
            defaultRestTime: 60,
            paused: false,
        };
    }

    countDownTimer = (startTime: number) => new Promise((resolve) => {
        this.setState({
            currentTimer: startTime,
        });
        if (startTime < 7) {
            this.countdown.play();
        }
        this.interval = setInterval(() => {
            const { currentTimer, paused } = this.state;
            if (paused) {
                return;
            }
            this.setState({
                currentTimer: currentTimer - 1,
            });
            if (currentTimer < 7 && currentTimer > 1) {
                this.countdown.play();
            }
            if (currentTimer < 1) {
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
            paused: false,
        });
    }

    startTimer = async () => {
        const {
            currentIndex, defaultSets, defaultRestTime, defaultSetTime,
        } = this.state;
        const { workout } = this.props;
        const { alternate } = workout[currentIndex];
        this.sets = defaultSets + ((alternate && defaultSets % 2) ? 1 : 0);
        while (this.sets > 0) {
            this.setState({
                currentActivity: "countdown",
            });
            await this.countDownTimer(3);
            this.setState({
                currentActivity: "set",
            });
            await this.countDownTimer(defaultSetTime);
            this.sets--;
            if (!alternate || !(this.sets % 2)) {
                this.setState({
                    currentActivity: "rest",
                });
                await this.countDownTimer(defaultRestTime);
            }
        }
        if (currentIndex < workout.length - 1) {
            this.setState({
                currentActivity: "none",
                currentIndex: currentIndex + 1,
            });
        } else {
            this.setState({
                currentActivity: "complete",
            });
        }
    }

    setDefaultSets = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            defaultSets: parseInt(event.target.value, 10),
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
            currentActivity,
            currentIndex,
            currentTimer,
            defaultSets,
            defaultSetTime,
            defaultRestTime,
            paused,
        } = this.state;
        const { workout } = this.props;
        return (
            <Box px="5vw">
                <ExerciseInfo exercise={workout[currentIndex]} />
                <Flex justifyContent="flex-start" maxWidth="500px">
                    <Text fontWeight="bold" width={2 / 5} color={this.activityTextMap[currentActivity].color}>
                        {currentTimer > 0 ? `${this.activityTextMap[currentActivity].text} ${currentTimer}` : ""}
                        {currentActivity === "complete" ? `${this.activityTextMap[currentActivity].text}` : ""}
                        &nbsp;
                    </Text>
                    <Text fontWeight="bold" width={2 / 5}>
                        {["none", "complete"].includes(currentActivity) ? "" : `Sets remaining: ${this.sets}`}
                        &nbsp;
                    </Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Box width={2 / 5}>
                        <Label>
                            Default Sets (applies next exercise):
                            {` ${defaultSets}`}
                        </Label>
                        <Slider
                            name="Set Length"
                            defaultValue={defaultSets}
                            onChange={this.setDefaultSets}
                            min="1"
                            max="12"
                        />
                        <Label>
                            Default Set Time:
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
                    <Flex
                        width={2 / 5}
                        justifyContent="space-around"
                        flexDirection="column"
                    >
                        <Button disabled={currentActivity !== "none"} variant="primary" onClick={this.startTimer}>Go!</Button>
                        <Button disabled={!currentTimer} variant="outline" onClick={this.skipPress}>Skip</Button>
                        <Button disabled={!(paused || currentTimer)} variant="outline" onClick={this.pausePress}>{paused ? "Resume" : "Pause"}</Button>
                    </Flex>
                </Flex>
            </Box>
        );
    }
}
