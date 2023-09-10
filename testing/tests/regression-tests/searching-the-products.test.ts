import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../../core/page-objects/home-page";
import { createDriver, quitDriver } from "../../core/config/driver-setup";

const dataFilePath = path.resolve(__dirname, "../../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
let driver, homePage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
},10000);
describe("Searching the products", () => {
    test("Searching the products - verifying search results", async () => {
        await homePage.navigateToHomePage();
        await homePage.clickSales();
        await homePage.isSearchInputDisplayed();
        await homePage.clickSearchInput();
        await homePage.enterSearchingProduct();
        await homePage.checkSearchedProduct();
    },10000);
});
afterAll(async () => {
    await quitDriver(driver);
},10000);