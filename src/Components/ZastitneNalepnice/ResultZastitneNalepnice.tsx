import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { PriceDetails } from "./formulaHelperZastitneNalepnice";

export default function ResultZastitneNalepnice(params: PriceDetails) {
  useEffect(() => {
    document.getElementById("result")?.scrollIntoView();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h5" id="result">
          Ponuda
        </Typography>
        <Table>
          <TableHead>
            {/* <TableRow> */}

            {/* </TableRow> */}
          </TableHead>

          <TableBody>
            {params.moq && (
              <TableRow>
                <TableCell>Minimalna količina za 1000 din:</TableCell>
                <TableCell>{params.moq} komada</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell> Cena po komadu bez PDVa:</TableCell>
              <TableCell>{params.pricePerPc} din</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Ukupno za tiraž bez PDVa:</TableCell>
              <TableCell>{params.priceNet} din</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Ukupno za tiraž sa PDVom:</TableCell>
              <TableCell>{params.priceGross} din</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant="caption" id="result">
          *Za porudzbine preko 50000 dinara, molimo da nas kontaktirate za
          dodatni rabat.
        </Typography>
      </Box>
    </>
  );
}
