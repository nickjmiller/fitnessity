import React from "react";
import { Link } from "@reach/router";
import { Button } from "rebass";

export default ({ href, text }: { href: string, text: string }) => (
    <Link
        to={href}
    >
        <Button variant="primary" px={1} fontSize={[12, 14, 16]}>{text}</Button>
    </Link>
);
