import { test, expect } from '@playwright/test';

const TOKEN = 'd0bf1714ac04c10dd2982e009d2dffe694a8e0b53af518cb7370e41e046a72f6';
const BASE_URL = 'https://gorest.co.in/public/v2/users';

//common headers:
const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

test('GET - fetch all users', async ({ request }) => {
   
   const response = await request.get(BASE_URL, {headers});
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});


test('POST - create a user', async ({ request }) => {
    
    const requestBody = {
        name: 'PW Test User',
        email: `pwtest${Date.now()}@mail.com`,
        gender: 'female',
        status: 'active'
    };

    const response = await request.post(BASE_URL, {
        headers,
        data: requestBody
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
});


test('PUT - Update a user ', async ({ request }) => {

    const userId = 8278243;
    
    const requestBody = {
        status: 'inactive'
    };

    const response = await request.put(`${BASE_URL}/${userId}`, { //https://gorest.co.in/public/v2/users/8278243
        headers,
        data: requestBody
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});



test('DELETE - Delete a user', async ({ request }) => {

    const userId = 8278243;

    const response = await request.delete(`${BASE_URL}/${userId}`, { //https://gorest.co.in/public/v2/users/8278243
        headers
    });

    expect(response.status()).toBe(204);
});