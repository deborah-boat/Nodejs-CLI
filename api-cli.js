import inquirer from 'inquirer';
import { createUser, getUser, updateUser, deleteUser } from './utils/user-utils.js';
import { createPost, getPost, updatePost, deletePost } from './utils/post-utils.js';

main();


async function main() {
    try {
        const category = await inquirer.prompt([
            {
                type: 'list',
                name: 'category',
                message: 'Select a category:',
                choices: ['Users', 'Posts'],
            },
        ]);

        const operation = await inquirer.prompt([
            {
                type: 'list',
                name: 'operation',
                message: 'Select an operation:',
                choices: ['Create', 'Read', 'Update', 'Delete'],
            },
        ]);

        if (category.category === 'Users') {
            if (operation.operation === 'Create') {
                await createUser();
            }
            else if (operation.operation === 'Read') {
                await getUser();
            }
            else if (operation.operation === 'Update') {
                await updateUser();
            }
            else if (operation.operation === 'Delete') {
                await deleteUser();
            }
        }
        else if (category.category === 'Posts') {
            if (operation.operation === 'Create') {
                await createPost();
            }
            else if (operation.operation === 'Read') {
                await getPost();
            }
            else if (operation.operation === 'Update') {
                await updatePost();
            }
            else if (operation.operation === 'Delete') {
                await deletePost();
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}