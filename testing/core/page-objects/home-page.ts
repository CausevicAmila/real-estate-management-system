import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {
    private searchBar = By.className("search-bar");
    private search_input = By.className("search-input");
    private logo = By.className("logo");
    private sales = By.id("nav-link");
    private salesCheck = By.xpath("//*[@id='root']/section/section/div[2]/div[1]/p[1]");
    private aboutUsCheck = By.xpath("//*[@id='root']/section/section/div/div[1]");
    private contactCheck = By.xpath("//*[@id='root']/section/div/section/div/div[1]/p[1]");
    private seeMoreBtn = By.xpath('//div[@class="propcard-button-container"]/a');
    private title = By.className("mainTitle text-primary");
    private desc = By.className("titleDesc");
    private address = By.className("location");
    private price = By.className("price");
    private homeImg = By.className("image object-cover"); 

 

    constructor(driver: WebDriver) {
        super(driver);
    }
    async navigateToHomePage() {
        await this.driver.findElement(this.logo).click();
    }
    async clickSearchInput(){
        await this.findElementAndClick(this.searchBar);
    }
    async clickSales(){
        await this.findElementAndClick(this.sales);
    }
    async checkSalesHeader(){
        await this.isMatching(this.salesCheck, "SALES");
    }
    async clickAboutUs(){
        let seeMore = await this.driver.wait(until.elementsLocated(this.sales), 100000);
        await seeMore[2].click();
    }
    async checkAboutUsHeader(){
        await this.isMatching(this.aboutUsCheck, "ABOUT BA REAL ESTATE");
    }
    async clickContact(){
        let seeMore = await this.driver.wait(until.elementsLocated(this.sales), 100000);
        await seeMore[3].click();
    }
    async checkContactHeader(){
        await this.isMatching(this.contactCheck, "Inquiry about the property?");
    }
    async clickSeeMoreBtn(){
        let seeMore = await this.driver.wait(until.elementsLocated(this.seeMoreBtn), 100000);
        await seeMore[1].click();
    }
    async enterSearchingProduct(){
        let searchInputElement = await this.findElement(this.search_input);
        await searchInputElement.sendKeys("House");
    }
    async checkSearchedProduct(){
        await this.checkSearchedItems(this.title, "House");
    }
    async isSearchInputDisplayed(){
        const searchBox: boolean = await this.driver.findElement(this.searchBar).isDisplayed();
        expect(searchBox).toBeTruthy();
    } 
    async checkPropDetails() {
        let propTitle = this.findElement(this.title);
        let propDesc = this.findElement(this.desc);
        let propPrice = this.findElement(this.price);
        let propAddress = this.findElement(this.address);

        let checkArray = [propTitle, propDesc, propAddress, propPrice];
        
        let elements = [
            testData.productCard.title,
            testData.productCard.desc,
            testData.productCard.address,
            testData.productCard.price
        ];

        for (let i = 0; i < checkArray.length; i++) {
            let elementText = await (await checkArray[i]).getText();
            expect(elementText).toMatch(elements[i]);
        }
    }
    async isHomePageDisplayed(){
        const image: boolean = await this.driver.findElement(this.homeImg).isDisplayed();
        expect(image).toBeTruthy();
    } 
}