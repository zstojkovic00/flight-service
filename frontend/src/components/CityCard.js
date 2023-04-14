import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import {Link} from 'react-router-dom';

const CityCard = ({ city }) => {
    return (
        <Card>
            <CardActionArea component={Link} to={`/city/${city.name}`}>
                <CardMedia
                    component="img"
                    alt={city.name}
                    height="200"
                    image={`${city.photo}`}
                    title={city.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {city.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                                {city.country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Population: {city.population.toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CityCard;
