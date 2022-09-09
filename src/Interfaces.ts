export interface IItem {
    name:string,
    imageUrl:string,
    avePrice:number,
    siteItems:ISiteItem[],
    subscribedPercentage?:number
}

export interface ISiteItem{
    siteID:number,
    name:string,
    url:string,
    imageUrl:string,
    price:number,
    lastUpdated:Date
}

export interface ISite {
    id:number,
    name:string,
    url:string,
    logo:string
}