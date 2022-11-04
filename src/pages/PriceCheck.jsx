import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { Button, Typography, Link, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { formatCurrency } from '../common/Formatter'
import { onSale } from '../common/Helper';
import {useParams} from 'react-router-dom'
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const getRows = (item, sites) => {
    const orderedSiteItems = item.siteItems.sort(s => s.price);

    return orderedSiteItems.map(siteItem => {
        var site = sites.find(s => s.id == siteItem.siteId);
        console.log(siteItem);
        return (
            <TableRow key={siteItem.siteID}>
                <TableCell><Link href={site.url}><img alt={site.name} src={site.logo} style={{maxHeight:20}}></img></Link></TableCell>
                <TableCell align='right'><Typography>{formatCurrency(siteItem.avePrice)}</Typography></TableCell>
                <TableCell align='right'><Typography sx={{ color: onSale(siteItem.price, siteItem.avePrice) ? 'red' : '' }}>{formatCurrency(siteItem.price)}</Typography></TableCell>
                <TableCell align='right'><Button sx={{ backgroundColor: '#D9D9D9' }} href={siteItem.url}><img src={require('../images/cart_shopping_icon.png')} alt="Buy" style={{ width: '20px' }} /></Button></TableCell>
            </TableRow>
        );
    });
}

const PriceCheck = () => {
    const params = useParams();
    const [item, setItem] = useState(null);
    const [sites, setSites] = useState(null);

    useEffect(() => {       
        (async () => {
            setSites(await SaleSeekerGateway.GetSites());

            setItem((await SaleSeekerGateway.GetItems()).find(i => i.id == params.itemID));
          })();
    }, []);    

    return (
        item && sites &&
        <Container className="page">
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

export default PriceCheck;