export const sitesMock = [
    {
        name: 'Takealot',
        id: 1,
        logo: 'https://shopfront.takealot.com/static/media/src/images/logo.svg-f6ccb489b85bbddf97d6.svg',
        url: 'https://www.takealot.com'
    },
    {
        name: 'Makro',
        id: 2,
        logo: 'https://cdn-prd-02.pnp.co.za/sys-master/images/h26/h64/10206546133022/pick-n-pay-header2.png',
        url: 'https://www.pnp.co.za'
    },
]

export const itemMocks = [    
    {
        id: 1,
        name: 'Castle Lite',
        imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
        avePrice: 120,
        siteItems: [
        {
            siteId: 1,
            name: 'Castle Lite',
            url: 'https://www.takealot.com/castle-lite-premium-beer-24-x-410ml-can/PLID72156147',
            imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
            price: 115,
            avePrice: 120,
            lastUpdated: new Date()
        },
        {
          siteId: 2,
          name: 'Castle Lite',
          url: 'https://www.pnp.co.za/pnpstorefront/pnp/en/Castle-Lite-Beer-Can-330ml-x-24/p/000000000000343430_CS',
          imageUrl: '',
          price: 125,
          avePrice: 126,
          lastUpdated: new Date()
        } ]
    },
    {
        id: 2,
        name: 'Windhoek',
        imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
        avePrice: 120,
        siteItems: [
        {
            siteId: 1,
            name: 'Castle Lite',
            url: 'https://www.takealot.com/castle-lite-premium-beer-24-x-410ml-can/PLID72156147',
            imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
            price: 105,
            avePrice: 128,
            lastUpdated: new Date()
        }]
    },
    {
        id: 3,
        name: 'Smirnoff',
        imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
        avePrice: 120,
        siteItems: [
        {
            siteId: 1,
            name: 'Castle Lite',
            url: 'https://www.takealot.com/castle-lite-premium-beer-24-x-410ml-can/PLID72156147',
            imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
            price: 115,
            lastUpdated: new Date()
        }]
    },
    {
        id: 4,
        name: 'Savannah',
        imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
        avePrice: 120,
        siteItems: [
        {
            siteId: 1,
            name: 'Castle Lite',
            url: 'https://www.takealot.com/castle-lite-premium-beer-24-x-410ml-can/PLID72156147',
            imageUrl: 'https://media.takealot.com/covers_images/5e3bffb0d7974f1497da6508ad39aadf/s-zoom.file',
            price: 115,
            lastUpdated: new Date()
        }]
    },

]

export const subscriptionMock = [
    {
       itemId: 1,
       alertThreshold: 15,
       sites:[1,2]
    },
    {
        itemId: 2,
        alertThreshold: 10,
        sites:[1]        
    }
]