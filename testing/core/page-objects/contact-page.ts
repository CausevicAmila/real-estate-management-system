import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ContactPage extends BasePage {
    private sales = By.id("nav-link");
    private name = By.id("name");
    private surname = By.id("surname");
    private email = By.id("email");
    private message = By.id("message");
    private sendBtn = By.className('register-button bg-accent text-lightgray');

    constructor(driver: WebDriver) {
        super(driver);
    }
    async navigateToContactPage() {
        let seeMore = await this.driver.wait(until.elementsLocated(this.sales), 100000);
        await seeMore[3].click();
    }
    async enterName(){
        (await this.waitForElement(this.name,10000)).sendKeys(testData.form.name);

    }
    async enterSurname(){
        (await this.waitForElement(this.surname,10000)).sendKeys(testData.form.surname);

    }
    async enterEmail(){
        (await this.waitForElement(this.email,10000)).sendKeys(testData.form.email);

    }
    async enterNote(){
        (await this.waitForElement(this.message,10000)).sendKeys(testData.form.note);
    }
    async clickSendBtn(){
        await this.findElementAndClick(this.sendBtn);
    }
    
}