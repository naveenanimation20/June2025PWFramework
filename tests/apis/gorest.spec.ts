import { test, expect } from '@playwright/test';

const TOKEN = 'd0bf1714ac04c10dd2982e009d2dffe694a8e0b53af518cb7370e41e046a72f6';

test('GET - fetch all users', async ({ request }) => {
   
   const response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
   });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);

});

test('GET - fetch a signle user', async ({ request }) => {
   
   const response = await request.get('https://gorest.co.in/public/v2/users/8277357', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
   });
    
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

    const response = await request.post('https://gorest.co.in/public/v2/users/', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        data: requestBody
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
});

