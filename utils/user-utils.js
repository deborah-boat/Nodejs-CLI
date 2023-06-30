import fs from 'fs/promises';
import inquirer from 'inquirer';


// ==================== Create New User ====================
export async function createUser() {
    try {
        // ===== User Given Data =====
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

        // ===== Get Existing Users to Get The Number of Users =====
        const users = await fs.readFile('./data/users.json', 'utf8');
        const existing_data = JSON.parse(users);

        // ===== Create New User ID =====
        const new_user_id = existing_data.users.length + 1;

        // ===== New User =====
        const new_user = { id: new_user_id, ...data };

        // ===== Merge New User to Existing User Data =====
        existing_data.users.push(new_user);

        // ===== Finally Store Data to users.json file =====
        await fs.writeFile('./data/users.json', JSON.stringify(existing_data, null, 4), 'utf8');
        console.log('User Successfully Created');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Get All Users / Specific User ====================
export async function getUser() {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select an option:',
                choices: ['All Users', 'Specific User'],
            },
        ]);

        const users = await fs.readFile('./data/users.json', 'utf8');
        const data = JSON.parse(users);

        if (answer.option === 'All Users') return console.log(data.users);

        if (answer.option === 'Specific User') {
            const userAns = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Enter the user ID:',
                },
            ]);

            const user_id = parseInt(userAns.id);
            const user = data.users.find(user => user.id === user_id);

            if (user) return console.log(user);
            console.log('User Not Found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Update User ====================
export async function updateUser() {
    try {
        const users = await fs.readFile('./data/users.json', 'utf8');
        const data = JSON.parse(users);

        const user_to_update = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the user ID to update:',
            },
        ]);

        const user_id = parseInt(user_to_update.id);
        const user_index = data.users.findIndex(user => user.id === user_id);

        if (user_index === -1) return console.log('User Not Found');

        const updated_user = await inquirer.prompt([
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

        data.users[user_index] = {
            id: user_id,
            ...updated_user,
        };

        await fs.writeFile('./data/users.json', JSON.stringify(data, null, 4), 'utf8');
        console.log('User Successfully Updated');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}




// ==================== Delete User ====================
export async function deleteUser() {
    try {
        const users = await fs.readFile('./data/users.json', 'utf8');
        const data = JSON.parse(users);

        const user_to_delete = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the user ID to delete:',
            },
        ]);

        const user_id = parseInt(user_to_delete.id);
        const user_index = data.users.findIndex(user => user.id === user_id);

        if (user_index === -1) return console.log('User Not Found');

        data.users.splice(user_index, 1);

        await fs.writeFile('./data/users.json', JSON.stringify(data, null, 4), 'utf8');
        console.log('User Successfully Deleted');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}