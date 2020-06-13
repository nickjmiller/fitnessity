/* eslint-disable no-await-in-loop */
import React from "react";
import memoize from "memoize-one";
import {
    Box, Button, Flex, Text,
} from "rebass";
import { Slider, Label } from "@rebass/forms";
import Timer, { TimerControls } from "react-compound-timer";
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
    currentSets: number;
    defaultSets: number;
    defaultSetTime: number;
    defaultRestTime: number;
}

type ActivityMap = {
    [key: string]: {
        text: JSX.Element | string,
        color?: string,
        changeState: (setTime: TimerControls["setTime"]) => void,
    }
}

export default class WorkoutContainer extends
    React.Component<WorkoutContainerProps, WorkoutContainerState> {
    private countdown = UIfx ? new UIfx(`${window.location.origin}/sounds/countdown.mp3`) : undefined;

    private start = UIfx ? new UIfx(`${window.location.origin}/sounds/start.mp3`) : undefined;

    private timerDone = UIfx ? new UIfx(`${window.location.origin}/sounds/timerDone.mp3`) : undefined;

    private activityTextMap: ActivityMap = {
        countdown: {
            text: <>Ready in: <Timer.Seconds /> seconds</>,
            color: "green",
            changeState: (setTime) => this.startSet(setTime),
        },
        set: {
            text: <>Time Remaining: <Timer.Seconds /> seconds</>,
            changeState: (setTime) => this.handleSetComplete(setTime),
        },
        rest: {
            text: <>Resting: <Timer.Seconds /> seconds</>,
            changeState: (setTime) => this.startSet(setTime),
        },
        none: {
            text: "",
            color: "black",
            changeState: (setTime) => this.startWorkout(setTime),
        },
        complete: {
            text: "Workout Complete!",
            changeState: () => { },
        },
    }

    constructor(props: WorkoutContainerProps) {
        super(props);
        this.state = {
            currentActivity: "none",
            defaultSets: 3,
            defaultSetTime: 40,
            defaultRestTime: 60,
            currentSets: 3,
            currentIndex: 0,
        };
    }

    componentDidUpdate(newProps: WorkoutContainerProps) {
        const { workout } = this.props;
        if (newProps.workout !== workout) {
            this.stop();
        }
    }

    getCurrentExercise = memoize(
        (workout, index) => workout[index],
    );

    private stop = () => { };

    pause = (resume: TimerControls["resume"], pause: TimerControls["pause"], getTimerState: TimerControls["getTimerState"]) => () => {
        const state = getTimerState();
        if (state === "PLAYING") {
            pause();
        } else {
            resume();
        }
    }

    handleSetComplete = (setTime: TimerControls["setTime"]) => {
        const { currentSets, currentIndex, defaultRestTime } = this.state;
        const { workout } = this.props;
        if (currentSets === 1) {
            this.getNextExercise();
            return;
        }
        this.setState({
            currentSets: currentSets - 1,
        });
        if (workout[currentIndex].alternate && !(currentSets % 2)) {
            this.startCountdown(setTime);
        } else {
            this.timerDone.play();
            setTime(defaultRestTime * 1000 + 10);
            this.setState({
                currentActivity: "rest",
            });
        }
    }

    setActivity = (start: TimerControls["start"], setTime: TimerControls["setTime"]) => () => {
        const { currentActivity } = this.state;
        this.activityTextMap[currentActivity].changeState(setTime);
        start();
    }

    setCheckpointsForActivity = (start: TimerControls["start"], setTime: TimerControls["setTime"], setCheckpoionts: TimerControls["setCheckpoints"]) => {
        setCheckpoionts([
            {
                time: 4000,
                callback: () => this.countdown.play(),
            },
            {
                time: 3000,
                callback: () => this.countdown.play(),
            },
            {
                time: 2000,
                callback: () => this.countdown.play(),
            },
            {
                time: 1000,
                callback: () => this.countdown.play(),
            },
            {
                time: 0,
                callback: this.setActivity(start, setTime),
            },
        ]);
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

    startCountdown = (setTime: TimerControls["setTime"]) => {
        this.setState({
            currentActivity: "countdown",
        });
        this.countdown.play();
        setTime(3100);
    }

    startSet = (setTime: TimerControls["setTime"]) => {
        const { defaultSetTime } = this.state;
        this.start.play();
        this.setState({
            currentActivity: "set",
        });
        setTime(defaultSetTime * 1000 + 10);
    }

    startWorkout = (setTime: TimerControls["setTime"]) => {
        const { defaultSets, currentIndex } = this.state;
        const { workout } = this.props;
        let sets = defaultSets;
        if (sets % 2 && workout[currentIndex].alternate) {
            sets++;
        }
        this.setState({
            currentSets: sets,
        });
        this.startCountdown(setTime);
    }

    getNextExercise = () => {
        const { currentIndex, defaultSets } = this.state;
        const { workout } = this.props;
        if (currentIndex < workout.length - 1) {
            this.setState({
                currentActivity: "none",
                currentIndex: currentIndex + 1,
                currentSets: defaultSets,
            });
        } else {
            this.setState({
                currentActivity: "complete",
                currentSets: 0,
            });
        }
    }

    restart = () => {
        this.setState({
            currentActivity: "none",
            currentIndex: 0,
        });
    }

    skip = (setTime: TimerControls["setTime"]) => () => {
        setTime(1);
    }

    render(): JSX.Element {
        const {
            currentActivity,
            currentIndex,
            currentSets,
            defaultSets,
            defaultSetTime,
            defaultRestTime,
        } = this.state;
        const { workout } = this.props;
        const currentExercise = this.getCurrentExercise(workout, currentIndex);
        return (
            <Box>
                <ExerciseInfo exercise={currentExercise} />
                <Flex justifyContent="space-between">
                    <Box width={2 / 5}>
                        <Text fontSize={[14, 18, 22]} fontWeight="bold">{!(currentActivity === "none") ? `Sets Remaining: ${currentSets}` : ""}&nbsp;</Text>
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
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Timer
                            direction="backward"
                            startImmediately={false}
                            onStop={this.restart}
                        >
                            {({
                                pause, resume, start, setTime, setCheckpoints, getTimerState, stop,
                            }: TimerControls) => {
                                this.setCheckpointsForActivity(start, setTime, setCheckpoints);
                                this.stop = stop;
                                return (
                                    <>
                                        <Text fontSize={[14, 18, 22]} color={this.activityTextMap[currentActivity].color} fontWeight="bold">
                                            {this.activityTextMap[currentActivity].text}&nbsp;
                                        </Text>
                                        <Button disabled={currentActivity !== "none"} variant="primary" onClick={this.setActivity(start, setTime)}>Go!</Button>
                                        <Button disabled={currentActivity === "complete" || currentActivity === "none"} variant="outline" onClick={this.skip(setTime)}>Skip</Button>
                                        <Button disabled={currentActivity === "complete" || currentActivity === "none"} variant={getTimerState() === "PAUSED" ? "secondary" : "outline"} onClick={this.pause(resume, pause, getTimerState)}>
                                            {getTimerState() === "PAUSED" ? "Resume" : "Pause"}
                                        </Button>
                                        <Button sx={{ visibility: currentActivity === "complete" ? "visible" : "hidden" }} variant="primary" onClick={this.restart}>Start Over</Button>
                                    </>
                                );
                            }}
                        </Timer>
                    </Flex>
                </Flex>
            </Box>
        );
    }
}
