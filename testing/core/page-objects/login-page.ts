import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {
    private login_inputs = By.className("email-input");
    private loginBtn = By.className("login-button bg-accent text-lightgray");
    private bars = By.className("bars");

    constructor(driver: WebDriver) {
        super(driver);
    }
    async navigateToLoginPage() {
        await this.driver.get(testData.url.login_page);
    }
    async enterUsername(){
        let username = await this.driver.wait(until.elementsLocated(this.login_inputs), 100000);
        await username[0].sendKeys(testData.login.username);
    }
    async enterPassword(){
        let username = await this.driver.wait(until.elementsLocated(this.login_inputs), 100000);
        await username[1].sendKeys(testData.login.password);
    }
    async clickLoginBtn(){
        await this.findElementAndClick(this.loginBtn);
    }
    async isAdminPanelDisplayed(){
        const admin: boolean = await this.driver.findElement(this.bars).isDisplayed();
        expect(admin).toBeTruthy();
    } 

}