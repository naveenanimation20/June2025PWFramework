import { test, expect } from '@playwright/test';

const TOKEN = 'd0bf1714ac04c10dd2982e009d2dffe694a8e0b53af518cb7370e41e046a72f6';
const BASE_URL = 'https://gorest.co.in/public/v2/users';

//common headers:
const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};



test('e2e crud flow test', async ({ request }) => {

        console.log('===================POST CALL ==============');

        //step 1 : Create a user:
        const requestBody = {
            name: 'PW Test User',
            email: `pwtest${Date.now()}@mail.com`,
            gender: 'female',
            status: 'active'
        };
    
        const responsePOST = await request.post(BASE_URL, {
            headers,
            data: requestBody
        });
    
        expect(responsePOST.status()).toBe(201);
        const createdUser = await responsePOST.json();
        console.log(createdUser);
        const userId = createdUser.id;
         console.log('Created User ID: ' + userId);
        console.log('User is created successfully...');

    
        console.log('===================GET CALL ==============');
    
        //step 2: Get the same user by using user id = userId
    
        const responseGET = await request.get(BASE_URL+'/'+userId, {
                headers
           });
            
         expect(responseGET.status()).toBe(200);
        const data = await responseGET.json();
        console.log(data);

    
        console.log('===================UPDATE CALL ==============');
    
    //step 3: Update the same user by using user id = userId
    
        const updateBody = {
            name: 'PW Test Automation User',
            status: 'inactive'
        };
            
        const responsePUT = await request.put(`${BASE_URL}/${userId}`, { 
             headers,
             data: updateBody
        });
    
        expect(responsePUT.status()).toBe(200);
         const upddatedData = await responsePUT.json();
        console.log(upddatedData);
        console.log('User is updated successfully...');

        console.log('===================DELETE CALL ==============');
    
        //step 4: Delete the same user by using user id = userId
        const responseDELETE = await request.delete(`${BASE_URL}/${userId}`, { headers, });
        expect(responseDELETE.status()).toBe(204);
        console.log('User is deleted successfully...');
    
    
    
    console.log('===================GET CALL ==============');
    
        //step 5: Get the same user by using user id = userId afetr delete the same user
    
        const responseGETAfterDelete = await request.get(BASE_URL+'/'+userId, {
                headers
           });
            
         expect(responseGETAfterDelete.status()).toBe(404);
        const dataGET = await responseGETAfterDelete.json();
        console.log(dataGET);

});
