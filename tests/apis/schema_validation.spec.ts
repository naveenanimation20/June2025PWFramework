import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';


const TOKEN = 'd0bf1714ac04c10dd2982e009d2dffe694a8e0b53af518cb7370e41e046a72f6';

//setup ajv:
const ajv = new Ajv();

//load the schema files:
const getUsersSchema = JSON.parse(fs.readFileSync(path.resolve('./schemas/getusersschema.json'), 'utf-8'));

test('GET - fetch all users', async ({ request }) => {
   
   const response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
   });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
   // console.log(data);

    //validate the json schema:
    const validate = ajv.compile(getUsersSchema);
    const isValid = validate(data);

    if (!isValid) {
        console.log('schema errors: ', validate.errors);
    }

    expect(isValid).toBe(true);
    console.log('API response schema is validated -- PASS');


});
