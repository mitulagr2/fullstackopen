describe("Blog app:", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "superuser",
      username: "root",
      password: "toor",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login");
  });

  describe("Login:", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("toor");
      cy.get("#login-button").click();

      cy.contains("superuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "password is incorrect")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "superuser logged in");
    });
  });

  describe("When logged in:", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "toor" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Beyond Tech: Growwing as an Engineer");
      cy.get("#author").type("Shivang Agrawal");
      cy.get("#url").type(
        "https://tech.groww.in/beyond-tech-growwing-as-an-engineer-c3168cbbc214"
      );
      cy.get("#new-blog-button").click();

      cy.contains("Beyond Tech: Growwing as an Engineer");
    });

    describe("And a few blog exists:", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Beyond Tech: Growwing as an Engineer",
          author: "Shivang Agrawal",
          url: "https://tech.groww.in/beyond-tech-growwing-as-an-engineer-c3168cbbc214",
        });
        cy.createBlog({
          title: "What’s New in Flutter 2.8",
          author: "Chris Sells",
          url: "https://medium.com/flutter/whats-new-in-flutter-2-8-d085b763d181",
          likes: 38,
        });
        cy.createBlog({
          title: "blog three",
          author: "blog three author",
          url: "https://blog.three",
          likes: 16,
        });
      });

      it("blog can be liked", function () {
        cy.contains("Beyond Tech: Growwing as an Engineer")
          .parent()
          .as("thisBlog");

        cy.get("@thisBlog").contains("view").click();

        cy.get("@thisBlog").find("#blog-likes").as("blogLikes");
        cy.get("@blogLikes").should("contain", "0");

        cy.get("@thisBlog").find("#like-button").click();
        cy.get("@blogLikes").should("contain", "1");
      });

      it("blog can be deleted by same user", function () {
        cy.contains("Beyond Tech: Growwing as an Engineer")
          .parent()
          .as("thisBlog");

        cy.get("@thisBlog").contains("view").click();
        cy.get("@thisBlog").find("#delete-button").click();

        cy.contains("Beyond Tech: Growwing as an Engineer").should("not.exist");
      });

      it("blog can not be deleted by other users", function () {
        cy.contains("logout").click();
        const newUser = {
          name: "Cypress",
          username: "cypress",
          password: "cypressuser",
        };
        cy.request("POST", "http://localhost:3003/api/users/", newUser);
        cy.login({ username: "cypress", password: "cypressuser" });

        cy.contains("Beyond Tech: Growwing as an Engineer")
          .parent()
          .as("thisBlog");

        cy.get("@thisBlog").contains("view").click();
        cy.get("@thisBlog").find("#delete-button").should("not.exist");

        cy.contains("Beyond Tech: Growwing as an Engineer");
      });

      it("blogs are ordered according to likes", function () {
        cy.get(".blog").as("allBlogs");
        for (let i = 1; i < cy.get("@allBlogs").length; ++i) {
          cy.get("@allBlogs")[i]
            .find("#blog-likes")
            .invoke("text")
            .then(parseInt)
            .should(
              "be.lte",
              cy
                .get("@allBlogs")[i - 1]
                .find("#blog-likes")
                .invoke("text")
                .then(parseInt)
            );
        }
      });
    });
  });
});
