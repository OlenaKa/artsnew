import logo from '../../arts_promote.png'
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Link,
  Typography,
} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

export default function Header(): JSX.Element {
  return (
    <header>
      <Card>
        <img src={logo} alt="logo" style={{ maxWidth: '30%' }} />
        <CardActions>
          <Link href="tel:+381113988377">
            <LocalPhoneIcon />
            <Typography noWrap>0113988377</Typography>
          </Link>
        </CardActions>
        <CardActions>
          <Link href="tel:+381646156081">
            <SmartphoneIcon />
            <Typography noWrap>0646156081</Typography>
          </Link>
        </CardActions>
        <CardActions>
          <Link href="mailto:info@arts.rs">
            <AlternateEmailIcon />
            <Typography noWrap>info@arts.rs</Typography>
          </Link>
        </CardActions>
      </Card>
    </header>
  )
}
