import React from 'react'
import Container from '@mui/material/Container';
import { Button, Typography, Link, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import orderBy from 'lodash.orderby';
import map from 'lodash.map';
import { formatCurrency } from '../common/Formatter'
import { onSale } from '../common/Helper';

function getRows(item, sites) {
    const orderedSiteItems = orderBy(item.siteItems,['price'], ['asc']);

    return map(orderedSiteItems, siteItem => {
        return (
            <TableRow key={siteItem.siteID}>
                <TableCell><Link href={sites[siteItem.siteID].url}><img alt={sites[siteItem.siteID].name} src={sites[siteItem.siteID].logo} style={{maxHeight:20}}></img></Link></TableCell>
                <TableCell align='right'><Typography>{formatCurrency(siteItem.avePrice)}</Typography></TableCell>
                <TableCell align='right'><Typography sx={{ color: onSale(siteItem.price, siteItem.avePrice) ? 'red' : '' }}>{formatCurrency(siteItem.price)}</Typography></TableCell>
                <TableCell align='right'><Button sx={{ backgroundColor: '#D9D9D9' }} href={siteItem.url}><img src={require('../images/cart_shopping_icon.png')} alt="Buy" style={{ width: '20px' }} /></Button></TableCell>
            </TableRow>
        );
    });
}

const ShopPrices = ({ item, sites }) => {
    return (
        <Container>
            <Typography variant="h4">
                Price Check
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Site</TableCell>
                            <TableCell align='right'>Ave Price</TableCell>
                            <TableCell align='right'>Current Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(item, sites)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ShopPrices;