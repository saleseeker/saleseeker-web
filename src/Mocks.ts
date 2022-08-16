import {IItem, ISite} from './Interfaces'

export const sitesMock: { [id: number]: ISite } = {
  1 : {
    name: 'Takealot',
    id: 1,
    logo: '',
    url: 'https://www.takealot.com'
  }
}

export const itemMock: IItem = {
    name: 'Castle Lite',
    imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
    avePrice: 120,
    siteItems: [
      {
        siteID: 1,
        name: 'Castle Lite',
        url: 'https://www.takealot.com/castle-lite-premium-beer-24-x-410ml-can/PLID72156147',
        imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
        price: 115,
        lastUpdated: new Date()
      }]
  };