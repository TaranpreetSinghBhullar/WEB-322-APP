const express = require("express");
const blogService = require("./blog-service");
const app = express();

app.use(express.static("public"));
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.redirect("/about");
});

app.get("/about", (req, res) => {
    res.sendFile(`${__dirname}/views/about.html`);
});

app.get("/blog", async (req, res) => {
    try {
        const posts = await blogService.getPublishedPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await blogService.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await blogService.getCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

(async () => {
    await blogService.initialize();
    app.listen(port, () => {
        console.log(`Start server on port ${port}`);
    });
})();
