import React from "react";
import Column from "./../src/components/Column";
import ReactDOM from "react-dom";

import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import toJSON from "enzyme-to-json";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore();
const store = mockStore({
  columns: [
    {
      id: "5eb0442737ea5c2d3c1d5d2f",
      title: "2",
      limit: -99999,
      tasks: [],
      index: 1,
      indexX: 1,
      indexY: 0,
      info: "Task w tej kolumnie uznaje się za ukończony gdy:",
      color: "#9d84ed",
    },
    {
      id: "5eb0441437ea5c2d3c1d5d2b",
      title: "1",
      limit: -99999,
      tasks: [],
      index: 0,
      indexX: 0,
      indexY: 0,
      info: "Task w tej kolumnie uznaje się za ukończony gdy:",
      color: "#9d84ed",
    },
    {
      id: "5eb0442937ea5c2d3c1d5d30",
      title: "a",
      limit: -99999,
      tasks: [],
      index: 2,
      indexX: 0,
      indexY: 1,
      color: "#a9ffa8",
    },
    {
      id: "5eb0442937ea5c2d3c1d5d31",
      title: "a",
      limit: -100003,
      tasks: [
        {
          id: "5eb0443537ea5c2d3c1d5d37",
          content: "123",
          priority: "normal",
          columnID: "5eb0442937ea5c2d3c1d5d31",
          users: [
            {
              _id: "5eb0546c3e374b1098525aa4",
              name: "Michu",
              color: "#b20e47",
            },
            {
              _id: "5eb1459654cc6f22f89bdf80",
              name: "Patryk",
              color: "#0da535",
            },
          ],
          color: {
            r: "99",
            g: "118",
            b: "127",
            a: "1",
          },
          progress: 50,
          isLocked: false,
        },
        {
          id: "5eb3b49d9eee6e3d50563461",
          content: "Foo",
          priority: "high",
          columnID: "5eb0442937ea5c2d3c1d5d31",
          users: [],
          color: {
            r: 126,
            g: 211,
            b: 33,
            a: 1,
          },
          progress: 0,
          isLocked: false,
        },
        {
          id: "5eb3b5799eee6e3d50563468",
          content: "Bar",
          priority: "high",
          columnID: "5eb0442937ea5c2d3c1d5d31",
          users: [],
          color: {
            r: 248,
            g: 231,
            b: 28,
            a: 1,
          },
          progress: 0,
          isLocked: false,
        },
        {
          id: "5eb3b5969eee6e3d50563469",
          content: "Lorem",
          priority: "high",
          columnID: "5eb0442937ea5c2d3c1d5d31",
          users: [],
          color: {
            r: 248,
            g: 231,
            b: 28,
            a: 0.5,
          },
          progress: 0,
          isLocked: false,
        },
      ],
      index: 3,
      indexX: 1,
      indexY: 1,
      color: "#a9ffa8",
    },
  ],
  users: [
    {
      _id: "5eb044a28e7211377c8e6024",
      name: "czarek",
      color: "#0c9b2d",
    },
    {
      _id: "5eb044a38e7211377c8e6025",
      name: "czarek",
      color: "#0c9b2d",
    },
    {
      _id: "5eb044a28e7211377c8e6023",
      name: "czarek",
      color: "#0c9b2d",
    },
    {
      _id: "5eb12e2dbf883d0c7c1004a2",
      name: "Ola",
      color: "#d8840f",
    },
    {
      _id: "5eb044a28e7211377c8e6022",
      name: "czarek",
      color: "#0c9b2d",
    },
  ],
});

afterEach(cleanup);

it("render without crashing", () => {
  expect(
    shallow(
      <Provider store={store}>
        <Column></Column>
      </Provider>
    )
  );
});

it("matches snapshot", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Column></Column>
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
