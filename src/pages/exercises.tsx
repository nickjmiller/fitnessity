import React from "react";
import { Link } from "@reach/router";
import { useRouteData } from "react-static";

// TODO: Export to shared types


export default () => {
    const { EXERCISES } = useRouteData();
    return (
        <div>
            <h1>Blog.</h1>
            <br />
            All Posts:
            <ul>
                {EXERCISES.map((exercise: any) => (
                    <li key={exercise.title}>
                        <Link to={`/exercises/${exercise.title.replace(/\s/g, "").toLowerCase()}/`}>{exercise.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
