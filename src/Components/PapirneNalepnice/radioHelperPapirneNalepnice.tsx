import imageSingleSquare from "./squaresinglelabel.jpg";
import imageOtherSingle from "./othersinglelabel.jpg";
import imageOnSheet from "./onsheetlabel.jpg";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
const IconSquareSingle = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageSingleSquare})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const IconSquareSingleChecked = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageSingleSquare})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "10%",
  outline: "1px solid #f37435",
}));

function CustomRadioSquareSingle(props: RadioProps) {
  return (
    <Radio
      disableRipple
      disableTouchRipple
      checkedIcon={<IconSquareSingleChecked />}
      icon={<IconSquareSingle />}
      {...props}
    />
  );
}

const IconOtherSingle = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageOtherSingle})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const IconOtherSingleChecked = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageOtherSingle})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "10%",
  outline: "1px solid #f37435",
}));

function CustomRadioOtherSingle(props: RadioProps) {
  return (
    <Radio
      disableRipple
      disableTouchRipple
      checkedIcon={<IconOtherSingleChecked />}
      icon={<IconOtherSingle />}
      {...props}
    />
  );
}

const IconOnSheet = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  padding: 5,
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageOnSheet})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const IconOnSheetChecked = styled("span")(({ theme }) => ({
  width: 60,
  height: 60,
  padding: "5px",
  // backgroundColor: "#f5f8fa",
  backgroundImage: `url(${imageOnSheet})`,
  backgroundSize: "50px 50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "10%",
  // border: "1px solid #f37435",
  outline: "1px solid #f37435",
  // boxShadow: "0 0 0 2px #f37435",
}));

function CustomRadioOnSheet(props: RadioProps) {
  return (
    <Radio
      disableRipple
      disableTouchRipple
      checkedIcon={<IconOnSheetChecked />}
      icon={<IconOnSheet />}
      {...props}
    />
  );
}

export { CustomRadioSquareSingle, CustomRadioOtherSingle, CustomRadioOnSheet };
