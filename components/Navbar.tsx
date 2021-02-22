import PropTypes from "prop-types";
// import Link from "next/link";
import { Header, Button, GU, useLayout, Link } from "@aragon/ui";
import { APOLLO_BRANDING } from "../lib/constants";

export default function Navbar({ connected, address }) {
  const { layoutWidth } = useLayout();

  return (
    <div style={{ background: "#081937", width: `${layoutWidth} px` }}>
      <Header
        style={{ padding: 2 * GU }}
        primary={
          <Link href="/" external={false}>
            <img src={APOLLO_BRANDING} />
          </Link>
        }
        secondary={
          <Button
            style={{
              background: "#59A0FF",
            }}
            mode="strong"
            wide
            label={connected ? "Connected: " + address : "Disconnected"}
          />
        }
      />
    </div>
  );
}

Navbar.propTypes = {
  connected: PropTypes.bool.isRequired,
  address: PropTypes.string,
};
