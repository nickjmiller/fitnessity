/* eslint-disable no-await-in-loop */
import React from "react";
import {
    Box, Button, Flex, Text, Heading,
} from "rebass";
import { Slider, Label } from "@rebass/forms";
import Timer, { TimerControls } from "react-compound-timer";
import { useDispatch, useSelector } from "react-redux";
import ExerciseInfo from "./ExerciseInfo";
// eslint-disable-next-line
import { Exercise } from "../../data/exercises";
import { incrementIndex, resetIndex } from "../../features/workout/workoutSlice";
import { RootState } from "../../app/rootReducer";

let UIfx: any;

// document is not defined during react-static compilation
if (typeof document !== "undefined") {
    // eslint-disable-next-line global-require
    UIfx = require("uifx").default;
}

type WorkoutContainerProps = {
    currentExercise: Exercise;
    dispatch: any;
}

type WorkoutContainerState = {
    currentActivity: "set" | "rest" | "none" | "countdown";
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

class WorkoutContainer extends
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
    }

    constructor(props: WorkoutContainerProps) {
        super(props);
        this.state = {
            currentActivity: "none",
            defaultSets: 3,
            defaultSetTime: 40,
            defaultRestTime: 60,
            currentSets: 3,
        };
    }

    componentDidUpdate(newProps: WorkoutContainerProps) {
        const { currentExercise } = this.props;
        if (newProps.currentExercise !== currentExercise) {
            this.stop();
        }
    }

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
        const { currentSets, defaultRestTime } = this.state;
        const { currentExercise } = this.props;
        if (currentSets === 1) {
            this.getNextExercise();
            return;
        }
        this.setState({
            currentSets: currentSets - 1,
        });
        if (currentExercise.alternate && !(currentSets % 2)) {
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
        const { defaultSets } = this.state;
        const { currentExercise } = this.props;
        let sets = defaultSets;
        if (sets % 2 && currentExercise.alternate) {
            sets++;
        }
        this.setState({
            currentSets: sets,
        });
        this.startCountdown(setTime);
    }

    getNextExercise = () => {
        const { defaultSets } = this.state;
        const { dispatch } = this.props;
        this.setState({
            currentActivity: "none",
            currentSets: defaultSets,
        });
        dispatch(incrementIndex());
    }

    restart = () => {
        const { dispatch } = this.props;
        this.stopActivity();
        dispatch(resetIndex());
    }

    stopActivity = () => {
        this.setState({
            currentActivity: "none",
        });
    }

    skip = (setTime: TimerControls["setTime"]) => () => {
        setTime(1);
    }

    render(): JSX.Element {
        const {
            currentActivity,
            currentSets,
            defaultSets,
            defaultSetTime,
            defaultRestTime,
        } = this.state;
        const { currentExercise } = this.props;
        return (
            <Box>
                {currentExercise ? <ExerciseInfo exercise={currentExercise} />
                    : <Heading>Workout Complete!</Heading>}
                <Flex justifyContent="space-between">
                    <Box width={2 / 5}>
                        <Text fontSize={[14, 18, 22]} fontWeight="bold">{!(currentActivity === "none") ? `Sets Remaining: ${currentSets}` : ""}&nbsp;</Text>
                        <Label>
                            Default Sets:
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
                            onStop={this.stopActivity}
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
                                        <Button disabled={currentActivity !== "none" || !currentExercise} variant="primary" onClick={this.setActivity(start, setTime)}>Go!</Button>
                                        <Button disabled={!currentExercise || currentActivity === "none"} variant="outline" onClick={this.skip(setTime)}>Skip</Button>
                                        <Button disabled={!currentExercise || currentActivity === "none"} variant={getTimerState() === "PAUSED" ? "secondary" : "outline"} onClick={this.pause(resume, pause, getTimerState)}>
                                            {getTimerState() === "PAUSED" ? "Resume" : "Pause"}
                                        </Button>
                                        <Button sx={{ visibility: !currentExercise ? "visible" : "hidden" }} variant="primary" onClick={this.restart}>Start Over</Button>
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

export default () => {
    const currentExercise = useSelector(
        (state: RootState) => state.workout.exercises[state.workout.currentIndex],
    );
    return <WorkoutContainer dispatch={useDispatch()} currentExercise={currentExercise} />;
};
