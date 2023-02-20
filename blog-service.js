
const fs = require("fs");
const postsPath = "./data/posts.json";
const categoriesPath = "./data/categories.json";

let posts = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(postsPath, "utf8", (err, data) => {
            if (err) {
                reject("Unable to read posts file");
            } else {
                posts = JSON.parse(data);
                fs.readFile(categoriesPath, "utf8", (err, data) => {
                    if (err) {
                        reject("Unable to read categories file");
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    });
}

function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("No posts found");
        } else {
            resolve(posts);
        }
    });
}

function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        const publishedPosts = posts.filter(post => post.published);
        if (publishedPosts.length === 0) {
            reject("No published posts found");
        } else {
            resolve(publishedPosts);
        }
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No categories found");
        } else {
            resolve(categories);
        }
    });
}

module.exports = {
    initialize,
    getAllPosts,
    getPublishedPosts,
    getCategories
};