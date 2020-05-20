import React from "react";
import { useRouteData } from "react-static";
import { Link } from "@reach/router";
// eslint-disable-next-line no-unused-vars
import { Exercise } from "src/data/exercises";

export default () => {
    const { exercise }: { exercise: Exercise } = useRouteData();
    return (
        <div>
            <Link to="/exercises/">
                {"<"}
                {" "}
                Back
            </Link>
            <br />
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
        </div>
    );
};
