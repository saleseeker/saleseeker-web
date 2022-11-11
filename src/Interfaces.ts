export interface IItem {
    id:number,
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

export interface IItemSubscription {
    itemID:number,
    alertThreshold:number,
    siteIDs:number[]
}

export interface ISubscriptionValues{
    emailAddress:string,
    alertThreshold:number,
    siteIDs:number[]
}