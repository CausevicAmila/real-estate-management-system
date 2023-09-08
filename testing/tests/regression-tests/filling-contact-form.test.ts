import { readFileSync } from "fs";
import * as path from "path";
import { ContactPage } from "../../core/page-objects/contact-page";
import { createDriver, quitDriver } from "../../core/config/driver-setup";
import { HomePage } from "../../core/page-objects/home-page";

const dataFilePath = path.resolve(__dirname, "../../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
let driver, contactPage, homePage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    contactPage = new ContactPage(driver);
    homePage = new HomePage(driver);
},10000);
describe("Fill out the contact form", () => {
    test("Filling contact form", async () => {
        await contactPage.navigateToContactPage();
        await contactPage.enterName();
        await contactPage.enterSurname();
        await contactPage.enterEmail();
        await contactPage.enterNote();
        await contactPage.clickSendBtn();
        await homePage.isHomePageDisplayed();
    },20000);
});
afterAll(async () => {
    await quitDriver(driver);
},10000);