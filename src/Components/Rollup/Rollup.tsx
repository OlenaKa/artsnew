import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import themeRollup from "./themeRollup";

const rollupOptions = [
  {
    title: "Rollup 85 cm",
    width: 85,
    price: 7200,
    priceWithVAT: 8640,
    image: "rollup85.jpg",
  },
  {
    title: "Rollup 100 cm",
    width: 100,
    price: 9600,
    priceWithVAT: 11520,
    image: "rollup100.jpg",
  },
  {
    title: "Rollup 120 cm",
    width: 120,
    price: 11000,
    priceWithVAT: 13200,
    image: "rollup120.jpg",
  },
];

export default function Rollup({
  imageSrc,
}: {
  imageSrc: string;
}): JSX.Element {
  return (
    <>
      <ThemeProvider theme={themeRollup}>
        <Paper>
          <Typography variant="h2">Rollup</Typography>

          <Box className="cards-container">
            {rollupOptions.map((option) => (
              <Card key={option.width} className="rollup-card">
                <Box className="rollup-card-image">
                  <img 
                    src={`http://nfc.rs/gallery/${option.image}`} 
                    alt={option.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <CardContent className="rollup-card-content">
                  <Typography
                    variant="h6"
                    component="div"
                    className="rollup-card-title"
                  >
                    {option.title}
                  </Typography>

                  <Table size="small" className="rollup-table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Širina:</TableCell>
                        <TableCell>{option.width} cm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Visina:</TableCell>
                        <TableCell>200 cm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cena bez PDV-a:</TableCell>
                        <TableCell className="price-cell">
                          {option.price.toLocaleString("sr-RS")} din
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cena sa PDV-om:</TableCell>
                        <TableCell className="price-cell">
                          {option.priceWithVAT.toLocaleString("sr-RS")} din
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}
