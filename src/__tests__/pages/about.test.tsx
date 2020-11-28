import React from "react";

import { render } from "@testing-library/react";
import About from "../../pages/about";

it("renders correctly", () => {
    expect(render(<About />)).toMatchSnapshot();
});
