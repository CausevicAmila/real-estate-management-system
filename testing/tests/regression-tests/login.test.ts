import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../../core/page-objects/login-page";
import { createDriver, quitDriver } from "../../core/config/driver-setup";

const dataFilePath = path.resolve(__dirname, "../../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
let driver, loginPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.login_page);
    loginPage = new LoginPage(driver);
},10000);
describe("Navigate through Navigation bar", () => {
    test("Navigation bar links", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.enterUsername();
        await loginPage.enterPassword();
        await loginPage.clickLoginBtn();
        await driver.sleep(2000);
        await loginPage.isAdminPanelDisplayed();
        
    },10000);
});
afterAll(async () => {
    await quitDriver(driver);
},10000);