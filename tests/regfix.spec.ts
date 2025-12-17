import { test, expect } from '../fixtures/dataFixture';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

function getRandomEmail() : string{
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}

  
test.skip('Register a user from CSV', async ({ regData, page, baseURL }) => {
    
    for (const user of regData) {
        const loginPage = new LoginPage(page);
                await loginPage.goToLoginPage(baseURL);
                const registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
                const isUserRegistered: boolean = await registerPage.registerUser(
                    user.firstName,
                    user.lastName,
                    getRandomEmail(),
                    user.telephone,
                    user.password, 
                    user.subscribeNewsletter);
                expect(isUserRegistered).toBeTruthy();
    }


});


