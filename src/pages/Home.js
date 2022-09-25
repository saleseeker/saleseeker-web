import React from 'react';
import { Typography } from "@mui/material";
import { Container, Box } from '@mui/system';

export default function Home() {
    return (
        <Container>
            <Box sx={{ backgroundColor: 'gray' }}>
                <Typography>Hero</Typography>
            </Box>
            <Typography variant="h3">Home</Typography>
        </Container>
    );
}