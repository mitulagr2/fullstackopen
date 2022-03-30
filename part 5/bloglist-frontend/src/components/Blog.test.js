import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("<Blog />", () => {
  const testBlog = {
    title: "Beyond Tech: Growwing as an Engineer",
    author: "Shivang Agrawal",
    url: "https://tech.groww.in/beyond-tech-growwing-as-an-engineer-c3168cbbc214",
    likes: 228,
    id: "6243447876e3aa1380d60092",
    user: {
      id: "6242d5ee723110b7c5caeb93",
      name: "Test user",
      username: "testuser",
    },
  };
  const testCurUser = "6242d5ee723110b7c5caeb93";
  const mockLikeHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  let container;

  beforeEach(() => {
    container = render(
      <Blog
        blog={testBlog}
        curUser={testCurUser}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />
    ).container;
  });

  test("renders only the blog's title and author", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(testBlog.title);
    expect(div).toHaveTextContent(testBlog.author);

    const span = div.querySelector("#togglable-content");
    expect(span).toHaveStyle("display: none");
    expect(span).toHaveTextContent(testBlog.url);
    expect(span).toHaveTextContent(testBlog.likes);
  });

  test("clicking 'view' button shows url and number of likes", async () => {
    const button = screen.getByText("view");
    fireEvent.click(button);

    const span = container.querySelector("#togglable-content");
    expect(span).not.toHaveStyle("display: none");
  });

  test("clicking 'like' button calls its event handler", async () => {
    const button = screen.getByText("#like-button");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});

describe("<BlogForm />", () => {
  test("calls event handler with the right details", () => {
    const addBlog = jest.fn();
    const blogDetails = {
      title: "Beyond Tech: Growwing as an Engineer",
      author: "Shivang Agrawal",
      url: "https://tech.groww.in/beyond-tech-growwing-as-an-engineer-c3168cbbc214",
    };

    render(<BlogForm addBlog={addBlog} />);

    const inputs = screen.getAllByRole("textbox");
    const sendButton = screen.getByText("#new-blog-button");

    fireEvent.change(inputs[0], {
      target: { value: blogDetails.title },
    });
    fireEvent.change(inputs[1], {
      target: { value: blogDetails.author },
    });
    fireEvent.change(inputs[2], {
      target: { value: blogDetails.url },
    });
    fireEvent.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0]).toEqual(blogDetails);
  });
});
