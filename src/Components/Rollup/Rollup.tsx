import React, { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import themeRollup from "./themeRollup";

interface RollupPricingRow {
  title?: string;
  width_cm?: number;
  height_cm?: number;
  price_net?: number;
  image?: string;
  widthCm?: number;
  heightCm?: number;
  priceNet?: number;
}

interface RollupPricingResponse {
  success?: boolean;
  data?: RollupPricingRow[];
}

interface RollupOption {
  title: string;
  width: number;
  height: number;
  price: number;
  image: string;
}

const VAT_RATE = 1.2;

async function fetchRollupPricing(): Promise<RollupOption[]> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/rollup-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | RollupPricingResponse
    | RollupPricingRow[];
  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);

  return rows.map((row) => ({
    title: row.title ?? "Rollup",
    width: Number(row.width_cm ?? row.widthCm ?? 0),
    height: Number(row.height_cm ?? row.heightCm ?? 200),
    price: Number(row.price_net ?? row.priceNet ?? 0),
    image: row.image ?? "",
  }));
}

export default function Rollup({
  imageSrc,
}: {
  imageSrc: string;
}): JSX.Element {
  const [rollupOptions, setRollupOptions] = useState<RollupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRollupPricing()
      .then((options) => {
        setRollupOptions(options);
        setError(null);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={themeRollup}>
        <Paper>
          <Typography variant="h2">Rollup</Typography>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && (
            <Box className="cards-container">
              {rollupOptions.map((option) => (
                <Card key={option.width} className="rollup-card">
                  <Box className="rollup-card-image">
                    <img
                      src={`http://nfc.rs/gallery/${option.image}`}
                      alt={option.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
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
                          <TableCell>{option.height} cm</TableCell>
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
                            {(option.price * VAT_RATE).toLocaleString("sr-RS")}{" "}
                            din
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Paper>
      </ThemeProvider>
    </>
  );
}
