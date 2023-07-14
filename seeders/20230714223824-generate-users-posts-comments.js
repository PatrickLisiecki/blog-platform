"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const usersData = [
            {
                name: "John Doe",
                password: await bcrypt.hash("123", 10),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Jane Smith",
                password: await bcrypt.hash("abc", 10),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const postsData = [
            {
                title: "First Post",
                content: "Hello, this is my first post!",
                UserId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Second Post",
                content: "Just another post...",
                UserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const commentsData = [
            {
                content: "Great post!",
                UserId: 1,
                PostId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                content: "I totally agree.",
                UserId: 2,
                PostId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert("users", usersData);
        await queryInterface.bulkInsert("posts", postsData);
        await queryInterface.bulkInsert("comments", commentsData);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
        await queryInterface.bulkDelete("posts", null, {});
        await queryInterface.bulkDelete("comments", null, {});
    },
};
