import React from "react";

interface FancyDivProps {
    children: JSX.Element;
}

const FancyDiv: React.FC = ({ children }: FancyDivProps) => <div style={{ border: "1px solid red" }}>{children}</div>;
export default FancyDiv;
