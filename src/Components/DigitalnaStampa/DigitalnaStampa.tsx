import { ThemeProvider } from "@mui/material/styles";
import themeDigitalnaStampa from "./themeDigitalnaStampa";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { quantityRanges, printTypes, prices } from "./priceListDigitalnaStampa";

const LAMINATION_SETUP = 300;
const LAMINATION_PER_SIDE = 24;

const calculateLaminationPrice = (printTypeId: string): number => {
  const sides = printTypeId === "1-0" || printTypeId === "4-0" ? 1 : 2;
  return LAMINATION_SETUP + LAMINATION_PER_SIDE;
};

const getLaminationSides = (printTypeId: string): number => {
  return printTypeId === "1-0" || printTypeId === "4-0" ? 1 : 2;
};

export default function DigitalnaStampa({
  imageSrc,
}: {
  imageSrc: string;
}): JSX.Element {
  const popularId = "4-4";

  return (
    <ThemeProvider theme={themeDigitalnaStampa}>
      <Paper>
        <Typography variant="h2">Digitalna štampa</Typography>

        <Typography variant="h5" className="digitalnaIntroTitle" sx={{ mb: 2 }}>
          Format A3, 330x488mm
        </Typography>

        {/* Kartice umesto tabele – po tipu štampe */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className="digitalnaPriceGrid"
        >
          {printTypes.map((pt) => {
            const isPopular = pt.id === popularId;

            return (
              <Grid item key={pt.id}>
                <Card
                  elevation={isPopular ? 4 : 1}
                  className={`digitalnaCard${
                    isPopular ? " digitalnaCard--popular" : ""
                  }`}
                >
                  {isPopular && (
                    <Typography className="digitalnaPopularBadge">
                      Popularno
                    </Typography>
                  )}

                  <CardContent
                    className={`digitalnaCardContent${
                      isPopular ? " digitalnaCardContent--popular" : ""
                    }`}
                  >
                    <Typography
                      variant="subtitle1"
                      className="digitalnaCardTitle"
                    >
                      {pt.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="digitalnaCardSubtitle"
                    >
                      {pt.description}
                    </Typography>

                    <Table
                      size="small"
                      sx={{
                        mt: 1,
                        "& td": {
                          borderBottom: "1px solid #e5e7eb",
                          fontSize: 14,
                          py: 0.75,
                        },
                      }}
                    >
                      <TableBody>
                        {quantityRanges.map((range) => (
                          <TableRow key={range.id}>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ pl: 0 }}
                            >
                              {range.label}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                pr: 0,
                                fontWeight: 700,
                                color: isPopular ? "primary.main" : "inherit",
                              }}
                            >
                              {prices[pt.id][range.id] > 0
                                ? `${prices[pt.id][range.id]} din/otisak`
                                : "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            sx={{
                              borderTop: "2px solid #e5e7eb",
                              borderBottom: "none",
                              pt: 1.5,
                              pb: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 600, color: "text.secondary" }}
                            >
                              Plastifikacija:
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ pl: 0, fontWeight: 400 }}
                          >
                            Trošak tehničke pripreme
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              pr: 0,
                              fontWeight: 700,
                              color: isPopular ? "primary.main" : "inherit",
                            }}
                          >
                            {LAMINATION_SETUP} din
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ pl: 0, fontWeight: 400 }}
                          >
                            Plastifikacija
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              pr: 0,
                              fontWeight: 700,
                              color: isPopular ? "primary.main" : "inherit",
                            }}
                          >
                            {getLaminationSides(pt.id) === 1
                              ? "24 din/strana"
                              : "48 din/tabak"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="body2" className="digitalnaIntroText">
          *Cene su iskazane bez PDV-a.
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}
