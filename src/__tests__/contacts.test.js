import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "../serverTests";
import { Contacts } from "../pages/Contacts";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe(`contacts get data`, () => {
  test(`loading`, async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test(`success`, async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
  });

  test(`fail`, async () => {
    server.use(
      rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal server error",
          })
        );
      })
    );
    render(<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-error")).toBeInTheDocument();
  });
});
