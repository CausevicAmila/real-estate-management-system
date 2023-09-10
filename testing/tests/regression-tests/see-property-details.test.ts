import { HomePage } from "../../core/page-objects/home-page";
import { createDriver, deleteCookies, quitDriver } from "../../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, homePage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
},10000);

describe("See properties and check property details ", () => {
    test("Property listing and property details", async () => {
        await homePage.navigateToHomePage();
        await homePage.clickSales();
        await homePage.clickSeeMoreBtn();
        await homePage.checkPropDetails();
    },50000);
});

afterAll(async () => {
    await quitDriver(driver);
},25000);
