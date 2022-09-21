import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import minBy from 'lodash.minby';
import { formatCurrency } from '../common/Formatter'
import SubscribeButton from './SubscribeButton';
import {Link} from 'react-router-dom'

function renderPrice(item, sites, minSiteItem) {
  const onSale = minSiteItem.price / item.avePrice < 0.97

  return onSale ?
    (<Fragment>
      <Box sx={{ display: { display: 'flex' } }}>
        <Typography sx={{ fontSize: '14px', color: 'red' }}>{formatCurrency(minSiteItem.price)}</Typography>
        <Typography sx={{ fontSize: '14px', textDecoration: 'line-through', marginLeft: '10px' }}>{formatCurrency(item.avePrice)}</Typography>
      </Box>
      <Box sx={{ display: { display: 'flex' } }}>
        <Typography sx={{ fontSize: '12px' }}>on sale at {sites[minSiteItem.siteID].name}</Typography>
        {item.siteItems.length > 1 && 
        <Fragment><Typography sx={{ fontSize: '12px' }}>&nbsp;and&nbsp;</Typography>
        <Link to={`/PriceCheck/${item.id}`} style={{fontSize:'12px'}}>{item.siteItems.length - 1} more</Link></Fragment>}
      </Box>
    </Fragment>) :
    (<Fragment>
      <Typography sx={{ fontSize: '14px' }}>{formatCurrency(minSiteItem.price)}</Typography>
      <Box sx={{ display: { display: 'flex' } }}>
        <Typography sx={{ fontSize: '12px' }}>at {sites[minSiteItem.siteID].name}</Typography>
      </Box>
    </Fragment>);
}

const Item = ({ item, sites, subscriptions, defaultSubscriptionValues }) => {
  const minSiteItem = minBy(item.siteItems, si => si.price);

  return (
    <Box sx={{ height: 320, border: '1px solid grey', borderRadius: 2 }}>
      <Box sx={{padding:'0px 12px'}}>
        <Box sx={{ textAlign: 'center' }}>
          <img src={item.imageUrl} alt={item.name} style={{ maxHeight: "200px" }} />
        </Box>
        <Typography sx={{ fontSize: '18px' }}>{item.name}</Typography>
        {renderPrice(item, sites, minSiteItem)}
        <Box sx={{ display: { display: 'flex', marginTop: '5px' } }}>
          <Button sx={{ backgroundColor: '#D9D9D9', minWidth: '50px' }} href={minSiteItem?.url}><img src={require('../images/cart_shopping_icon.png')} alt="Buy" style={{ width: '20px' }} /></Button>
          <SubscribeButton item={item} sites={sites} subscriptions={subscriptions} defaultSubscriptionValues={defaultSubscriptionValues} />
        </Box>
      </Box>
    </Box>
  );
};

export default Item;