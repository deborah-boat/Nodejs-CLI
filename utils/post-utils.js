import fs from 'fs/promises';
import inquirer from 'inquirer';


// ==================== Create New Post ====================
export async function createPost() {
    try {
        // ===== post Given Data =====
        const data = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter the email address:',
            },
            {
                type: 'input',
                name: 'gender',
                message: 'Enter the gender:',
            },
        ]);

        // ===== Get Existing Posts to Get The Number of Posts =====
        const posts = await fs.readFile('./data/posts.json', 'utf8');
        const existing_data = JSON.parse(posts);

        // ===== Create New Post ID =====
        const new_post_id = existing_data.posts.length + 1;

        // ===== New post =====
        const new_post = { id: new_post_id, ...data };

        // ===== Merge New post to Existing post Data =====
        existing_data.posts.push(new_post);

        // ===== Finally Store Data to posts.json file =====
        await fs.writeFile('./data/posts.json', JSON.stringify(existing_data, null, 4), 'utf8');
        console.log('Post Successfully Created');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Get All Posts / Specific Post ====================
export async function getPost() {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select an option:',
                choices: ['All Posts', 'Specific Post'],
            },
        ]);

        const posts = await fs.readFile('./data/posts.json', 'utf8');
        const data = JSON.parse(posts);

        if (answer.option === 'All Posts') return console.log(data.posts);

        if (answer.option === 'Specific Post') {
            const postAns = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Enter the post ID:',
                },
            ]);

            const post_id = parseInt(postAns.id);
            const post = data.posts.find(post => post.id === post_id);

            if (post) return console.log(post);
            console.log('Post Not Found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Update post ====================
export async function updatePost() {
    try {
        const posts = await fs.readFile('./data/posts.json', 'utf8');
        const data = JSON.parse(posts);

        const post_to_update = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the post ID to update:',
            },
        ]);

        const post_id = parseInt(post_to_update.id);
        const post_index = data.posts.findIndex(post => post.id === post_id);

        if (post_index === -1) return console.log('Post Not Found');

        const updated_post = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the updated first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the updated last name:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter the updated email address:',
            },
            {
                type: 'input',
                name: 'gender',
                message: 'Enter the updated gender:',
            },
        ]);

        data.posts[post_index] = {
            id: post_id,
            ...updated_post,
        };

        await fs.writeFile('./data/posts.json', JSON.stringify(data, null, 4), 'utf8');
        console.log('Post Successfully Updated');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Delete Post ====================
export async function deletePost() {
    try {
        const posts = await fs.readFile('./data/posts.json', 'utf8');
        const data = JSON.parse(posts);

        const post_to_delete = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the post ID to delete:',
            },
        ]);

        const post_id = parseInt(post_to_delete.id);
        const post_index = data.posts.findIndex(post => post.id === post_id);

        if (post_index === -1) return console.log('Post Not Found');

        data.posts.splice(post_index, 1);

        await fs.writeFile('./data/posts.json', JSON.stringify(data, null, 4), 'utf8');
        console.log('Post Successfully Deleted');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}