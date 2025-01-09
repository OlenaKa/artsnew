import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { Result } from "./formulaHelpersStikers";

export default function ResultStikeri(params: Result) {
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
            {params.minQuantity && (
              <TableRow>
                <TableCell>Minimalna količina za 2000 din:</TableCell>
                <TableCell>{params.minQuantity} komada</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell> Cena po komadu bez PDVa:</TableCell>
              <TableCell>{params.priceNet} din</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Ukupno za tiraž bez PDVa:</TableCell>
              <TableCell>{params.valueNet} din</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Ukupno za tiraž sa PDVom:</TableCell>
              <TableCell>{params.valueBrutto} din</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
